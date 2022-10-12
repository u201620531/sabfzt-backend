import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class SubCuentaContableControllers {
  public async list(req: Request, res: Response) {
    try {
      const SubCuentaContables = await pool.query(
        "SELECT SCC.`idCuentaContable`," +
          " CC.`nombre` AS `nomCuentaContable`," +
          " SCC.`idSubCuentaContable`," +
          " SCC.`nombre`," +
          " SCC.`estado`," +
          " CASE WHEN SCC.`estado`='A' then 'Activo' else 'Inactivo' End AS `desEstado`," +
          " SCC.`fechaCreacion`," +
          " SCC.`usuarioCreacion`" +
          " FROM `" +
          keys.database.database +
          "`.`sub-cuenta-contable` AS SCC" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`cuenta-contable` AS CC ON SCC.`idCuentaContable` = CC.`idCuentaContable`;"
      );
      res.json(SubCuentaContables);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen subcuentas",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idCuentaContable, idSubCuentaContable } = req.params;
      const SubCuentaContable = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`sub-cuenta-contable` WHERE idCuentaContable = ? AND idSubCuentaContable = ?;",
        [idCuentaContable, idSubCuentaContable]
      );
      if (SubCuentaContable.length > 0) {
        res.json(SubCuentaContable[0]);
      } else {
        res.json({
          id: 1,
          text: "La sub cuenta contable no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La sub cuenta contable no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" +
          keys.database.database +
          "`.`sub-cuenta-contable` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "La sub cuenta contable fue registrada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La sub cuenta contable no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idCuentaContable, idSubCuentaContable } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`sub-cuenta-contable` SET ? WHERE idCuentaContable = ? AND idSubCuentaContable = ?;",
        [req.body, idCuentaContable, idSubCuentaContable]
      );
      res.json({
        id: 1,
        message: "La sub cuenta contable fue actualizada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La sub cuenta contable no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idCuentaContable, idSubCuentaContable } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`sub-cuenta-contable` WHERE idCuentaContable = ? AND idSubCuentaContable = ?;",
        [idCuentaContable, idSubCuentaContable]
      );
      res.json({
        id: 1,
        message: "La sub cuenta contable fue eliminada",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La sub cuenta contable no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const subCuentaContableControllers = new SubCuentaContableControllers();
export default subCuentaContableControllers;
