"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plantillaComprobanteControllers_1 = __importDefault(require("../controllers/plantillaComprobanteControllers"));
class PlantillaComprobanteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", plantillaComprobanteControllers_1.default.list);
        this.router.get("/:idPlantillaComprobante", plantillaComprobanteControllers_1.default.getOne);
        this.router.post("/", plantillaComprobanteControllers_1.default.create);
        this.router.put("/:idPlantillaComprobante", plantillaComprobanteControllers_1.default.update);
        this.router.delete("/:idPlantillaComprobante", plantillaComprobanteControllers_1.default.delete);
    }
}
const plantillaComprobanteRoutes = new PlantillaComprobanteRoutes();
exports.default = plantillaComprobanteRoutes.router;
