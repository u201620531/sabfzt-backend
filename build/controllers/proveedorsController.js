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
class SuppliersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT SL.`idSupplier`," +
                " SL.`idSupplierType`," +
                " ST.`description` AS `desSupplierType`," +
                " SL.`idDocumentType`," +
                " DT.`abbreviation` AS `desDocumentType`," +
                " SL.`documentNumber`," +
                " SL.`businessName`," +
                " SL.`comercialName`," +
                " SL.`address`," +
                " SL.`fiscalAddress`," +
                " SL.`status`," +
                " SL.`creationDate`," +
                " SL.`creationUser`" +
                " FROM `sabfztdb`.`supplier` AS SL" +
                " INNER JOIN `sabfztdb`.`support-table` AS ST ON SL.`idSupplierType` = ST.value AND ST.id='TSL'" +
                " INNER JOIN `sabfztdb`.`support-table` AS DT ON SL.`idDocumentType` = DT.value AND DT.id='TDS';");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSupplier } = req.params;
                const supplier = yield database_1.default.query("SELECT * FROM sabfztdb.`supplier` WHERE idSupplier = ?;", [idSupplier]);
                if (supplier.length > 0) {
                    res.json(supplier[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "supplier no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The supplier no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idSupplier FROM `sabfztdb`.`supplier` WHERE `supplier`.`supplierType` = ?;", [req.body.supplierType]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].id + 1;
                }
                const idSupplier = req.body.supplierType + id_number.toString().padStart(9, "0");
                req.body.idSupplier = idSupplier;
                yield database_1.default.query("INSERT INTO `sabfztdb`.`supplier` set ?", [req.body]);
                res.json({ id: 1, message: "The supplier fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The supplier no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSupplier } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`supplier` SET ? WHERE idSupplier = ?;", [
                    req.body,
                    idSupplier,
                ]);
                res.json({ id: 1, message: "The supplier fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The supplier no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSupplier } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`supplier` WHERE idSupplier = ?;", [idSupplier]);
                res.json({ id: 1, message: "The supplier fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The supplier no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const suppliersController = new SuppliersController();
exports.default = suppliersController;
