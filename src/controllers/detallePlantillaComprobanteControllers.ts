import { Request, Response } from "express";
import pool from "../database";

class DetallePlantillaComprobanteControllers {
  public async list(req: Request, res: Response) {
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
          " C.`idComprobante`," +
          " C.`fechaEmision`," +
          " C.`idFormaPago`," +
          " FP.`descripcion` AS `desFormaPago`," +
          " C.`importeTotal`," +
          " '' AS `detalle`," +
          " C.`estado`" +
          " FROM `sabfztdb`.`comprobante` AS C" +
          " INNER JOIN `sabfztdb`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
          " INNER JOIN `sabfztdb`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
          " WHERE C.`estado` = 'A';"
        : "SELECT '' AS `select`, DPC.`idPlantillaComprobante`," +
          " DPC.`idComprobante`," +
          " C.`serie`," +
          " C.`correlativo`," +
          " C.`idProveedor`," +
          " P.`nroDocumento`," +
          " P.`razonSocial`," +
          " C.`idComprobante`," +
          " C.`fechaEmision`," +
          " C.`idFormaPago`," +
          " FP.`descripcion` AS `desFormaPago`," +
          " C.`importeTotal`," +
          " DPC.`detalle`," +
          " DPC.`estado`," +
          " CASE WHEN DPC.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`" +
          " FROM `sabfztdb`.`detalle-plantilla-comprobante` AS DPC" +
          " INNER JOIN `sabfztdb`.`comprobante` AS C ON DPC.`idComprobante` = C.`idComprobante`" +
          " INNER JOIN `sabfztdb`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
          " INNER JOIN `sabfztdb`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
          " WHERE DPC.`idPlantillaComprobante` = '" +
          idPlantillaComprobante +
          "';";

    const DetallePlantillaComprobantes = await pool.query(
      queryDetallePlantilla
    );
    res.json(DetallePlantillaComprobantes);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idPlantillaComprobante, idComprobante } = req.params;
      const DetallePlantillaComprobante = await pool.query(
        "SELECT * FROM sabfztdb.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [idPlantillaComprobante, idComprobante]
      );
      if (DetallePlantillaComprobante.length > 0) {
        res.json(DetallePlantillaComprobante[0]);
      } else {
        res.status(404).json({
          id: 1,
          text: "El dtalle de la plantilla no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `sabfztdb`.`detalle-plantilla-comprobante` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El dtalle de la plantilla fue registrada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ?;",
        [req.body, idPlantillaComprobante]
      );
      res.json({
        id: 1,
        message: "El dtalle de la plantilla fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async updateOne(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante, idComprobante } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [req.body, idPlantillaComprobante, idComprobante]
      );
      res.json({
        id: 1,
        message: "El dtalle de la plantilla fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "DELETE FROM `sabfztdb`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ?;",
        [idPlantillaComprobante]
      );
      res.json({
        id: 1,
        message: "El dtalle de la plantilla fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no fue eliminada",
        detail: error.message,
      });
    }
  }

  public async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante, idComprobante } = req.params;
      await pool.query(
        "DELETE FROM `sabfztdb`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;",
        [idPlantillaComprobante, idComprobante]
      );
      res.json({
        id: 1,
        message: "El dtalle de la plantilla fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El dtalle de la plantilla no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const detallePlantillaComprobanteControllers =
  new DetallePlantillaComprobanteControllers();
export default detallePlantillaComprobanteControllers;
