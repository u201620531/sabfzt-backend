import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class DetallePlantillaComprobanteControllers {
  public async list(req: Request, res: Response) {
    try {
      const { idPlantillaComprobante } = req.params;

      const queryDetallePlantilla =
        idPlantillaComprobante === "0"
          ? "SELECT '' AS `select`, '' AS `idPlantillaComprobante`," +
            " C.`idComprobante`," +
            " C.`serie`," +
            " C.`correlativo`," +
            " C.`idProveedor`," +
            " P.`nroDocumento`," +
            " P.`razonSocial`," +
            " C.`idTipoDocumento`," +
            " TD.`descripcion` AS `desTipoDocumento`," +
            " TD.`abreviatura` AS `abrTipoDocumento`," +
            " TD.`asientos` AS `asiTipoDocumento`," +
            " C.`fechaEmision`," +
            " C.`idFormaPago`," +
            " FP.`descripcion` AS `desFormaPago`," +
            " C.`idMoneda`," +
            " M.`descripcion` AS `desMoneda`," +
            " M.`abreviatura` AS `abrMoneda`," +
            " C.`valorCompra`," +
            " C.`igv`," +
            " C.`importeTotal`," +
            " C.`tipoCambio`," +
            " '' AS `detalle`," +
            " C.`estado`," +
            " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`" +
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
            " WHERE C.`estado` = 'A'" +
            " AND C.`idComprobante` NOT IN (SELECT `idComprobante` FROM " +
            keys.database.database +
            ".`detalle-plantilla-comprobante`);"
          : "SELECT '1' AS `select`, DPC.`idPlantillaComprobante`," +
            " DPC.`idComprobante`," +
            " C.`serie`," +
            " C.`correlativo`," +
            " C.`idProveedor`," +
            " P.`nroDocumento`," +
            " P.`razonSocial`," +
            " C.`idTipoDocumento`," +
            " TD.`descripcion` AS `desTipoDocumento`," +
            " TD.`abreviatura` AS `abrTipoDocumento`," +
            " TD.`asientos` AS `asiTipoDocumento`," +
            " C.`fechaEmision`," +
            " C.`idFormaPago`," +
            " FP.`descripcion` AS `desFormaPago`," +
            " C.`idMoneda`," +
            " M.`descripcion` AS `desMoneda`," +
            " M.`abreviatura` AS `abrMoneda`," +
            " C.`valorCompra`," +
            " C.`igv`," +
            " C.`importeTotal`," +
            " C.`tipoCambio`," +
            " DPC.`detalle`," +
            " DPC.`estado`," +
            " CASE WHEN DPC.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`" +
            " FROM `" +
            keys.database.database +
            "`.`detalle-plantilla-comprobante` AS DPC" +
            " INNER JOIN `" +
            keys.database.database +
            "`.`comprobante` AS C ON DPC.`idComprobante` = C.`idComprobante`" +
            " INNER JOIN `" +
            keys.database.database +
            "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
            " INNER JOIN `" +
            keys.database.database +
            "`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
            " INNER JOIN `" +
            keys.database.database +
            "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
            " INNER JOIN `" +
            keys.database.database +
            "`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`" +
            " WHERE DPC.`idPlantillaComprobante` = '" +
            idPlantillaComprobante +
            "';";

            const DetallePlantillaComprobantes = await pool.query(
        queryDetallePlantilla
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
      const { idPlantillaComprobante, idComprobante } = req.params;
      const DetallePlantillaComprobante = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [idPlantillaComprobante, idComprobante]
      );
      if (DetallePlantillaComprobante.length > 0) {
        res.json(DetallePlantillaComprobante[0]);
      } else {
        res.json({
          id: 1,
          text: "El detalle de la plantilla no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El detalle de la plantilla fue registrada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ?;",
        [req.body, idPlantillaComprobante]
      );
      res.json({
        id: 1,
        message: "El detalle de la plantilla fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async updateOne(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante, idComprobante } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [req.body, idPlantillaComprobante, idComprobante]
      );
      res.json({
        id: 1,
        message: "El detalle de la plantilla fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ?;",
        [idPlantillaComprobante]
      );
      res.json({
        id: 1,
        message: "El detalle de la plantilla fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no fue eliminada",
        detail: error.message,
      });
    }
  }

  public async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante, idComprobante } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [idPlantillaComprobante, idComprobante]
      );
      res.json({
        id: 1,
        message: "El detalle de la plantilla fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El detalle de la plantilla no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const detallePlantillaComprobanteControllers =
  new DetallePlantillaComprobanteControllers();
export default detallePlantillaComprobanteControllers;
