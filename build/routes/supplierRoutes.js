"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliersController_1 = __importDefault(require("../controllers/suppliersController"));
class SupplierRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', suppliersController_1.default.list);
        this.router.get('/:idSupplier', suppliersController_1.default.getOne);
        this.router.post('/', suppliersController_1.default.create);
        this.router.put('/:idSupplier', suppliersController_1.default.update);
        this.router.delete('/:idSupplier', suppliersController_1.default.delete);
    }
}
const supplierRoutes = new SupplierRoutes();
exports.default = supplierRoutes.router;
