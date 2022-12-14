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
class UsuarioControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`usuario`;");
            res.json(usuarios);
        });
    }
    getBycodigoUsuarioAndContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario, contrasena } = req.params;
                const usuario = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`usuario` WHERE codigoUsuario = ? AND contrasena = ?;", [codigoUsuario, contrasena]);
                if (usuario.length > 0) {
                    res.json(usuario[0]);
                }
                else {
                    res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no existe",
                    detail: error.message,
                });
            }
        });
    }
    getBycodigoUsuarioAndValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario, valor } = req.params;
                const usuario = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`usuario` WHERE codigoUsuario = ? AND valor = ?;", [codigoUsuario, valor]);
                if (usuario.length > 0) {
                    res.json(usuario);
                }
                else {
                    res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no existe",
                    detail: error.message,
                });
            }
        });
    }
    authentication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario, contrasena } = req.body;
                const usuario = yield database_1.default.query("SELECT * FROM `" + keys_1.default.database.database + "`.`usuario` WHERE codigoUsuario = ? AND contrasena = ?;", [codigoUsuario, contrasena]);
                if (usuario.length > 0) {
                    res.json(usuario);
                }
                else {
                    res.status(404).json({ id: 1, text: "usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`usuario` set ?", [req.body]);
                res.json({ id: 1, message: "El usuario fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario, description } = req.body;
                yield database_1.default.query("UPDATE `" + keys_1.default.database.database + "`.`usuario` SET ? WHERE codigoUsuario = ?;", [description, codigoUsuario]);
                res.json({ id: 1, message: "El usuario fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario } = req.params;
                yield database_1.default.query("DELETE FROM `" + keys_1.default.database.database + "`.`usuario` WHERE codigoUsuario = ?;", [codigoUsuario]);
                res.json({ id: 1, message: "El usuario fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El usuario no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const usuarioControllers = new UsuarioControllers();
exports.default = usuarioControllers;
