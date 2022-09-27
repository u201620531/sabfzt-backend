"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoDocumentoControllers_1 = __importDefault(require("../controllers/tipoDocumentoControllers"));
class TipoDocumentoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipoDocumentoControllers_1.default.list);
        this.router.get('/:idTipoDocumento', tipoDocumentoControllers_1.default.getOne);
        this.router.get('/:desTipoDocumento/:estado', tipoDocumentoControllers_1.default.getOneByDescripcion);
        this.router.post('/', tipoDocumentoControllers_1.default.create);
        this.router.put('/:idTipoDocumento', tipoDocumentoControllers_1.default.update);
        this.router.delete('/:idTipoDocumento', tipoDocumentoControllers_1.default.delete);
    }
}
const tipoDocumentoRoutes = new TipoDocumentoRoutes();
exports.default = tipoDocumentoRoutes.router;
