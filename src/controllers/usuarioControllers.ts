import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class UsuarioControllers {
  public async list(req: Request, res: Response) {
    const usuarios = await pool.query("SELECT * FROM `" + keys.database.database + "`.`usuario`;");
    res.json(usuarios);
  }

  public async getBycodigoUsuarioAndContrasena(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { codigoUsuario, contrasena } = req.params;
      const usuario = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`usuario` WHERE codigoUsuario = ? AND contrasena = ?;",
        [codigoUsuario, contrasena]
      );
      if (usuario.length > 0) {
        res.json(usuario[0]);
      } else {
        res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no existe",
        detail: error.message,
      });
    }
  }

  public async getBycodigoUsuarioAndValue(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { codigoUsuario, valor } = req.params;
      const usuario = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`usuario` WHERE codigoUsuario = ? AND valor = ?;",
        [codigoUsuario, valor]
      );
      if (usuario.length > 0) {
        res.json(usuario);
      } else {
        res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no existe",
        detail: error.message,
      });
    }
  }

  public async authentication(req: Request, res: Response): Promise<void> {
    try {
      const { codigoUsuario, contrasena } = req.body;
      const usuario = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`usuario` WHERE codigoUsuario = ? AND contrasena = ?;",
        [codigoUsuario, contrasena]
      );
      if (usuario.length > 0) {
        res.json(usuario);
      } else {
        res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `" + keys.database.database + "`.`usuario` set ?", [req.body]);
      res.json({ id: 1, message: "El usuario fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { codigoUsuario, description } = req.body;
      await pool.query(
        "UPDATE `" + keys.database.database + "`.`usuario` SET ? WHERE codigoUsuario = ?;",
        [description, codigoUsuario]
      );
      res.json({ id: 1, message: "El usuario fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { codigoUsuario } = req.params;
      await pool.query(
        "DELETE FROM `" + keys.database.database + "`.`usuario` WHERE codigoUsuario = ?;",
        [codigoUsuario]
      );
      res.json({ id: 1, message: "El usuario fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El usuario no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const usuarioControllers = new UsuarioControllers();
export default usuarioControllers;
