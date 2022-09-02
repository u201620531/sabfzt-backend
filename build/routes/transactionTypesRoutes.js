"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionTypesController_1 = __importDefault(require("../controllers/transactionTypesController"));
class TransactionTypeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", transactionTypesController_1.default.list);
        this.router.get("/:id", transactionTypesController_1.default.getOne);
        this.router.post("/", transactionTypesController_1.default.create);
        this.router.put("/:id", transactionTypesController_1.default.update);
        this.router.delete("/:id", transactionTypesController_1.default.delete);
    }
}
const transactionTypeRoutes = new TransactionTypeRoutes();
exports.default = transactionTypeRoutes.router;
