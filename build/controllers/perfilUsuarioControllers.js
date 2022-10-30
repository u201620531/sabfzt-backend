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
class PerfilUsuarioControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perfilesUsuario = yield database_1.default.query("SELECT `perfil-usuario`.`idPerfilUsuario`," +
                    " `perfil-usuario`.`nombre`," +
                    " `perfil-usuario`.`estado`," +
                    " CASE WHEN `estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
                    " `perfil-usuario`.`fechaCreacion`," +
                    " `perfil-usuario`.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`perfil-usuario`;");
                res.json(perfilesUsuario);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen perfiles de usuario",
                    detail: error.message,
                });
            }
        });
    }
    getByidPerfilUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPerfilUsuario } = req.params;
                const perfilUsuario = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`perfil-usuario` WHERE idPerfilUsuario = ?;", [idPerfilUsuario]);
                if (perfilUsuario.length > 0) {
                    res.json(perfilUsuario);
                }
                else {
                    res.json({ id: 1, text: "El perfil de usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El perfil de usuario no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`perfil-usuario` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El perfil de usuario fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El perfil de usuario no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPerfilUsuario } = req.body;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`perfil-usuario` SET ? WHERE idPerfilUsuario = ?;", [idPerfilUsuario]);
                res.json({
                    id: 1,
                    message: "El perfil de usuario fue actualizado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El perfil de usuario no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPerfilUsuario } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`perfil-usuario` WHERE idPerfilUsuario = ?;", [idPerfilUsuario]);
                res.json({
                    id: 1,
                    message: "El perfil de usuario fue eliminado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El perfil de usuario no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const perfilUsuarioControllers = new PerfilUsuarioControllers();
exports.default = perfilUsuarioControllers;
