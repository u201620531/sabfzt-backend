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
class MonedaControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const monedas = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`moneda`;");
                res.json(monedas);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen monedas",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idMoneda } = req.params;
                const moneda = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`moneda` WHERE idMoneda = ?;", [idMoneda]);
                if (moneda.length > 0) {
                    res.json(moneda[0]);
                }
                else {
                    res.json({ id: 1, text: "moneda no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La moneda no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`moneda` set ?", [req.body]);
                res.json({ id: 1, message: "La moneda fue registrado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La moneda no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idMoneda } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`moneda` SET ? WHERE idMoneda = ?;", [req.body, idMoneda]);
                res.json({ id: 1, message: "La moneda fue actualizado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La moneda no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idMoneda } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`moneda` WHERE idMoneda = ?;", [idMoneda]);
                res.json({ id: 1, message: "La moneda fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La moneda no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const monedaControllers = new MonedaControllers();
exports.default = monedaControllers;
