"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = __importDefault(require("../controllers/productsController"));
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productsController_1.default.list);
        this.router.get('/:id', productsController_1.default.getOne);
        this.router.post('/', productsController_1.default.create);
        this.router.put('/:id', productsController_1.default.update);
        this.router.delete('/:id', productsController_1.default.delete);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
