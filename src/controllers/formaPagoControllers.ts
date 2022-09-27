import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class FormaPagoControllers {
  public async list(req: Request, res: Response) {
    const formaPagos = await pool.query(
      "SELECT `forma-pago`.`idFormaPago`," +
        " `forma-pago`.`descripcion`," +
        " `forma-pago`.`abreviatura`," +
        " `forma-pago`.`estado`," +
        " CASE WHEN `estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
        " `forma-pago`.`fechaCreacion`," +
        " `forma-pago`.`usuarioCreacion`" +
        " FROM `" + keys.database.database + "`.`forma-pago`;"
    );
    res.json(formaPagos);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idFormaPago } = req.params;
      const formaPago = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`forma-pago` WHERE idFormaPago = ?;",
        [idFormaPago]
      );
      if (formaPago.length > 0) {
        res.json(formaPago[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "forma-pago no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `" + keys.database.database + "`.`forma-pago` set ?", [req.body]);
      res.json({
        id: 1,
        message: "La forma de pago fue registrada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idFormaPago } = req.params;
      await pool.query(
        "UPDATE `" + keys.database.database + "`.`forma-pago` SET ? WHERE idFormaPago = ?;",
        [req.body, idFormaPago]
      );
      res.json({
        id: 1,
        message: "La forma de pago fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idFormaPago } = req.params;
      await pool.query(
        "DELETE FROM `" + keys.database.database + "`.`forma-pago` WHERE idFormaPago = ?;",
        [idFormaPago]
      );
      res.json({
        id: 1,
        message: "La forma de pago fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const formaPagoControllers = new FormaPagoControllers();
export default formaPagoControllers;
