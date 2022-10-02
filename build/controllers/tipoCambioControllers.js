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
class TipoCambioControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoCambios = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`tipo-cambio`;");
            res.json(tipoCambios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.params;
                const tipoCambio = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`tipo-cambio` WHERE fecha = ?;", [fecha]);
                if (tipoCambio.length > 0) {
                    res.json(tipoCambio[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "tipoCambio no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El tipo de cambio no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`tipo-cambio` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El tipo de cambio fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El tipo de cambio no fue registrado",
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
                    "`.`tipo-cambio` SET ? WHERE fecha = ?;", [req.body, fecha]);
                res.json({
                    id: 1,
                    message: "El tipo de cambio fue actualizado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El tipo de cambio no fue actualizado",
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
                    "`.`tipo-cambio` WHERE fecha = ?;", [fecha]);
                res.json({
                    id: 1,
                    message: "El tipo de cambio fue eliminado",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El tipo de cambio no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const tipoCambioControllers = new TipoCambioControllers();
exports.default = tipoCambioControllers;
