"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customersController_1 = __importDefault(require("../controllers/customersController"));
class CustomerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', customersController_1.default.list);
        this.router.get('/:id', customersController_1.default.getOne);
        this.router.post('/', customersController_1.default.create);
        this.router.put('/:id', customersController_1.default.update);
        this.router.delete('/:id', customersController_1.default.delete);
    }
}
const customerRoutes = new CustomerRoutes();
exports.default = customerRoutes.router;
