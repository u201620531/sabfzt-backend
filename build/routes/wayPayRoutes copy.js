"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wayPayController_1 = __importDefault(require("../controllers/wayPayController"));
class WayPayRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', wayPayController_1.default.list);
        this.router.get('/:idWayPay', wayPayController_1.default.getOne);
        this.router.post('/', wayPayController_1.default.create);
        this.router.put('/:idWayPay', wayPayController_1.default.update);
        this.router.delete('/:idWayPay', wayPayController_1.default.delete);
    }
}
const wayPayRoutes = new WayPayRoutes();
exports.default = wayPayRoutes.router;
