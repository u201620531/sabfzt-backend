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
class TransactionTypeController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionTypes = yield database_1.default.query('SELECT * FROM sabfztdb.`transaction-type`;');
            res.json(transactionTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const transactionType = yield database_1.default.query('SELECT * FROM sabfztdb.`transaction-type` WHERE id = ?;', [id]);
            if (transactionType.length > 0) {
                res.json(transactionType[0]);
            }
            res.status(404).json({ text: "transaction-type no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO `sabfztdb`.`transaction-type` set ?', [req.body]);
            res.json({ message: 'The transaction-type fue registrado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE `sabfztdb`.`transaction-type` SET ? WHERE id = ?;', [
                req.body,
                id,
            ]);
            res.json({ message: 'The transaction-type fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM `sabfztdb`.`transaction-type` WHERE id = ?;', [
                id,
            ]);
            res.json({ message: 'The transaction-type fue eliminado' });
        });
    }
}
const transactionTypeController = new TransactionTypeController();
exports.default = transactionTypeController;
