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
class FormaPagoControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formaPagos = yield database_1.default.query("SELECT `forma-pago`.`idFormaPago`," +
                " `forma-pago`.`descripcion`," +
                " `forma-pago`.`abreviatura`," +
                " `forma-pago`.`estado`," +
                " CASE WHEN `estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
                " `forma-pago`.`fechaCreacion`," +
                " `forma-pago`.`usuarioCreacion`" +
                " FROM `" + keys_1.default.database.database + "`.`forma-pago`;");
            res.json(formaPagos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                const formaPago = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`forma-pago` WHERE idFormaPago = ?;", [idFormaPago]);
                if (formaPago.length > 0) {
                    res.json(formaPago[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "forma-pago no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La forma de pago no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`forma-pago` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "La forma de pago fue registrada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La forma de pago no fue registrada",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                yield database_1.default.query("UPDATE `" + keys_1.default.database.database + "`.`forma-pago` SET ? WHERE idFormaPago = ?;", [req.body, idFormaPago]);
                res.json({
                    id: 1,
                    message: "La forma de pago fue actualizada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La forma de pago no fue actualizada",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                yield database_1.default.query("DELETE FROM `" + keys_1.default.database.database + "`.`forma-pago` WHERE idFormaPago = ?;", [idFormaPago]);
                res.json({
                    id: 1,
                    message: "La forma de pago fue eliminada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "La forma de pago no fue eliminada",
                    detail: error.message,
                });
            }
        });
    }
}
const formaPagoControllers = new FormaPagoControllers();
exports.default = formaPagoControllers;
