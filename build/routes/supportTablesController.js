"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formatTypesController_1 = __importDefault(require("../controllers/formatTypesController"));
class FormatTypeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', formatTypesController_1.default.list);
        this.router.get('/:id', formatTypesController_1.default.getOne);
        this.router.post('/', formatTypesController_1.default.create);
        this.router.put('/', formatTypesController_1.default.update);
        this.router.delete('/:id', formatTypesController_1.default.delete);
    }
}
const formatTypeRoutes = new FormatTypeRoutes();
exports.default = formatTypeRoutes.router;
