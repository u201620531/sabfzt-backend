import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class PerfilUsuarioControllers {
  public async list(req: Request, res: Response) {
    try {
      const perfiles = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`perfil-usuario`;"
      );
      res.json(perfiles);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen perfiles de usuario",
        detail: error.message,
      });
    }
  }

  public async getByidPerfilUsuario(req: Request, res: Response): Promise<any> {
    try {
      const { idPerfilUsuario } = req.params;
      const perfilUsuario = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`perfil-usuario` WHERE idPerfilUsuario = ?;",
        [idPerfilUsuario]
      );
      if (perfilUsuario.length > 0) {
        res.json(perfilUsuario);
      } else {
        res.json({ id: 1, text: "perfil de usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El perfil de usuario no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`perfil-usuario` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El perfil de usuario fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El perfil de usuario no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idPerfilUsuario } = req.body;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`perfil-usuario` SET ? WHERE idPerfilUsuario = ?;",
        [idPerfilUsuario]
      );
      res.json({
        id: 1,
        message: "El perfil de usuario fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El perfil de usuario no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idPerfilUsuario } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`perfil-usuario` WHERE idPerfilUsuario = ?;",
        [idPerfilUsuario]
      );
      res.json({
        id: 1,
        message: "El perfil de usuario fue eliminado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El perfil de usuario no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const perfilUsuarioControllers = new PerfilUsuarioControllers();
export default perfilUsuarioControllers;
