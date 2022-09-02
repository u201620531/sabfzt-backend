"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const soporteControllers_1 = __importDefault(require("../controllers/soporteControllers"));
class SoporteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', soporteControllers_1.default.list);
        this.router.get('/:idSoporte', soporteControllers_1.default.getByidSoporte);
        this.router.get('/:idSoporte/:valor', soporteControllers_1.default.getByidSoporteAndValue);
        this.router.post('/', soporteControllers_1.default.create);
        this.router.put('/:idSoporte', soporteControllers_1.default.update);
        this.router.delete('/:idSoporte', soporteControllers_1.default.delete);
    }
}
const soporteRoutes = new SoporteRoutes();
exports.default = soporteRoutes.router;
