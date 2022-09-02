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
class TipoDocumentoControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionTypes = yield database_1.default.query("SELECT * FROM sabfztdb.`tipo-documento`;");
                res.json(transactionTypes);
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    text: "tipo-documentos don't exists",
                    detail: error.message,
                });
                console.log(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idTipoDocumento } = req.params;
                const tipoDocumento = yield database_1.default.query("SELECT * FROM sabfztdb.`tipo-documento` WHERE idTipoDocumento = ?;", [idTipoDocumento]);
                if (tipoDocumento.length > 0) {
                    res.json(tipoDocumento[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, message: "tipo-documento no existe", detail: "" });
                }
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "tipo-documento no existe",
                    detail: error.message,
                });
                console.log(error.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `sabfztdb`.`tipo-documento` set ?", [
                    req.body,
                ]);
                res.json({ id: 1, message: "The tipo-documento fue registrado", detail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The tipo-documento no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idTipoDocumento } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`tipo-documento` SET ? WHERE idTipoDocumento = ?;", [req.body, idTipoDocumento]);
                res.json({ id: 1, message: "The tipo-documento fue actualizado", detail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The tipo-documento no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idTipoDocumento } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`tipo-documento` WHERE idTipoDocumento = ?;", [
                    idTipoDocumento,
                ]);
                res.json({ id: 1, message: "The tipo-documento fue eliminado", detail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The tipo-documento no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const tipoDocumentoControllers = new TipoDocumentoControllers();
exports.default = tipoDocumentoControllers;
