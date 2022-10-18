import { Request, Response } from "express";
import pool from "../database";
import keys from "./../keys";

class TipoDocumentoControllers {
  public async list(req: Request, res: Response) {
    try {
      const transactionTypes = await pool.query(
        "SELECT `tipo-documento`.`idTipoDocumento`," +
          " `tipo-documento`.`descripcion`," +
          " `tipo-documento`.`abreviatura`," +
          " `tipo-documento`.`asientos`," +
          " `tipo-documento`.`estado`," +
          " CASE WHEN `estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
          " `tipo-documento`.`fechaCreacion`," +
          " `tipo-documento`.`usuarioCreacion`" +
          " FROM `" +
          keys.database.database +
          "`.`tipo-documento`;"
      );
      res.json(transactionTypes);
    } catch (error: any) {
      res.json({
        id: 0,
        text: "Tipos de documento no registrados",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idTipoDocumento } = req.params;
      const tipoDocumento = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`tipo-documento` WHERE idTipoDocumento = ?;",
        [idTipoDocumento]
      );
      if (tipoDocumento.length > 0) {
        res.json(tipoDocumento[0]);
      } else {
        res.json({
          id: 1,
          message: "El tipo de documento no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El tipo de documento no existe",
        detail: error.message,
      });
    }
  }

  public async getOneByDescripcion(req: Request, res: Response): Promise<any> {
    try {
      const { desTipoDocumento } = req.params;
      const query =
        "SELECT * FROM `" +
        keys.database.database +
        "`.`tipo-documento` WHERE descripcion LIKE ";
      const tipoDocumento = await pool.query(
        `${query} '%${desTipoDocumento}%'`
      );
      if (tipoDocumento.length > 0) {
        res.json(tipoDocumento[0]);
      } else {
        res.json({
          id: 1,
          message: "El tipo de documento no existe",
          detail: "",
        });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El tipo de documento no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`tipo-documento` set ?",
        [req.body]
      );
      res.json({
        id: 1,
        message: "El tipo de documento fue registrado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El tipo de documento no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idTipoDocumento } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`tipo-documento` SET ? WHERE idTipoDocumento = ?;",
        [req.body, idTipoDocumento]
      );
      res.json({
        id: 1,
        message: "El tipo de documento fue actualizado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El tipo de documento no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idTipoDocumento } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.`tipo-documento` WHERE idTipoDocumento = ?;",
        [idTipoDocumento]
      );
      res.json({
        id: 1,
        message: "El tipo de documento fue eliminado",
        detail: "",
      });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El tipo de documento no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const tipoDocumentoControllers = new TipoDocumentoControllers();
export default tipoDocumentoControllers;
