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
class FormaPagosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT * FROM sabfztdb.`forma-pago`;");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                const formatType = yield database_1.default.query("SELECT * FROM sabfztdb.`forma-pago` WHERE idFormaPago = ?;", [idFormaPago]);
                if (formatType.length > 0) {
                    res.json(formatType[0]);
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
                    message: "The forma-pago no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `sabfztdb`.`forma-pago` set ?", [req.body]);
                res.json({ id: 1, message: "The forma-pago fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The forma-pago no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`forma-pago` SET ? WHERE idFormaPago = ?;", [
                    req.body,
                    idFormaPago,
                ]);
                res.json({ id: 1, message: "The forma-pago fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The forma-pago no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFormaPago } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`forma-pago` WHERE idFormaPago = ?;", [idFormaPago]);
                res.json({ id: 1, message: "The forma-pago fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The forma-pago no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const formaPagosController = new FormaPagosController();
exports.default = formaPagosController;
