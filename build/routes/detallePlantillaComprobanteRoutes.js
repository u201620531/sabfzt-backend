"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallePlantillaComprobanteControllers_1 = __importDefault(require("../controllers/detallePlantillaComprobanteControllers"));
class DetallePlantillaComprobanteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:idPlantillaComprobante", detallePlantillaComprobanteControllers_1.default.list);
        this.router.get("/:idPlantillaComprobante/:idComprobante", detallePlantillaComprobanteControllers_1.default.getOne);
        this.router.post("/", detallePlantillaComprobanteControllers_1.default.create);
        this.router.put("/:idPlantillaComprobante", detallePlantillaComprobanteControllers_1.default.update);
        this.router.put("/:idPlantillaComprobante/:idComprobante", detallePlantillaComprobanteControllers_1.default.updateOne);
        this.router.delete("/:idPlantillaComprobante", detallePlantillaComprobanteControllers_1.default.delete);
        this.router.delete("/:idPlantillaComprobante/:idComprobante", detallePlantillaComprobanteControllers_1.default.deleteOne);
    }
}
const detallePlantillaComprobanteRoutes = new DetallePlantillaComprobanteRoutes();
exports.default = detallePlantillaComprobanteRoutes.router;
