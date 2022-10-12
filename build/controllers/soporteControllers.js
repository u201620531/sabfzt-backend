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
class SoporteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const soportes = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`soporte`;");
                res.json(soportes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen soportes",
                    detail: error.message,
                });
            }
        });
    }
    getByidSoporte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte } = req.params;
                const soporte = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`soporte` WHERE idSoporte = ?;", [idSoporte]);
                if (soporte.length > 0) {
                    res.json(soporte);
                }
                else {
                    res.json({
                        id: 1,
                        text: "El registro de soporte no existe",
                        detail: "",
                    });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El registro de soporte no existe",
                    detail: error.message,
                });
            }
        });
    }
    getByidSoporteAndValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte, valor } = req.params;
                const soporte = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`soporte` WHERE idSoporte = ? AND valor = ?;", [idSoporte, valor]);
                if (soporte.length > 0) {
                    res.json(soporte);
                }
                else {
                    res.json({ id: 1, text: "soporte no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El registro de soporte no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`soporte` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El registro de soporte fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El registro de soporte no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte, description } = req.body;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`soporte` SET ? WHERE idSoporte = ?;", [description, idSoporte]);
                res.json({
                    id: 1,
                    message: "El registro de soporte fue actualizado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El registro de soporte no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSoporte } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`soporte` WHERE idSoporte = ?;", [idSoporte]);
                res.json({
                    id: 1,
                    message: "El registro de soporte fue eliminado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El registro de soporte no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const soporteControllers = new SoporteControllers();
exports.default = soporteControllers;
