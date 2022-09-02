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
class FormatTypeController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatTypes = yield database_1.default.query("SELECT * FROM sabfztdb.`format-type`;");
            res.json(formatTypes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const formatType = yield database_1.default.query("SELECT * FROM sabfztdb.`format-type` WHERE id = ?;", [id]);
            if (formatType.length > 0) {
                res.json(formatType[0]);
            }
            res.status(404).json({ text: "format-type no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO `sabfztdb`.`format-type` set ?", [req.body]);
            res.json({ message: "The format-type fue registrado" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description } = req.body;
            yield database_1.default.query("UPDATE `sabfztdb`.`format-type` SET description = ? WHERE id = ?;", [description, id]);
            res.json({ message: "The format-type fue actualizado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM `sabfztdb`.`format-type` WHERE id = ?;", [
                id,
            ]);
            res.json({ message: "The format-type fue eliminado" });
        });
    }
}
const formatTypeController = new FormatTypeController();
exports.default = formatTypeController;
