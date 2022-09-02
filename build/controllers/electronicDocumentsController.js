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
class ElectronicDocumentsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionTypes = yield database_1.default.query("SELECT * FROM sabfztdb.`electronic-document`;");
                res.json(transactionTypes);
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    text: "electronic-documents don't exists",
                    detail: error.message,
                });
                console.log(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idElectronicDocument } = req.params;
                const documentType = yield database_1.default.query("SELECT * FROM sabfztdb.`electronic-document` WHERE idElectronicDocument = ?;", [idElectronicDocument]);
                if (documentType.length > 0) {
                    res.json(documentType[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, message: "electronic-document no existe", detail: "" });
                }
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "electronic-document no existe",
                    detail: error.message,
                });
                console.log(error.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `sabfztdb`.`electronic-document` set ?", [
                    req.body,
                ]);
                res.json({ id: 1, message: "The electronic-document fue registrado", derail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The electronic-document no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idElectronicDocument } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`electronic-document` SET ? WHERE idElectronicDocument = ?;", [req.body, idElectronicDocument]);
                res.json({ id: 1, message: "The electronic-document fue actualizado", detail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The electronic-document no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idElectronicDocument } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`electronic-document` WHERE idElectronicDocument = ?;", [
                    idElectronicDocument,
                ]);
                res.json({ id: 1, message: "The electronic-document fue eliminado", detail: "" });
            }
            catch (error) {
                res
                    .status(404)
                    .json({
                    id: 0,
                    message: "The electronic-document no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const electronicDocumentsController = new ElectronicDocumentsController();
exports.default = electronicDocumentsController;
