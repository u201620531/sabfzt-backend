import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class ProveedorControllers {
  public async list(req: Request, res: Response) {
    const proveedores = await pool.query(
      "SELECT PV.`idProveedor`," +
        " PV.`idTipoProveedor`," +
        " TPV.`descripcion` As `desTipoProveedor`," +
        " PV.`idTipoDocumento`," +
        " TDP.`descripcion` As `desTipoDocumento`," +
        " TDP.`abreviatura` As `abrTipoDocumento`," +
        " PV.`nroDocumento`," +
        " PV.`razonSocial`," +
        " PV.`nombreComercial`," +
        " PV.`direccion`," +
        " PV.`direccionFiscal`," +
        " PV.`email1`," +
        " PV.`email2`," +
        " PV.`estado`," +
        " CASE WHEN PV.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`,"+
        " PV.`fechaCreacion`," +
        " PV.`usuarioCreacion`" +
        " FROM `" + keys.database.database + "`.`proveedor` AS PV" +
        " INNER JOIN `" + keys.database.database + "`.`soporte` AS TPV ON PV.`idTipoProveedor` = TPV.valor AND TPV.idSoporte='TPV'" +
        " INNER JOIN `" + keys.database.database + "`.`soporte` AS TDP ON PV.`idTipoDocumento` = TDP.valor AND TDP.idSoporte='TDP';"
    );
    res.json(proveedores);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idProveedor } = req.params;
      const proveedor = await pool.query(
        "SELECT * FROM `" + keys.database.database + "`.`proveedor` WHERE idProveedor = ?;",
        [idProveedor]
      );
      if (proveedor.length > 0) {
        res.json(proveedor[0]);
      } else {
        res
          .status(404)
          .json({ id: 1, text: "proveedor no existe", detail: "" });
      }
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El proveedor no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idProveedor FROM `" + keys.database.database + "`.`proveedor` WHERE `proveedor`.`idTipoProveedor` = ?;",
        [req.body.idTipoProveedor]
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].idProveedor + 1;
      }
      const idProveedor =
        req.body.idTipoProveedor + id_number.toString().padStart(9, "0");
      req.body.idProveedor = idProveedor;
      await pool.query("INSERT INTO `" + keys.database.database + "`.`proveedor` set ?", [req.body]);
      res.json({ id: 1, message: "El proveedor fue registrado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El proveedor no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idProveedor } = req.params;
      await pool.query(
        "UPDATE `" + keys.database.database + "`.`proveedor` SET ? WHERE idProveedor = ?;",
        [req.body, idProveedor]
      );
      res.json({ id: 1, message: "El proveedor fue actualizado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El proveedor no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idProveedor } = req.params;
      await pool.query(
        "DELETE FROM `" + keys.database.database + "`.`proveedor` WHERE idProveedor = ?;",
        [idProveedor]
      );
      res.json({ id: 1, message: "El proveedor fue eliminado", detail: "" });
    } catch (error: any) {
      res.status(404).json({
        id: 0,
        message: "El proveedor no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const proveedorControllers = new ProveedorControllers();
export default proveedorControllers;
