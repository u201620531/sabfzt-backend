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
class ComprobanteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comprobantes = yield database_1.default.query("SELECT C.`idComprobante`," +
                    " CONCAT(C.`serie`, '-', C.`correlativo`) AS `nroDocumento`," +
                    " C.`idProveedor`," +
                    " P.`nroDocumento` AS `nroDocumentoProveedor`," +
                    " P.`razonSocial`," +
                    " C.`idTipoDocumento`," +
                    " TD.`descripcion` AS `desTipoDocumento`," +
                    " C.`idFormaPago`," +
                    " FP.`descripcion` AS `desFormaPago`," +
                    " C.`fechaEmision`," +
                    " C.`fechaVencimiento`," +
                    " C.`totalGravadas`," +
                    " C.`totalInafectas`," +
                    " C.`totalExoneradas`," +
                    " C.`totalExportacion`," +
                    " C.`valorCompra`," +
                    " C.`igv`," +
                    " C.`isc`," +
                    " C.`otrosTributos`," +
                    " C.`otrosCargos`," +
                    " C.`descuentosGlobales`," +
                    " ROUND(C.`importeTotal`,2) AS `importeTotal`," +
                    " C.`idMoneda`," +
                    " M.`descripcion` AS `desMoneda`," +
                    " C.`serieGuia`," +
                    " C.`correlativoGuia`," +
                    " C.`estado`," +
                    " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE (CASE WHEN C.`estado`='D' THEN 'Declarado' ELSE 'Inactivo' End) End AS `desEstado`," +
                    " C.`fechaCreacion`," +
                    " C.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante` AS C" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`;");
                res.json(comprobantes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen comprobantes",
                    detail: error.message,
                });
            }
        });
    }
    report(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nroDocumento, idTipoDocumento, idFormaPago, idMoneda, fechaEmisionIni, fechaEmisionFin, estado, } = req.params;
                let reporteComprobantes = "SELECT C.`idComprobante` AS `Id Comprobante`," +
                    " CONCAT(C.`serie`, '-', C.`correlativo`) AS `Nro Documento`," +
                    " P.`nroDocumento` AS `RUC/DNI`," +
                    " P.`razonSocial` AS `Razon Social`," +
                    " C.`fechaEmision` AS `F. Emisión`," +
                    " FP.`descripcion` AS `Forma Pago`," +
                    " TD.`descripcion` AS `Tipo Documento`," +
                    " C.`importeTotal` AS `Importe Total`," +
                    " M.`descripcion` AS `Moneda`," +
                    " CASE WHEN C.`estado`='A' THEN 'Activo' ELSE (CASE WHEN C.`estado`='D' THEN 'Declarado' ELSE 'Inactivo' End) End AS `Estado`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante` AS C" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`proveedor` AS P ON C.`idProveedor` = P.`idProveedor`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`forma-pago` AS FP ON C.`idFormaPago` = FP.`idFormaPago`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`tipo-documento` AS TD ON C.`idTipoDocumento` = TD.`idTipoDocumento`" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`moneda` AS M ON C.`idMoneda` = M.`idMoneda`" +
                    " WHERE C.`estado` <> ''";
                nroDocumento !== "X"
                    ? (reporteComprobantes +=
                        " AND P.nroDocumento = '" + nroDocumento + "'")
                    : "";
                idFormaPago !== "X"
                    ? (reporteComprobantes += " AND C.idFormaPago = '" + idFormaPago + "'")
                    : "";
                idTipoDocumento !== "X"
                    ? (reporteComprobantes +=
                        " AND C.idTipoDocumento = '" + idTipoDocumento + "'")
                    : "";
                idMoneda !== "X"
                    ? (reporteComprobantes += " AND C.idMoneda = '" + idMoneda + "'")
                    : "";
                estado !== "X"
                    ? (reporteComprobantes += " AND C.estado = '" + estado + "'")
                    : "";
                fechaEmisionIni !== "X" && fechaEmisionFin === "X"
                    ? (reporteComprobantes +=
                        "  AND C.fechaEmision >= '" + fechaEmisionIni + "'")
                    : "";
                fechaEmisionIni !== "X" && fechaEmisionFin !== "X"
                    ? (reporteComprobantes +=
                        "  AND C.fechaEmision BETWEEN '" +
                            fechaEmisionIni +
                            "' AND '" +
                            fechaEmisionFin +
                            "'")
                    : "";
                const DetallePlantillaComprobantes = yield database_1.default.query(reporteComprobantes);
                res.json(DetallePlantillaComprobantes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen comprobantes",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                const comprobante = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante` WHERE idComprobante = ?;", [idComprobante]);
                if (comprobante.length > 0) {
                    res.json(comprobante[0]);
                }
                else {
                    res.json({ id: 1, text: "Comprobante no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El comprobante no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idComprobante FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante`;", [req.body.ComprobanteType]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idComprobante + 1;
                }
                const idComprobante = id_number.toString().padStart(10, "0");
                req.body.idComprobante = idComprobante;
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`comprobante` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El comprobante fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El Comprobante no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    createMsivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numComprobantes } = req.params;
                const idComprobante = numComprobantes.toString().padStart(10, "0");
                req.body.idComprobante = idComprobante;
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`comprobante` set ?", [req.body]);
                res.json({
                    id: 1,
                    message: "El comprobante fue registrado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El Comprobante no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`comprobante` SET ? WHERE idComprobante = ?;", [req.body, idComprobante]);
                res.json({
                    id: 1,
                    message: "El comprobante fue actualizado",
                    detail: "",
                });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El comprobante no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComprobante } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`comprobante` WHERE idComprobante = ?;", [idComprobante]);
                res.json({ id: 1, message: "El comprobante fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El comprobante no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const comprobanteControllers = new ComprobanteControllers();
exports.default = comprobanteControllers;
