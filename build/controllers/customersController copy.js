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
class CustomersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT CL.`id`," +
                " CL.`customerType`," +
                " CT.`description` AS `desCustomerType`," +
                " CL.`documentType`," +
                " DT.`abbreviation` AS `desDocumentType`," +
                " CL.`documentNumber`," +
                " CL.`businessName`," +
                " CL.`comercialName`," +
                " CL.`address`," +
                " CL.`fiscalAddress`," +
                " CL.`status`," +
                " CL.`creationDate`," +
                " CL.`creationUser`" +
                " FROM `sabfztdb`.`customer` AS CL" +
                " INNER JOIN `sabfztdb`.`support-table` AS CT ON CL.`customerType` = CT.value AND CT.id='TCL'" +
                " INNER JOIN `sabfztdb`.`support-table` AS DT ON CL.`documentType` = DT.value AND DT.id='TDC';");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const formatType = yield database_1.default.query("SELECT * FROM sabfztdb.`customer` WHERE id = ?;", [id]);
                if (formatType.length > 0) {
                    res.json(formatType[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "customer no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The customer no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 0;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) id FROM sabfztdb.customer;");
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].id + 1;
                }
                const id = "CL" + id_number.toString().padStart(8, "0");
                req.body.id = id;
                yield database_1.default.query("INSERT INTO `sabfztdb`.`customer` set ?", [req.body]);
                res.json({ id: 1, message: "The customer fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The customer no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`customer` SET ? WHERE id = ?;", [
                    req.body,
                    id,
                ]);
                res.json({ id: 1, message: "The customer fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The customer no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`customer` WHERE id = ?;", [id]);
                res.json({ id: 1, message: "The customer fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The customer no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const customersController = new CustomersController();
exports.default = customersController;
