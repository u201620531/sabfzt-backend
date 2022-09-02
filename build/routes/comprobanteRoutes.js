"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comprobanteControllers_1 = __importDefault(require("../controllers/comprobanteControllers"));
class ComprobanteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', comprobanteControllers_1.default.list);
        this.router.get('/:idComprobante', comprobanteControllers_1.default.getOne);
        this.router.post('/', comprobanteControllers_1.default.create);
        this.router.put('/:idComprobante', comprobanteControllers_1.default.update);
        this.router.delete('/:idComprobante', comprobanteControllers_1.default.delete);
    }
}
const comprobanteRoutes = new ComprobanteRoutes();
exports.default = comprobanteRoutes.router;
