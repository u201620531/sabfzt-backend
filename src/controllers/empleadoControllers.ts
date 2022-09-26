import { Request, Response } from "express";
import pool from "../database";

class EmpleadoControllers {
  public async list(req: Request, res: Response) {
    const empleadoes = await pool.query(
      "SELECT EM.`idEmpleado`," +
        " EM.`idCargo`," +
        " CEM.`descripcion` As `desCargo`," +
        " EM.`nombre`," +
        " EM.`apellido`," +
        " EM.`direccion`," +
        " EM.`telefono`," +
        " EM.`email1`," +
        " EM.`email2`," +
        " EM.`fechaNacimiento`," +
        " EM.`estado`," +
        " EM.`fechaCreacion`," +
        " EM.`usuarioCreacion`" +
        " FROM `sabfztdb`.`empleado` AS EM" +
        " INNER JOIN `sabfztdb`.`soporte` AS CEM ON EM.`idCargo` = CEM.valor AND CEM.idSoporte='CEM';"
    );
    res.json(empleadoes);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idEmpleado } = req.params;
      const empleado = await pool.query(
        "SELECT * FROM sabfztdb.`empleado` WHERE idEmpleado = ?;",
        [idEmpleado]
      );
      if (empleado.length > 0) {
        res.json(empleado[0]);
      } else {
        res.status(404).json({ id: 1, text: "empleado no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El empleado no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idEmpleado FROM `sabfztdb`.`empleado`;"
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].id + 1;
      }
      const idEmpleado = "E" + id_number.toString().padStart(9, "0");
      req.body.idEmpleado = idEmpleado;
      await pool.query("INSERT INTO `sabfztdb`.`empleado` set ?", [req.body]);
      res.json({ id: 1, message: "El empleado fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El empleado no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idEmpleado } = req.params;
      await pool.query(
        "UPDATE `sabfztdb`.`empleado` SET ? WHERE idEmpleado = ?;",
        [req.body, idEmpleado]
      );
      res.json({ id: 1, message: "El empleado fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El empleado no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idEmpleado } = req.params;
      await pool.query(
        "DELETE FROM `sabfztdb`.`empleado` WHERE idEmpleado = ?;",
        [idEmpleado]
      );
      res.json({ id: 1, message: "El empleado fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El empleado no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const empleadoControllers = new EmpleadoControllers();
export default empleadoControllers;
