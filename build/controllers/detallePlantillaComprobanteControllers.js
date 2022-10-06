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
class DetallePlantillaComprobanteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPlantillaComprobante } = req.params;
            const queryDetallePlantilla = idPlantillaComprobante === "0"
                ? "SELECT '' AS `select`, '' AS `idPlantillaComprobante`," +
                    " C.`idComprobante`," +
                    " C.`serie`," +
                    " C.`correlativo`," +
                    " C.`idProveedor`," +
                    " P.`nroDocumento`," +
                    " P.`razonSocial`," +
                    " C.`idComprobante`," +
                    " C.`fechaEmision`," +
                    " C.`idFormaPago`," +
                    " FP.`descripcion` AS `desFormaPago`," +
                    " C.`importeTotal`," +
                    " C.`tipoCambio,`," +
                    " '' AS `detalle`," +
                    " C.`estado`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante` AS C" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
                    " WHERE C.`estado` = 'A'" +
                    " AND C.`idComprobante` NOT IN (SELECT `idComprobante` FROM " +
                    keys_1.default.database.database +
                    ".`detalle-plantilla-comprobante`);"
                : "SELECT '1' AS `select`, DPC.`idPlantillaComprobante`," +
                    " DPC.`idComprobante`," +
                    " C.`serie`," +
                    " C.`correlativo`," +
                    " C.`idProveedor`," +
                    " P.`nroDocumento`," +
                    " P.`razonSocial`," +
                    " C.`idComprobante`," +
                    " C.`fechaEmision`," +
                    " C.`idFormaPago`," +
                    " FP.`descripcion` AS `desFormaPago`," +
                    " C.`importeTotal`," +
                    " C.`tipoCambio`," +
                    " DPC.`detalle`," +
                    " DPC.`estado`," +
                    " CASE WHEN DPC.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`detalle-plantilla-comprobante` AS DPC" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`comprobante` AS C ON DPC.`idComprobante` = C.`idComprobante`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
                    " WHERE DPC.`idPlantillaComprobante` = '" +
                    idPlantillaComprobante +
                    "';";
            const DetallePlantillaComprobantes = yield database_1.default.query(queryDetallePlantilla);
            res.json(DetallePlantillaComprobantes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante, idComprobante } = req.params;
                const DetallePlantillaComprobante = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;", [idPlantillaComprobante, idComprobante]);
                if (DetallePlantillaComprobante.length > 0) {
                    res.json(DetallePlantillaComprobante[0]);
                }
                else {
                    res.status(404).json({
                        id: 1,
                        text: "El detalle de la plantilla no existe",
                        detail: "",
                    });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query("INSERT INTO `" +
                    keys_1.default.database.database +
                    "`.`detalle-plantilla-comprobante` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El detalle de la plantilla fue registrada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no fue registrada",
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
                    "`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ?;", [req.body, idPlantillaComprobante]);
                res.json({
                    id: 1,
                    message: "El detalle de la plantilla fue actualizada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no fue actualizada",
                    detail: error.message,
                });
            }
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante, idComprobante } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`detalle-plantilla-comprobante` SET ? WHERE idPlantillaComprobante = ? AND idComprobante = ?;", [req.body, idPlantillaComprobante, idComprobante]);
                res.json({
                    id: 1,
                    message: "El detalle de la plantilla fue actualizada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no fue actualizada",
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
                    "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ?;", [idPlantillaComprobante]);
                res.json({
                    id: 1,
                    message: "El detalle de la plantilla fue eliminada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no fue eliminada",
                    detail: error.message,
                });
            }
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPlantillaComprobante, idComprobante } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`detalle-plantilla-comprobante` WHERE idPlantillaComprobante = ? AND idComprobante = ?;", [idPlantillaComprobante, idComprobante]);
                res.json({
                    id: 1,
                    message: "El detalle de la plantilla fue eliminada",
                    detail: "",
                });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "El detalle de la plantilla no fue eliminada",
                    detail: error.message,
                });
            }
        });
    }
}
const detallePlantillaComprobanteControllers = new DetallePlantillaComprobanteControllers();
exports.default = detallePlantillaComprobanteControllers;
