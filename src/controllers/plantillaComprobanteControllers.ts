import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class PlantillaComprobanteControllers {
  public async list(req: Request, res: Response) {
    const PlantillaComprobantes = await pool.query(
      "SELECT PC.`idPlantillaComprobante`," +
        " PC.`nroTicketEnvio`," +
        " PC.`fechaDeclaracion`," +
        " PC.`observacion`," +
        " PC.`estado`," +
        " CASE WHEN PC.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
        " PC.`fechaCreacion`," +
        " PC.`usuarioCreacion`" +
        " FROM `" + keys.database.database + "`.`plantilla-comprobante` AS PC;"
    );
    res.json(PlantillaComprobantes);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idPlantillaComprobante } = req.params;
      const PlantillaComprobante = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`plantilla-comprobante` WHERE idPlantillaComprobante = ?;",
        [idPlantillaComprobante]
      );
      if (PlantillaComprobante.length > 0) {
        res.json(PlantillaComprobante[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "La plantilla no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La plantilla no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    let idPlantillaComprobante: string = "";
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idPlantillaComprobante FROM `" + keys.database.database + "`.`plantilla-comprobante`;",
        [req.body.PlantillaComprobanteType]
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].idPlantillaComprobante + 1;
      }
      idPlantillaComprobante = id_number.toString().padStart(10, "0");
      req.body.idPlantillaComprobante = idPlantillaComprobante;
      await pool.query("INSERT INTO `" + keys.database.database + "`.`plantilla-comprobante` set ?", [
        req.body,
      ]);
      res.json({
        id: 1,
        message: "La plantilla fue registrada",
        detail: idPlantillaComprobante,
      });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La plantilla no fue registrada",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "UPDATE `" + keys.database.database + "`.`plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ?;",
        [req.body, idPlantillaComprobante]
      );
      res.json({ id: 1, message: "La plantilla fue actualizada", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La plantilla no fue actualizada",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idPlantillaComprobante } = req.params;
      await pool.query(
        "DELETE FROM `" + keys.database.database + "`.`plantilla-comprobante` WHERE idPlantillaComprobante = ?;",
        [idPlantillaComprobante]
      );
      res.json({ id: 1, message: "La plantillafue eliminada", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "La plantilla no no fue eliminada",
        detail: error.message,
      });
    }
  }
}

const plantillaComprobanteControllers = new PlantillaComprobanteControllers();
export default plantillaComprobanteControllers;
