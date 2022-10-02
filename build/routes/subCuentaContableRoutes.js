"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCuentaContableControllers_1 = __importDefault(require("../controllers/subCuentaContableControllers"));
class SubCuentaContableRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', subCuentaContableControllers_1.default.list);
        this.router.get('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers_1.default.getOne);
        this.router.post('/', subCuentaContableControllers_1.default.create);
        this.router.put('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers_1.default.update);
        this.router.delete('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers_1.default.delete);
    }
}
const subCuentaContableRoutes = new SubCuentaContableRoutes();
exports.default = subCuentaContableRoutes.router;
