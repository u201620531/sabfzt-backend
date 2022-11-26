import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class ComprobanteControllers {
  public async list(req: Request, res: Response) {
    try {
      const comprobantes = await pool.query(
        "SELECT C.`idComprobante`," +
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
          " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE (CASE WHEN C.`estado`='D' THEN 'Declarado' ELSE 'Inactivo' End) End AS `desEstado`," +
          " C.`fechaCreacion`," +
          " C.`usuarioCreacion`" +
          " FROM `" +
          keys.database.database +
          "`.`comprobante` AS C" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`;"
      );
      res.json(comprobantes);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen comprobantes",
        detail: error.message,
      });
    }
  }

  public async report(req: Request, res: Response) {
    try {
      const {
        nroDocumento,
        idTipoDocumento,
        idFormaPago,
        idMoneda,
        fechaEmisionIni,
        fechaEmisionFin,
        estado,
      } = req.params;
      let reporteComprobantes =
        "SELECT C.`idComprobante` AS `Id Comprobante`," +
        " CONCAT(C.`serie`, '-', C.`correlativo`) AS `Nro Documento`," +
        " P.`nroDocumento` AS `RUC/DNI`," +
        " P.`razonSocial` AS `Razon Social`," +
        " C.`fechaEmision` AS `F. Emisión`," +
        " FP.`descripcion` AS `Forma Pago`," +
        " TD.`descripcion` AS `Tipo Documento`," +
        " C.`importeTotal` AS `Importe Total`," +
        " M.`descripcion` AS `Moneda`," +
        " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE (CASE WHEN C.`estado`='D' THEN 'Declarado' ELSE 'Inactivo' End) End AS `Estado`" +
        " FROM `" +
        keys.database.database +
        "`.`comprobante` AS C" +
        " INNER JOIN `" +
        keys.database.database +
        "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
        " INNER JOIN `" +
        keys.database.database +
        "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
        " INNER JOIN `" +
        keys.database.database +
        "`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
        " INNER JOIN `" +
        keys.database.database +
        "`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`" +
        " WHERE C.`estado` <> ''";

      nroDocumento !== "X"
        ? (reporteComprobantes +=
            " AND P.nroDocumento = '" + nroDocumento + "'")
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
      estado !== "X"
        ? (reporteComprobantes += " AND C.estado = '" + estado + "'")
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
      const DetallePlantillaComprobantes = await pool.query(
        reporteComprobantes
      );
      res.json(DetallePlantillaComprobantes);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen comprobantes",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idComprobante } = req.params;
      const comprobante = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`comprobante` WHERE idComprobante = ?;",
        [idComprobante]
      );
      if (comprobante.length > 0) {
        res.json(comprobante[0]);
      } else {
        res.json({ id: 1, text: "Comprobante no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El comprobante no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idComprobante FROM `" +
          keys.database.database +
          "`.`comprobante`;",
        [req.body.ComprobanteType]
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].idComprobante + 1;
      }
      const idComprobante = id_number.toString().padStart(10, "0");
      req.body.idComprobante = idComprobante;
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`comprobante` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El comprobante fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
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
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`comprobante` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El comprobante fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
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
        "UPDATE `" +
          keys.database.database +
          "`.`comprobante` SET ? WHERE idComprobante = ?;",
        [req.body, idComprobante]
      );
      res.json({
        id: 1,
        message: "El comprobante fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El comprobante no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idComprobante } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`comprobante` WHERE idComprobante = ?;",
        [idComprobante]
      );
      res.json({ id: 1, message: "El comprobante fue eliminado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El comprobante no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const comprobanteControllers = new ComprobanteControllers();
export default comprobanteControllers;
