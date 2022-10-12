"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const keys_1 = __importDefault(require("../keys"));
class PlantillaComprobanteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PlantillaComprobantes = yield database_1.default.query("SELECT PC.`idPlantillaComprobante`," +
                    " PC.`nroTicketEnvio`," +
                    " PC.`fechaDeclaracion`," +
                    " PC.`observacion`," +
                    " PC.`estado`," +
                    " CASE WHEN PC.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
                    " PC.`fechaCreacion`," +
                    " PC.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante` AS PC;");
                res.json(PlantillaComprobantes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen plantillas",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante } = req.params;
                const PlantillaComprobante = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante` WHERE idPlantillaComprobante = ?;", [idPlantillaComprobante]);
                if (PlantillaComprobante.length > 0) {
                    res.json(PlantillaComprobante[0]);
                }
                else {
                    res.json({ id: 1, text: "La plantilla no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La plantilla no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idPlantillaComprobante = "";
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idPlantillaComprobante FROM `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante`;", [req.body.PlantillaComprobanteType]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idPlantillaComprobante + 1;
                }
                idPlantillaComprobante = id_number.toString().padStart(10, "0");
                req.body.idPlantillaComprobante = idPlantillaComprobante;
                yield database_1.default.query("INSERT INTO `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "La plantilla fue registrada",
                    detail: idPlantillaComprobante,
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La plantilla no fue registrada",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ?;", [req.body, idPlantillaComprobante]);
                res.json({ id: 1, message: "La plantilla fue actualizada", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La plantilla no fue actualizada",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`plantilla-comprobante` WHERE idPlantillaComprobante = ?;", [idPlantillaComprobante]);
                res.json({ id: 1, message: "La plantillafue eliminada", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "La plantilla no no fue eliminada",
                    detail: error.message,
                });
            }
        });
    }
}
const plantillaComprobanteControllers = new PlantillaComprobanteControllers();
exports.default = plantillaComprobanteControllers;
