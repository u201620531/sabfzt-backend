"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moneysController_1 = __importDefault(require("../controllers/moneysController"));
class MoneyRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', moneysController_1.default.list);
        this.router.get('/:id', moneysController_1.default.getOne);
        this.router.post('/', moneysController_1.default.create);
        this.router.put('/:id', moneysController_1.default.update);
        this.router.delete('/:id', moneysController_1.default.delete);
    }
}
const moneyRoutes = new MoneyRoutes();
exports.default = moneyRoutes.router;
