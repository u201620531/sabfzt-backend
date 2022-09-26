import { Request, Response } from "express";
import pool from "../database";

class ComprobanteControllers {
  public async list(req: Request, res: Response) {
    const comprobantes = await pool.query(
      "SELECT ROW_NUMBER() OVER(PARTITION BY C.`serie`) as nroItem, C.`idComprobante`," +
        " CONCAT(C.`serie`, '-', C.`correlativo`) AS `nroDocumento`," +
        " C.`idProveedor`," +
        " P.`nroDocumento` AS `nroDocumentoProveedor`," +
        " P.`razonSocial`," +
        " C.`idTipoDocumento`," +
        " TD.`descripcion` AS `desTipoDocumento`," +
        " C.`idFormaPago`," +
        " FP.`descripcion` AS `desFormaPago`," +
        " C.`fechaEmision`," +
        " C.`fechaVencimiento`," +
        " C.`totalGravadas`," +
        " C.`totalInafectas`," +
        " C.`totalExoneradas`," +
        " C.`totalExportacion`," +
        " C.`valorCompra`," +
        " C.`igv`," +
        " C.`isc`," +
        " C.`otrosTributos`," +
        " C.`otrosCargos`," +
        " C.`descuentosGlobales`," +
        " ROUND(C.`importeTotal`,2) AS `importeTotal`," +
        " C.`idMoneda`," +
        " M.`descripcion` AS `desMoneda`," +
        " C.`serieGuia`," +
        " C.`correlativoGuia`," +
        " C.`estado`," +
        " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
        " C.`fechaCreacion`," +
        " C.`usuarioCreacion`" +
        " FROM `sabfztdb`.`comprobante` AS C" +
        " INNER JOIN `sabfztdb`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
        " INNER JOIN `sabfztdb`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
        " INNER JOIN `sabfztdb`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
        " INNER JOIN `sabfztdb`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`;"
    );
    res.json(comprobantes);
  }

  public async report(req: Request, res: Response) {
    const {
      nroDocumento,
      idTipoDocumento,
      idFormaPago,
      idMoneda,
      fechaEmisionIni,
      fechaEmisionFin,
    } = req.params;

    let reporteComprobantes =
      "SELECT C.`idComprobante` AS `Id Comprobante`," +
      " C.`serie` + '-' + C.`correlativo` AS `Nro Documento`," +
      " P.`nroDocumento` AS `RUC/DNI`," +
      " P.`razonSocial` AS `Razon Social`," +
      " C.`fechaEmision` AS `F. Emisión`," +
      " FP.`descripcion` AS `Forma Pago`," +
      " TD.`descripcion` AS `Tipo Documento`," +
      " C.`importeTotal` AS `Importe Total`," +
      " M.`descripcion` AS `Moneda`," +
      " C.`estado` AS `Estado`" +
      " FROM `sabfztdb`.`comprobante` AS C" +
      " INNER JOIN `sabfztdb`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
      " INNER JOIN `sabfztdb`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
      " INNER JOIN `sabfztdb`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
      " INNER JOIN `sabfztdb`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`" +
      " WHERE C.`estado` <> ''";

    nroDocumento !== "X"
      ? (reporteComprobantes += " AND P.nroDocumento = '" + nroDocumento + "'")
      : "";
    idFormaPago !== "X"
      ? (reporteComprobantes += " AND C.idFormaPago = '" + idFormaPago + "'")
      : "";
    idTipoDocumento !== "X"
      ? (reporteComprobantes +=
          " AND C.idTipoDocumento = '" + idTipoDocumento + "'")
      : "";
    idMoneda !== "X"
      ? (reporteComprobantes += " AND C.idMoneda = '" + idMoneda + "'")
      : "";
    fechaEmisionIni !== "X" && fechaEmisionFin === "X"
      ? (reporteComprobantes +=
          "  AND C.fechaEmision >= '" + fechaEmisionIni + "'")
      : "";
    fechaEmisionIni !== "X" && fechaEmisionFin !== "X"
      ? (reporteComprobantes +=
          "  AND C.fechaEmision BETWEEN '" +
          fechaEmisionIni +
          "' AND '" +
          fechaEmisionFin +
          "'")
      : "";

    const DetallePlantillaComprobantes = await pool.query(reporteComprobantes);
    res.json(DetallePlantillaComprobantes);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idComprobante } = req.params;
      const comprobante = await pool.query(
        "SELECT * FROM sabfztdb.`comprobante` WHERE idComprobante = ?;",
        [idComprobante]
      );
      if (comprobante.length > 0) {
        res.json(comprobante[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "Comprobante no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The Comprobante no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idComprobante FROM `sabfztdb`.`comprobante`;",
        [req.body.ComprobanteType]
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].idComprobante + 1;
      }
      const idComprobante = id_number.toString().padStart(10, "0");
      req.body.idComprobante = idComprobante;
      await pool.query("INSERT INTO `sabfztdb`.`comprobante` set ?", [
        req.body,
      ]);
      res.json({
        id: 1,
        message: "The Comprobante fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El Comprobante no fue registrado",
        detail: error.message,
      });
    }
  }

  public async createMsivo(req: Request, res: Response): Promise<void> {
    try {
      const { numComprobantes } = req.params;
      const idComprobante = numComprobantes.toString().padStart(10, "0");
      req.body.idComprobante = idComprobante;
      await pool.query("INSERT INTO `sabfztdb`.`comprobante` set ?", [
        req.body,
      ]);
      res.json({
        id: 1,
        message: "The Comprobante fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El Comprobante no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idComprobante } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`comprobante` SET ? WHERE idComprobante = ?;",
        [req.body, idComprobante]
      );
      res.json({
        id: 1,
        message: "The Comprobante fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The Comprobante no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idComprobante } = req.params;
      await pool.query(
        "DELETE FROM `sabfztdb`.`comprobante` WHERE idComprobante = ?;",
        [idComprobante]
      );
      res.json({ id: 1, message: "The Comprobante fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The Comprobante no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const comprobanteControllers = new ComprobanteControllers();
export default comprobanteControllers;
