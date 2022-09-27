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
class ModuloControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const modulos = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`modulo`;");
            res.json(modulos);
        });
    }
    getByIdModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idModulo } = req.params;
                const modulo = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`modulo` WHERE idModulo = ?;", [idModulo]);
                if (modulo.length > 0) {
                    res.json(modulo);
                }
                else {
                    res.status(404).json({ id: 1, text: "modulo no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El modulo no existe",
                    detail: error.message,
                });
            }
        });
    }
    getByIdPerfilUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPerfilUsuario } = req.params;
                const modulos = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`modulo` WHERE idPerfilUsuario = ?;", [idPerfilUsuario]);
                if (modulos.length > 0) {
                    res.json(modulos);
                }
                else {
                    res
                        .status(404)
                        .json({
                        id: 1,
                        text: "Perfil de usuario no tiene modulos asignados",
                        detail: "",
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El modulo no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`modulo` set ?", [req.body]);
                res.json({ id: 1, message: "El modulo fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El modulo no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idModulo, description } = req.body;
                yield database_1.default.query("UPDATE `" + keys_1.default.database.database + "`.`modulo` SET ? WHERE idModulo = ?;", [
                    description,
                    idModulo,
                ]);
                res.json({ id: 1, message: "El modulo fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El modulo no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idModulo } = req.params;
                yield database_1.default.query("DELETE FROM `" + keys_1.default.database.database + "`.`modulo` WHERE idModulo = ?;", [
                    idModulo,
                ]);
                res.json({ id: 1, message: "El modulo fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El modulo no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const moduloControllers = new ModuloControllers();
exports.default = moduloControllers;
