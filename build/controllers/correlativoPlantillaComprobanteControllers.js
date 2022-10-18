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
class CorrelativocorrelativoPlantillaComprobanteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const correlativoPlantillaComprobantes = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`correlativo-plantilla-comprobante`;");
                res.json(correlativoPlantillaComprobantes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen correlativos",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ano, mes } = req.params;
                const correlativoPlantillaComprobante = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`correlativo-plantilla-comprobante` WHERE ano = ? AND mes = ?;", [ano, mes]);
                if (correlativoPlantillaComprobante.length > 0) {
                    res.json(correlativoPlantillaComprobante[0]);
                }
                else {
                    res.json({ id: 1, text: "El correlativo no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El correlativo no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" +
                    keys_1.default.database.database +
                    "`.`correlativo-plantilla-comprobante` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El correlativo fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El correlativo no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ano, mes } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`correlativo-plantilla-comprobante` SET ? WHERE ano = ? AND mes = ?;", [req.body, ano, mes]);
                res.json({ id: 1, message: "El correlativo fue actualizad", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El correlativo no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ano, mes } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`correlativo-plantilla-comprobante` WHERE ano = ? AND mes = ?;", [ano, mes]);
                res.json({ id: 1, message: "El correlativo fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El correlativo no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const correlativocorrelativoPlantillaComprobanteControllers = new CorrelativocorrelativoPlantillaComprobanteControllers();
exports.default = correlativocorrelativoPlantillaComprobanteControllers;
