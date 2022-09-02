"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formaPagosController_1 = __importDefault(require("../controllers/formaPagosController"));
class FormaPagoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', formaPagosController_1.default.list);
        this.router.get('/:idFormaPago', formaPagosController_1.default.getOne);
        this.router.post('/', formaPagosController_1.default.create);
        this.router.put('/:idFormaPago', formaPagosController_1.default.update);
        this.router.delete('/:idFormaPago', formaPagosController_1.default.delete);
    }
}
const formaPagoRoutes = new FormaPagoRoutes();
exports.default = formaPagoRoutes.router;
