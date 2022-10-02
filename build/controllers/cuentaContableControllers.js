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
class CuentaContableControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuentaContables = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`cuenta-contable`;");
            res.json(cuentaContables);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCuentaContable } = req.params;
                const cuentaContable = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`cuenta-contable` WHERE idCuentaContable = ?;", [idCuentaContable]);
                if (cuentaContable.length > 0) {
                    res.json(cuentaContable[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "La cuenta contable no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La cuenta contable no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`cuenta-contable` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "La cuenta contable fue registrada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La cuenta contable no fue registrada",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCuentaContable } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`cuenta-contable` SET ? WHERE idCuentaContable = ?;", [req.body, idCuentaContable]);
                res.json({
                    id: 1,
                    message: "La cuenta contable fue actualizada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La cuenta contable no fue actualizada",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCuentaContable } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`cuenta-contable` WHERE idCuentaContable = ?;", [idCuentaContable]);
                res.json({
                    id: 1,
                    message: "La cuenta contable fue eliminada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La cuenta contable no fue eliminada",
                    detail: error.message,
                });
            }
        });
    }
}
const cuentaContableControllers = new CuentaContableControllers();
exports.default = cuentaContableControllers;
