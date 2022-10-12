"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditoriaControllers_1 = __importDefault(require("../controllers/auditoriaControllers"));
class AuditoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", auditoriaControllers_1.default.list);
        this.router.get("/:fecha", auditoriaControllers_1.default.getOne);
        this.router.post("/", auditoriaControllers_1.default.create);
        this.router.put("/:fecha", auditoriaControllers_1.default.update);
        this.router.delete("/:fecha", auditoriaControllers_1.default.delete);
    }
}
const auditoriaRoutes = new AuditoriaRoutes();
exports.default = auditoriaRoutes.router;
