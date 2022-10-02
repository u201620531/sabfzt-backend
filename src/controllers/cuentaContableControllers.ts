import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class CuentaContableControllers {
  public async list(req: Request, res: Response) {
    const cuentaContables = await pool.query(
      "SELECT * FROM `" + keys.database.database + "`.`cuenta-contable`;"
    );
    res.json(cuentaContables);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idCuentaContable } = req.params;
      const cuentaContable = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`cuenta-contable` WHERE idCuentaContable = ?;",
        [idCuentaContable]
      );
      if (cuentaContable.length > 0) {
        res.json(cuentaContable[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "La cuenta contable no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La cuenta contable no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`cuenta-contable` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "La cuenta contable fue registrada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La cuenta contable no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idCuentaContable } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`cuenta-contable` SET ? WHERE idCuentaContable = ?;",
        [req.body, idCuentaContable]
      );
      res.json({
        id: 1,
        message: "La cuenta contable fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La cuenta contable no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idCuentaContable } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`cuenta-contable` WHERE idCuentaContable = ?;",
        [idCuentaContable]
      );
      res.json({
        id: 1,
        message: "La cuenta contable fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La cuenta contable no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const cuentaContableControllers = new CuentaContableControllers();
export default cuentaContableControllers;
