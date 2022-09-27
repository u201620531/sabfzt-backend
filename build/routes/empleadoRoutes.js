"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleadoControllers_1 = __importDefault(require("../controllers/empleadoControllers"));
class EmpleadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', empleadoControllers_1.default.list);
        this.router.get('/:idEmpleado', empleadoControllers_1.default.getOne);
        this.router.post('/', empleadoControllers_1.default.create);
        this.router.put('/:idEmpleado', empleadoControllers_1.default.update);
        this.router.delete('/:idEmpleado', empleadoControllers_1.default.delete);
    }
}
const empleadoRoutes = new EmpleadoRoutes();
exports.default = empleadoRoutes.router;
