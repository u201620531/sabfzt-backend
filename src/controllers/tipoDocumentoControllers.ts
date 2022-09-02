import { Request, Response } from "express";
import pool from "../database";

class TipoDocumentoControllers {
  public async list(req: Request, res: Response) {
    try {
      const transactionTypes = await pool.query(
        "SELECT * FROM sabfztdb.`tipo-documento`;"
      );
      res.json(transactionTypes);
    } catch (error: any) {
      res
        .status(404)
        .json({
          id: 0,
          text: "tipo-documentos don't exists",
          detail: error.message,
        });
      console.log(error);
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idTipoDocumento } = req.params;
      const tipoDocumento = await pool.query(
        "SELECT * FROM sabfztdb.`tipo-documento` WHERE idTipoDocumento = ?;",
        [idTipoDocumento]
      );
      if (tipoDocumento.length > 0) {
        res.json(tipoDocumento[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, message: "tipo-documento no existe", detail: "" });
      }
    } catch (error: any) {
      res
        .status(404)
        .json({
          id: 0,
          message: "tipo-documento no existe",
          detail: error.message,
        });
      console.log(error.message);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `sabfztdb`.`tipo-documento` set ?", [
        req.body,
      ]);
      res.json({ id: 1, message: "The tipo-documento fue registrado", detail: "" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          id: 0,
          message: "The tipo-documento no fue registrado",
          detail: error.message,
        });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idTipoDocumento } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`tipo-documento` SET ? WHERE idTipoDocumento = ?;",
        [req.body, idTipoDocumento]
      );
      res.json({ id: 1, message: "The tipo-documento fue actualizado", detail: "" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          id: 0,
          message: "The tipo-documento no fue actualizado",
          detail: error.message,
        });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idTipoDocumento } = req.params;
      await pool.query("DELETE FROM `sabfztdb`.`tipo-documento` WHERE idTipoDocumento = ?;", [
        idTipoDocumento,
      ]);
      res.json({ id: 1, message: "The tipo-documento fue eliminado", detail: "" });
    } catch (error: any) {
      res
        .status(404)
        .json({
          id: 0,
          message: "The tipo-documento no fue eliminado",
          detail: error.message,
        });
    }
  }
}

const tipoDocumentoControllers = new TipoDocumentoControllers();
export default tipoDocumentoControllers;
