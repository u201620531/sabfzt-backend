"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentTypesController_1 = __importDefault(require("../controllers/documentTypesController"));
class DocumentTypeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', documentTypesController_1.default.list);
        this.router.get('/:idDocumentType', documentTypesController_1.default.getOne);
        this.router.post('/', documentTypesController_1.default.create);
        this.router.put('/:idDocumentType', documentTypesController_1.default.update);
        this.router.delete('/:idDocumentType', documentTypesController_1.default.delete);
    }
}
const documentTypeRoutes = new DocumentTypeRoutes();
exports.default = documentTypeRoutes.router;
