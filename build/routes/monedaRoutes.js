"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const monedaControllers_1 = __importDefault(require("../controllers/monedaControllers"));
class MonedaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', monedaControllers_1.default.list);
        this.router.get('/:idMoneda', monedaControllers_1.default.getOne);
        this.router.post('/', monedaControllers_1.default.create);
        this.router.put('/:idMoneda', monedaControllers_1.default.update);
        this.router.delete('/:idMoneda', monedaControllers_1.default.delete);
    }
}
const monedaRoutes = new MonedaRoutes();
exports.default = monedaRoutes.router;
