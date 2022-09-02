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
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT PR.`idProduct`," +
                " PR.`idCategoryProduct`," +
                " CTP.`description` AS `desCategoryProduct`," +
                " PR.`description`," +
                " PR.`abbreviation`," +
                " PR.`status`," +
                " PR.`creationDate`," +
                " PR.`creationUser`" +
                " FROM `sabfztdb`.`product`  AS PR" +
                " INNER JOIN `sabfztdb`.`support-table` AS CTP ON PR.`idCategoryProduct` = CTP.value AND CTP.id='CTP';");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const formatType = yield database_1.default.query("SELECT * FROM sabfztdb.`product` WHERE idProduct = ?;", [id]);
                if (formatType.length > 0) {
                    res.json(formatType[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "product no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The product wasn't exists",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idProduct FROM `sabfztdb`.`product`;");
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idProduct + 1;
                }
                const idProduct = "P" + id_number.toString().padStart(9, "0");
                req.body.idProduct = idProduct;
                yield database_1.default.query("INSERT INTO `sabfztdb`.`product` set ?", [req.body]);
                res.json({ id: 1, message: "The product fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The product no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`product` SET ? WHERE idProduct = ?;", [
                    req.body,
                    idProduct,
                ]);
                res.json({ id: 1, message: "The product fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The product no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProduct } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`product` WHERE idProduct = ?;", [idProduct]);
                res.json({ id: 1, message: "The product fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The product no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const productsController = new ProductsController();
exports.default = productsController;
