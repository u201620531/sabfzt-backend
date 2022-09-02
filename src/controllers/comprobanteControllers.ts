import { Request, Response } from "express";
import pool from "../database";

class ComprobanteControllers {
  public async list(req: Request, res: Response) {
    const comprobantes = await pool.query(
      "SELECT *" +
        " FROM `sabfztdb`.`comprobante`;"
    );
    res.json(comprobantes);
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
      await pool.query("INSERT INTO `sabfztdb`.`comprobante` set ?", [req.body]);
      res.json({ id: 1, message: "The Comprobante fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The Comprobante no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idComprobante } = req.params;
      await pool.query("UPDATE `sabfztdb`.`comprobante` SET ? WHERE idComprobante = ?;", [
        req.body,
        idComprobante,
      ]);
      res.json({ id: 1, message: "The Comprobante fue actualizado", detail: "" });
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
      await pool.query("DELETE FROM `sabfztdb`.`comprobante` WHERE idComprobante = ?;", [idComprobante]);
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
