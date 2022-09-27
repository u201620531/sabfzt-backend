"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedorControllers_1 = __importDefault(require("../controllers/proveedorControllers"));
class ProveedorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proveedorControllers_1.default.list);
        this.router.get('/:idProveedor', proveedorControllers_1.default.getOne);
        this.router.post('/', proveedorControllers_1.default.create);
        this.router.put('/:idProveedor', proveedorControllers_1.default.update);
        this.router.delete('/:idProveedor', proveedorControllers_1.default.delete);
    }
}
const proveedorRoutes = new ProveedorRoutes();
exports.default = proveedorRoutes.router;
