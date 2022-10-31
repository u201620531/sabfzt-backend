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
const functions_1 = require("../auth/functions");
const database_1 = __importDefault(require("../database"));
const keys_1 = __importDefault(require("../keys"));
class UsuarioControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.query("SELECT U.`idEmpleado`," +
                    " CONCAT(E.apellido, ', ', E.nombre) AS nomEmpleado," +
                    " U.`codigoUsuario`," +
                    " U.`contrasena`," +
                    " U.`idPerfilUsuario`," +
                    " PU.nombre AS nomPerfilUsuario," +
                    " U.`estado`," +
                    " CASE WHEN U.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
                    " U.`fechaCreacion`," +
                    " U.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`usuario` AS U" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`empleado` AS E ON U.idEmpleado = E.idEmpleado" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`perfil-usuario` AS PU ON U.idPerfilUsuario = PU.idPerfilUsuario;");
                res.json(usuarios);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen usuarios",
                    detail: error.message,
                });
            }
        });
    }
    getBycodigoUsuarioAndContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario, contrasena } = req.params;
                const usuario = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`usuario` WHERE codigoUsuario = ?;", [codigoUsuario]);
                let contrasenaHash = "";
                if (usuario.length > 0) {
                    yield (0, functions_1.comparePassword)(contrasena, usuario[0].contrasena).then((value) => (contrasenaHash = value));
                    if (contrasenaHash) {
                        res.json(usuario[0]);
                    }
                    else {
                        res.json({ id: 1, message: "Contrasena incorrecta", detail: "" });
                    }
                }
                else {
                    res.json({ id: 1, message: "El usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El usuario no existe",
                    detail: error.message,
                });
            }
        });
    }
    getByCodigoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario } = req.params;
                const usuario = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`usuario` WHERE codigoUsuario = ?;", [codigoUsuario]);
                if (usuario.length > 0) {
                    res.json(usuario[0]);
                }
                else {
                    res.json({ id: 1, message: "El usuario no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
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
                res.json({
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
                let { idEmpleado, codigoUsuario } = req.body;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`usuario` SET ? WHERE `idEmpleado` = ? AND `codigoUsuario` = ?;", [req.body, idEmpleado, codigoUsuario]);
                res.json({ id: 1, message: "El usuario fue actualizado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El usuario no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    updateAuthentication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { codigoUsuario, contrasena } = req.body;
                yield (0, functions_1.hashPassword)(contrasena).then((value) => (contrasena = value));
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`usuario` SET `contrasena` = ? WHERE `codigoUsuario` = ?;", [contrasena, codigoUsuario]);
                res.json({ id: 1, message: "La contrasena fue actualizada", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La contrasena no fue actualizada",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigoUsuario } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`usuario` WHERE codigoUsuario = ?;", [codigoUsuario]);
                res.json({ id: 1, message: "El usuario fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
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
