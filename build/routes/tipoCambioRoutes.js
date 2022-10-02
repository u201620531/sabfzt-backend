"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoCambioControllers_1 = __importDefault(require("../controllers/tipoCambioControllers"));
class TipoCambioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", tipoCambioControllers_1.default.list);
        this.router.get("/:fecha", tipoCambioControllers_1.default.getOne);
        this.router.post("/", tipoCambioControllers_1.default.create);
        this.router.put("/:fecha", tipoCambioControllers_1.default.update);
        this.router.delete("/:fecha", tipoCambioControllers_1.default.delete);
    }
}
const tipoCambioRoutes = new TipoCambioRoutes();
exports.default = tipoCambioRoutes.router;
