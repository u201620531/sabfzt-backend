import { Request, Response } from "express";
import pool from "../database";

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
        " FROM `sabfztdb`.`forma-pago`;"
    );
    res.json(formaPagos);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idFormaPago } = req.params;
      const formaPago = await pool.query(
        "SELECT * FROM sabfztdb.`forma-pago` WHERE idFormaPago = ?;",
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
      await pool.query("INSERT INTO `sabfztdb`.`forma-pago` set ?", [req.body]);
      res.json({
        id: 1,
        message: "La forma de pago fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idFormaPago } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`forma-pago` SET ? WHERE idFormaPago = ?;",
        [req.body, idFormaPago]
      );
      res.json({
        id: 1,
        message: "La forma de pago fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idFormaPago } = req.params;
      await pool.query(
        "DELETE FROM `sabfztdb`.`forma-pago` WHERE idFormaPago = ?;",
        [idFormaPago]
      );
      res.json({
        id: 1,
        message: "La forma de pago fue eliminado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La forma de pago no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const formaPagoControllers = new FormaPagoControllers();
export default formaPagoControllers;
