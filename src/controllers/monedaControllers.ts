import { Request, Response } from "express";
import pool from "../database";

class MonedaControllers {
  public async list(req: Request, res: Response) {
    const monedas = await pool.query(
      "SELECT * FROM sabfztdb.`moneda`;"
    );
    res.json(monedas);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idMoneda } = req.params;
      const moneda = await pool.query(
        "SELECT * FROM sabfztdb.`moneda` WHERE idMoneda = ?;",
        [idMoneda]
      );
      if (moneda.length > 0) {
        res.json(moneda[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "moneda no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The moneda wasn't exists",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `sabfztdb`.`moneda` set ?", [
        req.body,
      ]);
      res.json({ id: 1, message: "The moneda fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The moneda no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idMoneda } = req.params;
      await pool.query("UPDATE `sabfztdb`.`moneda` SET ? WHERE idMoneda = ?;", [
        req.body,
        idMoneda,
      ]);
      res.json({ id: 1, message: "The moneda fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The moneda no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idMoneda } = req.params;
      await pool.query("DELETE FROM `sabfztdb`.`moneda` WHERE idMoneda = ?;", [
        idMoneda,
      ]);
      res.json({ id: 1, message: "The moneda fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The moneda no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const monedaControllers = new MonedaControllers();
export default monedaControllers;
