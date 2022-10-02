import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class TipoCambioControllers {
  public async list(req: Request, res: Response) {
    const tipoCambios = await pool.query(
      "SELECT * FROM `" + keys.database.database + "`.`tipo-cambio`;"
    );
    res.json(tipoCambios);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { fecha } = req.params;
      const tipoCambio = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`tipo-cambio` WHERE fecha = ?;",
        [fecha]
      );
      if (tipoCambio.length > 0) {
        res.json(tipoCambio[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "tipoCambio no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El tipo de cambio no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`tipo-cambio` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El tipo de cambio fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El tipo de cambio no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { fecha } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`tipo-cambio` SET ? WHERE fecha = ?;",
        [req.body, fecha]
      );
      res.json({
        id: 1,
        message: "El tipo de cambio fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El tipo de cambio no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { fecha } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`tipo-cambio` WHERE fecha = ?;",
        [fecha]
      );
      res.json({
        id: 1,
        message: "El tipo de cambio fue eliminado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El tipo de cambio no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const tipoCambioControllers = new TipoCambioControllers();
export default tipoCambioControllers;
