"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moduloControllers_1 = __importDefault(require("../controllers/moduloControllers"));
class ModuloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', moduloControllers_1.default.list);
        this.router.get('/:idModulo', moduloControllers_1.default.getByIdModulo);
        this.router.get('/:idPerfilUsuario/:estado', moduloControllers_1.default.getByIdPerfilUsuario);
        this.router.post('/', moduloControllers_1.default.create);
        this.router.put('/:idModulo', moduloControllers_1.default.update);
        this.router.delete('/:idModulo', moduloControllers_1.default.delete);
    }
}
const moduloRoutes = new ModuloRoutes();
exports.default = moduloRoutes.router;
