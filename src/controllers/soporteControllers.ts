import { Request, Response } from "express";
import pool from "../database";

class SoporteControllers {
  public async list(req: Request, res: Response) {
    const soportes = await pool.query(
      "SELECT * FROM `sabfztdb`.`soporte`;"
    );
    res.json(soportes);
  }

  public async getByidSoporte(req: Request, res: Response): Promise<any> {
    try {
      const { idSoporte } = req.params;
      const soporte = await pool.query(
        "SELECT * FROM `sabfztdb`.`soporte` WHERE idSoporte = ?;",
        [idSoporte]
      );
      if (soporte.length > 0) {
        res.json(soporte);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "soporte no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The soporte no existe",
        detail: error.message,
      });
    }
  }

  public async getByidSoporteAndValue(req: Request, res: Response): Promise<any> {
    try {
      const { idSoporte, valor } = req.params;
      const soporte = await pool.query(
        "SELECT * FROM `sabfztdb`.`soporte` WHERE idSoporte = ? AND valor = ?;",
        [idSoporte, valor]
      );
      if (soporte.length > 0) {
        res.json(soporte);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "soporte no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The soporte no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("INSERT INTO `sabfztdb`.`soporte` set ?", [
        req.body,
      ]);
      res.json({ id: 1, message: "The soporte fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The soporte no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idSoporte, description } = req.body;
      await pool.query(
        "UPDATE `sabfztdb`.`soporte` SET ? WHERE idSoporte = ?;",
        [description, idSoporte]
      );
      res.json({ id: 1, message: "The soporte fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The soporte no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idSoporte } = req.params;
      await pool.query("DELETE FROM `sabfztdb`.`soporte` WHERE idSoporte = ?;", [
        idSoporte,
      ]);
      res.json({ id: 1, message: "The soporte fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "The soporte no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const soporteControllers = new SoporteControllers();
export default soporteControllers;
