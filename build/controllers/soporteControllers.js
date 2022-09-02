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
class SoporteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const soportes = yield database_1.default.query("SELECT * FROM `sabfztdb`.`soporte`;");
            res.json(soportes);
        });
    }
    getByidSoporte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte } = req.params;
                const soporte = yield database_1.default.query("SELECT * FROM `sabfztdb`.`soporte` WHERE idSoporte = ?;", [idSoporte]);
                if (soporte.length > 0) {
                    res.json(soporte);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "soporte no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The soporte no existe",
                    detail: error.message,
                });
            }
        });
    }
    getByidSoporteAndValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte, valor } = req.params;
                const soporte = yield database_1.default.query("SELECT * FROM `sabfztdb`.`soporte` WHERE idSoporte = ? AND valor = ?;", [idSoporte, valor]);
                if (soporte.length > 0) {
                    res.json(soporte);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "soporte no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The soporte no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `sabfztdb`.`soporte` set ?", [
                    req.body,
                ]);
                res.json({ id: 1, message: "The soporte fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The soporte no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte, description } = req.body;
                yield database_1.default.query("UPDATE `sabfztdb`.`soporte` SET ? WHERE idSoporte = ?;", [description, idSoporte]);
                res.json({ id: 1, message: "The soporte fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The soporte no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`soporte` WHERE idSoporte = ?;", [
                    idSoporte,
                ]);
                res.json({ id: 1, message: "The soporte fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The soporte no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const soporteControllers = new SoporteControllers();
exports.default = soporteControllers;
