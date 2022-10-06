"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioControllers_1 = __importDefault(require("../controllers/usuarioControllers"));
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioControllers_1.default.list);
        this.router.get('/:codigoUsuario/:contrasena', usuarioControllers_1.default.getBycodigoUsuarioAndContrasena);
        this.router.post('/', usuarioControllers_1.default.create);
        this.router.put('/', usuarioControllers_1.default.updateAuthentication);
        this.router.put('/:codigoUsuario', usuarioControllers_1.default.update);
        this.router.delete('/:codigoUsuario', usuarioControllers_1.default.delete);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
