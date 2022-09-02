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
class SupportTablesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT * FROM `sabfztdb`.`support-table`;");
            res.json(formatTypes);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const formatType = yield database_1.default.query("SELECT * FROM `sabfztdb`.`support-table` WHERE id = ?;", [id]);
                if (formatType.length > 0) {
                    res.json(formatType);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "support-table no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The transaction-type no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `sabfztdb`.`support-table` set ?", [
                    req.body,
                ]);
                res.json({ id: 1, message: "The support-table fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The transaction-type no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, description } = req.body;
                yield database_1.default.query("UPDATE `sabfztdb`.`support-table` SET ? WHERE id = ?;", [description, id]);
                res.json({ id: 1, message: "The support-table fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The transaction-type no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`support-table` WHERE id = ?;", [
                    id,
                ]);
                res.json({ id: 1, message: "The support-table fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The transaction-type no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const supportTablesController = new SupportTablesController();
exports.default = supportTablesController;
