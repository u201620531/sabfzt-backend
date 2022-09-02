"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supportTablesController_1 = __importDefault(require("../controllers/supportTablesController"));
class SupportTablesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', supportTablesController_1.default.list);
        this.router.get('/:id', supportTablesController_1.default.getById);
        this.router.post('/', supportTablesController_1.default.create);
        this.router.put('/:id', supportTablesController_1.default.update);
        this.router.delete('/:id', supportTablesController_1.default.delete);
    }
}
const supportTablesRoutes = new SupportTablesRoutes();
exports.default = supportTablesRoutes.router;
