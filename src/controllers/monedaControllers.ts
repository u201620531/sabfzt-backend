import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class MonedaControllers {
  public async list(req: Request, res: Response) {
    try {
      const monedas = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`moneda`;"
      );
      res.json(monedas);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen monedas",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idMoneda } = req.params;
      const moneda = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`moneda` WHERE idMoneda = ?;",
        [idMoneda]
      );
      if (moneda.length > 0) {
        res.json(moneda[0]);
      } else {
        res.json({ id: 1, text: "moneda no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La moneda no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`moneda` set ?",
        [req.body]
      );
      res.json({ id: 1, message: "La moneda fue registrado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La moneda no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idMoneda } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`moneda` SET ? WHERE idMoneda = ?;",
        [req.body, idMoneda]
      );
      res.json({ id: 1, message: "La moneda fue actualizado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La moneda no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idMoneda } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`moneda` WHERE idMoneda = ?;",
        [idMoneda]
      );
      res.json({ id: 1, message: "La moneda fue eliminado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La moneda no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const monedaControllers = new MonedaControllers();
export default monedaControllers;
