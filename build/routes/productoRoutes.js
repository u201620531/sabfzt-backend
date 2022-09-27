"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoControllers_1 = __importDefault(require("../controllers/productoControllers"));
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productoControllers_1.default.list);
        this.router.get('/:idProducto', productoControllers_1.default.getOne);
        this.router.post('/', productoControllers_1.default.create);
        this.router.put('/:idProducto', productoControllers_1.default.update);
        this.router.delete('/:idProducto', productoControllers_1.default.delete);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
