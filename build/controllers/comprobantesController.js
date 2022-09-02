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
class ComprobantesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT *" +
                " FROM `sabfztdb`.`comprobante`;");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                const Comprobante = yield database_1.default.query("SELECT * FROM sabfztdb.`comprobante` WHERE idComprobante = ?;", [idComprobante]);
                if (Comprobante.length > 0) {
                    res.json(Comprobante[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "Comprobante no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The Comprobante no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idComprobante FROM `sabfztdb`.`comprobante`;", [req.body.ComprobanteType]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idComprobante + 1;
                }
                const idComprobante = id_number.toString().padStart(10, "0");
                req.body.idComprobante = idComprobante;
                yield database_1.default.query("INSERT INTO `sabfztdb`.`comprobante` set ?", [req.body]);
                res.json({ id: 1, message: "The Comprobante fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The Comprobante no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`comprobante` SET ? WHERE idComprobante = ?;", [
                    req.body,
                    idComprobante,
                ]);
                res.json({ id: 1, message: "The Comprobante fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The Comprobante no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`comprobante` WHERE idComprobante = ?;", [idComprobante]);
                res.json({ id: 1, message: "The Comprobante fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The Comprobante no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const comprobantesController = new ComprobantesController();
exports.default = comprobantesController;
