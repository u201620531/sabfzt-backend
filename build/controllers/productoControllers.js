"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const keys_1 = __importDefault(require("../keys"));
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield database_1.default.query("SELECT PR.`idProducto`," +
                " PR.`idCategoriaProducto`," +
                " CTP.`descripcion` AS `desCategoriaProducto`," +
                " PR.`descripcion`," +
                " PR.`abreviatura`," +
                " PR.`estado`," +
                " PR.`fechaCreacion`," +
                " PR.`usuarioCreacion`" +
                " FROM `" + keys_1.default.database.database + "`.`producto`  AS PR" +
                " INNER JOIN `" + keys_1.default.database.database + "`.`soporte` AS CTP ON PR.`idCategoriaProducto` = CTP.valor AND CTP.idSoporte='CTP';");
            res.json(productos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProducto } = req.params;
                const producto = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`producto` WHERE idProducto = ?;", [idProducto]);
                if (producto.length > 0) {
                    res.json(producto[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "producto no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El producto no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idProducto FROM `" + keys_1.default.database.database + "`.`producto`;");
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idProducto + 1;
                }
                const idProducto = "P" + id_number.toString().padStart(9, "0");
                req.body.idProducto = idProducto;
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`producto` set ?", [req.body]);
                res.json({ id: 1, message: "El producto fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El producto no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProducto } = req.params;
                yield database_1.default.query("UPDATE `" + keys_1.default.database.database + "`.`producto` SET ? WHERE idProducto = ?;", [
                    req.body,
                    idProducto,
                ]);
                res.json({ id: 1, message: "El producto fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El producto no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProducto } = req.params;
                yield database_1.default.query("DELETE FROM `" + keys_1.default.database.database + "`.producto WHERE idProducto = ?;", [idProducto]);
                res.json({ id: 1, message: "El producto fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El producto no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const productosController = new ProductosController();
exports.default = productosController;
