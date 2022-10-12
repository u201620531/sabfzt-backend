import { Request, Response } from "express";
import pool from "../database";
import keys from "../keys";

class ProductosController {
  public async list(req: Request, res: Response) {
    try {
      const productos = await pool.query(
        "SELECT PR.`idProducto`," +
          " PR.`idCategoriaProducto`," +
          " CTP.`descripcion` AS `desCategoriaProducto`," +
          " PR.`descripcion`," +
          " PR.`abreviatura`," +
          " PR.`estado`," +
          " PR.`fechaCreacion`," +
          " PR.`usuarioCreacion`" +
          " FROM `" +
          keys.database.database +
          "`.`producto`  AS PR" +
          " INNER JOIN `" +
          keys.database.database +
          "`.`soporte` AS CTP ON PR.`idCategoriaProducto` = CTP.valor AND CTP.idSoporte='CTP';"
      );
      res.json(productos);
    } catch (error: any) {
      res.json({
        id: 0,
        message: "No existen productos",
        detail: error.message,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    try {
      const { idProducto } = req.params;
      const producto = await pool.query(
        "SELECT * FROM `" +
          keys.database.database +
          "`.`producto` WHERE idProducto = ?;",
        [idProducto]
      );
      if (producto.length > 0) {
        res.json(producto[0]);
      } else {
        res.json({ id: 1, text: "producto no existe", detail: "" });
      }
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El producto no existe",
        detail: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      let id_number = 1;
      const getMaxId = await pool.query(
        "SELECT COUNT(*) idProducto FROM `" +
          keys.database.database +
          "`.`producto`;"
      );
      if (getMaxId.length > 0) {
        id_number = getMaxId[0].idProducto + 1;
      }
      const idProducto = "P" + id_number.toString().padStart(9, "0");
      req.body.idProducto = idProducto;
      await pool.query(
        "INSERT INTO `" + keys.database.database + "`.`producto` set ?",
        [req.body]
      );
      res.json({ id: 1, message: "El producto fue registrado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El producto no fue registrado",
        detail: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { idProducto } = req.params;
      await pool.query(
        "UPDATE `" +
          keys.database.database +
          "`.`producto` SET ? WHERE idProducto = ?;",
        [req.body, idProducto]
      );
      res.json({ id: 1, message: "El producto fue actualizado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El producto no fue actualizado",
        detail: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { idProducto } = req.params;
      await pool.query(
        "DELETE FROM `" +
          keys.database.database +
          "`.producto WHERE idProducto = ?;",
        [idProducto]
      );
      res.json({ id: 1, message: "El producto fue eliminado", detail: "" });
    } catch (error: any) {
      res.json({
        id: 0,
        message: "El producto no fue eliminado",
        detail: error.message,
      });
    }
  }
}

const productosController = new ProductosController();
export default productosController;
