import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../auth/functions";
import pool from "../database";
import keys from "../keys";

class UsuarioControllers {
  public async list(req: Request, res: Response) {
    try {
      const usuarios = await pool.query(
        "SELECT U.`idEmpleado`," +
          " CONCAT(E.apellido, ', ', E.nombre) AS nomEmpleado," +
          " U.`codigoUsuario`," +
          " U.`contrasena`," +
          " U.`idPerfilUsuario`," +
          " PU.nombre AS nomPerfilUsuario," +
          " U.`estado`," +
          " CASE WHEN U.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
          " U.`fechaCreacion`," +
          " U.`usuarioCreacion`" +
          " FROM `" +
          keys.database.database +
          "`.`usuario` AS U" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`empleado` AS E ON U.idEmpleado = E.idEmpleado" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`perfil-usuario` AS PU ON U.idPerfilUsuario = PU.idPerfilUsuario;"
      );
      res.json(usuarios);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen usuarios",
        detail: error.message,
      });
    }
  }

  public async getBycodigoUsuarioAndContrasena(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { codigoUsuario, contrasena } = req.params;
      const usuario = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`usuario` WHERE codigoUsuario = ?;",
        [codigoUsuario]
      );
      let contrasenaHash: any = "";
      if (usuario.length > 0) {
        await comparePassword(contrasena, usuario[0].contrasena).then(
          (value: any) => (contrasenaHash = value)
        );
        if (contrasenaHash) {
          res.json(usuario[0]);
        } else {
          res.json({ id: 1, message: "Contrasena incorrecta", detail: "" });
        }
      } else {
        res.json({ id: 1, message: "El usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El usuario no existe",
        detail: error.message,
      });
    }
  }

  public async getByCodigoUsuario(req: Request, res: Response): Promise<any> {
    try {
      const { codigoUsuario } = req.params;
      const usuario = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`usuario` WHERE codigoUsuario = ?;",
        [codigoUsuario]
      );
      if (usuario.length > 0) {
        res.json(usuario[0]);
      } else {
        res.json({ id: 1, message: "El usuario no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El usuario no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`usuario` set ?",
        [req.body]
      );
      res.json({ id: 1, message: "El usuario fue registrado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El usuario no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      let { idEmpleado, codigoUsuario } = req.body;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`usuario` SET ? WHERE `idEmpleado` = ? AND `codigoUsuario` = ?;",
        [req.body, idEmpleado, codigoUsuario]
      );
      res.json({ id: 1, message: "El usuario fue actualizado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El usuario no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async updateAuthentication(
    req: Request,
    res: Response
  ): Promise<void> {
      let testp='';
    try {
      let { codigoUsuario, contrasena } = req.body;
      await hashPassword(contrasena).then((value: any) => (contrasena = value));
      await hashPassword(contrasena).then((value: any) => (testp = value));
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`usuario` SET `contrasena` = ? WHERE `codigoUsuario` = ?;",
        [contrasena, codigoUsuario]
      );
      res.json({ id: 1, message: "La contrasena fue actualizada", detail: testp });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "La contrasena no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { codigoUsuario } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`usuario` WHERE codigoUsuario = ?;",
        [codigoUsuario]
      );
      res.json({ id: 1, message: "El usuario fue eliminado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El usuario no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const usuarioControllers = new UsuarioControllers();
export default usuarioControllers;
