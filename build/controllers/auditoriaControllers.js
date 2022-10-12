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
class AuditoriaControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const auditorias = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`auditoria`;");
            res.json(auditorias);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params;
                const auditoria = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`auditoria` WHERE fecha = ?;", [fecha]);
                if (auditoria.length > 0) {
                    res.json(auditoria[0]);
                }
                else {
                    res.json({
                        id: 1,
                        text: "El registro de auditoria no existe",
                        detail: "",
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El registro de auditoria no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { opcion, proceso, codigoError, detalleError, codigoUsuario } = req.body;
                yield database_1.default.query("INSERT INTO `" +
                    keys_1.default.database.database +
                    "`.`auditoria` (`fecha`," +
                    " `opcion`," +
                    " `proceso`," +
                    " `codigoError`," +
                    " `detalleError`," +
                    " `codigoUsuario`) Values (now(), ?, ?, ?, ?, ?)", [opcion, proceso, codigoError, detalleError, codigoUsuario]);
                res.json({
                    id: 1,
                    message: "El registro de auditoria fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El registro de auditoria no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`auditoria` SET ? WHERE fecha = ?;", [req.body, fecha]);
                res.json({
                    id: 1,
                    message: "El registro de auditoria fue actualizado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El registro de auditoria no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`auditoria` WHERE fecha = ?;", [fecha]);
                res.json({
                    id: 1,
                    message: "El registro de auditoria fue eliminado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El registro de auditoria no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const auditoriaControllers = new AuditoriaControllers();
exports.default = auditoriaControllers;
