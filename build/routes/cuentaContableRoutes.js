"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuentaContableControllers_1 = __importDefault(require("../controllers/cuentaContableControllers"));
class CuentaContableRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', cuentaContableControllers_1.default.list);
        this.router.get('/:idCuentaContable', cuentaContableControllers_1.default.getOne);
        this.router.post('/', cuentaContableControllers_1.default.create);
        this.router.put('/:idCuentaContable', cuentaContableControllers_1.default.update);
        this.router.delete('/:idCuentaContable', cuentaContableControllers_1.default.delete);
    }
}
const cuentaContableRoutes = new CuentaContableRoutes();
exports.default = cuentaContableRoutes.router;
