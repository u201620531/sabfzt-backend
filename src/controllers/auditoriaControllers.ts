import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class AuditoriaControllers {
  public async list(req: Request, res: Response) {
    const auditorias = await pool.query(
      "SELECT * FROM `" + keys.database.database + "`.`auditoria`;"
    );
    res.json(auditorias);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { fecha } = req.params;
      const auditoria = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`auditoria` WHERE fecha = ?;",
        [fecha]
      );
      if (auditoria.length > 0) {
        res.json(auditoria[0]);
      } else {
        res.json({
          id: 1,
          text: "El registro de auditoria no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El registro de auditoria no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { opcion, proceso, codigoError, detalleError, codigoUsuario } = req.body;
      await pool.query(
        "INSERT INTO `" +
          keys.database.database +
          "`.`auditoria` (`fecha`," +
          " `opcion`," +
          " `proceso`," +
          " `codigoError`," +
          " `detalleError`," +
          " `codigoUsuario`) Values (now(), ?, ?, ?, ?, ?)",
        [opcion, proceso, codigoError, detalleError, codigoUsuario]
      );
      res.json({
        id: 1,
        message: "El registro de auditoria fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El registro de auditoria no fue registrado",
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
          "`.`auditoria` SET ? WHERE fecha = ?;",
        [req.body, fecha]
      );
      res.json({
        id: 1,
        message: "El registro de auditoria fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El registro de auditoria no fue actualizado",
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
          "`.`auditoria` WHERE fecha = ?;",
        [fecha]
      );
      res.json({
        id: 1,
        message: "El registro de auditoria fue eliminado",
        detail: "",
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El registro de auditoria no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const auditoriaControllers = new AuditoriaControllers();
export default auditoriaControllers;
