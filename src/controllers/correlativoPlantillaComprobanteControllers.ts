import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class CorrelativocorrelativoPlantillaComprobanteControllers {
  public async list(req: Request, res: Response) {
    try {
      const correlativoPlantillaComprobantes = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`correlativo-plantilla-comprobante`;"
      );
      res.json(correlativoPlantillaComprobantes);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen correlativos",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { ano, mes } = req.params;
      const correlativoPlantillaComprobante = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`correlativo-plantilla-comprobante` WHERE ano = ? AND mes = ?;",
        [ano, mes]
      );
      if (correlativoPlantillaComprobante.length > 0) {
        res.json(correlativoPlantillaComprobante[0]);
      } else {
        res.json({ id: 1, text: "El correlativo no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El correlativo no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" +
          keys.database.database +
          "`.`correlativo-plantilla-comprobante` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El correlativo fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El correlativo no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { ano, mes } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`correlativo-plantilla-comprobante` SET ? WHERE ano = ? AND mes = ?;",
        [req.body, ano, mes]
      );
      res.json({ id: 1, message: "El correlativo fue actualizad", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El correlativo no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { ano, mes } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`correlativo-plantilla-comprobante` WHERE ano = ? AND mes = ?;",
        [ano, mes]
      );
      res.json({ id: 1, message: "El correlativo fue eliminado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El correlativo no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const correlativocorrelativoPlantillaComprobanteControllers =
  new CorrelativocorrelativoPlantillaComprobanteControllers();
export default correlativocorrelativoPlantillaComprobanteControllers;
