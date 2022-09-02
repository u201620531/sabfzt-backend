"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formaPagoControllers_1 = __importDefault(require("../controllers/formaPagoControllers"));
class FormaPagoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', formaPagoControllers_1.default.list);
        this.router.get('/:idFormaPago', formaPagoControllers_1.default.getOne);
        this.router.post('/', formaPagoControllers_1.default.create);
        this.router.put('/:idFormaPago', formaPagoControllers_1.default.update);
        this.router.delete('/:idFormaPago', formaPagoControllers_1.default.delete);
    }
}
const formaPagoRoutes = new FormaPagoRoutes();
exports.default = formaPagoRoutes.router;
