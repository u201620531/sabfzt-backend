import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class ModuloControllers {
  public async list(req: Request, res: Response) {
    const modulos = await pool.query("SELECT * FROM `" + keys.database.database + "`.`modulo`;");
    res.json(modulos);
  }

  public async getByIdModulo(req: Request, res: Response): Promise<any> {
    try {
      const { idModulo } = req.params;
      const modulo = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`modulo` WHERE idModulo = ?;",
        [idModulo]
      );
      if (modulo.length > 0) {
        res.json(modulo);
      } else {
        res.status(404).json({ id: 1, text: "modulo no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El modulo no existe",
        detail: error.message,
      });
    }
  }

  public async getByIdPerfilUsuario(req: Request, res: Response): Promise<any> {
    try {
      const { idPerfilUsuario } = req.params;
      const modulos = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`modulo` WHERE idPerfilUsuario = ?;",
        [idPerfilUsuario]
      );
      if (modulos.length > 0) {
        res.json(modulos);
      } else {
        res
          .status(404)
          .json({
            id: 1,
            text: "Perfil de usuario no tiene modulos asignados",
            detail: "",
          });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El modulo no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `" + keys.database.database + "`.`modulo` set ?", [req.body]);
      res.json({ id: 1, message: "El modulo fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El modulo no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idModulo, description } = req.body;
      await pool.query("UPDATE `" + keys.database.database + "`.`modulo` SET ? WHERE idModulo = ?;", [
        description,
        idModulo,
      ]);
      res.json({ id: 1, message: "El modulo fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El modulo no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idModulo } = req.params;
      await pool.query("DELETE FROM `" + keys.database.database + "`.`modulo` WHERE idModulo = ?;", [
        idModulo,
      ]);
      res.json({ id: 1, message: "El modulo fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El modulo no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const moduloControllers = new ModuloControllers();
export default moduloControllers;
