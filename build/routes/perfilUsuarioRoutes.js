"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilUsuarioControllers_1 = __importDefault(require("../controllers/perfilUsuarioControllers"));
class PerfilUsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', perfilUsuarioControllers_1.default.list);
        this.router.get('/:idPerfilUsuario', perfilUsuarioControllers_1.default.getByidPerfilUsuario);
        this.router.post('/', perfilUsuarioControllers_1.default.create);
        this.router.put('/:idPerfilUsuario', perfilUsuarioControllers_1.default.update);
        this.router.delete('/:idPerfilUsuario', perfilUsuarioControllers_1.default.delete);
    }
}
const perfilUsuarioRoutes = new PerfilUsuarioRoutes();
exports.default = perfilUsuarioRoutes.router;
