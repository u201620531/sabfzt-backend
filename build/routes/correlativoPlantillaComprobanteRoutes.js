"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const correlativoPlantillaComprobanteControllers_1 = __importDefault(require("../controllers/correlativoPlantillaComprobanteControllers"));
class CorrelativoPlantillaComprobanteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", correlativoPlantillaComprobanteControllers_1.default.list);
        this.router.get("/:ano/:mes", correlativoPlantillaComprobanteControllers_1.default.getOne);
        this.router.post("/", correlativoPlantillaComprobanteControllers_1.default.create);
        this.router.put("/:ano/:mes", correlativoPlantillaComprobanteControllers_1.default.update);
        this.router.delete("/:ano/:mes", correlativoPlantillaComprobanteControllers_1.default.delete);
    }
}
const correlativoPlantillaComprobanteRoutes = new CorrelativoPlantillaComprobanteRoutes();
exports.default = correlativoPlantillaComprobanteRoutes.router;
