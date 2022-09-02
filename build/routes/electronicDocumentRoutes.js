"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const electronicDocumentsController_1 = __importDefault(require("../controllers/electronicDocumentsController"));
class ElectronicDocumentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', electronicDocumentsController_1.default.list);
        this.router.get('/:idElectronicDocument', electronicDocumentsController_1.default.getOne);
        this.router.post('/', electronicDocumentsController_1.default.create);
        this.router.put('/:idElectronicDocument', electronicDocumentsController_1.default.update);
        this.router.delete('/:idElectronicDocument', electronicDocumentsController_1.default.delete);
    }
}
const electronicDocumentRoutes = new ElectronicDocumentRoutes();
exports.default = electronicDocumentRoutes.router;
