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
class ProveedorControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const proveedores = yield database_1.default.query("SELECT PV.`idProveedor`," +
                    " PV.`idTipoProveedor`," +
                    " TPV.`descripcion` As `desTipoProveedor`," +
                    " PV.`idTipoDocumento`," +
                    " TDP.`descripcion` As `desTipoDocumento`," +
                    " TDP.`abreviatura` As `abrTipoDocumento`," +
                    " PV.`nroDocumento`," +
                    " PV.`razonSocial`," +
                    " PV.`nombreComercial`," +
                    " PV.`direccion`," +
                    " PV.`direccionFiscal`," +
                    " PV.`email1`," +
                    " PV.`email2`," +
                    " PV.`estado`," +
                    " CASE WHEN PV.`estado`='A' THEN 'Activo' ELSE 'Inactivo' End AS `desEstado`," +
                    " PV.`fechaCreacion`," +
                    " PV.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`proveedor` AS PV" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`soporte` AS TPV ON PV.`idTipoProveedor` = TPV.valor AND TPV.idSoporte='TPV'" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`soporte` AS TDP ON PV.`idTipoDocumento` = TDP.valor AND TDP.idSoporte='TDP';");
                res.json(proveedores);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen proveedores",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                const proveedor = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`proveedor` WHERE idProveedor = ?;", [idProveedor]);
                if (proveedor.length > 0) {
                    res.json(proveedor[0]);
                }
                else {
                    res.json({ id: 1, text: "proveedor no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El proveedor no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idProveedor FROM `" +
                    keys_1.default.database.database +
                    "`.`proveedor` WHERE `proveedor`.`idTipoProveedor` = ?;", [req.body.idTipoProveedor]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].idProveedor + 1;
                }
                const idProveedor = req.body.idTipoProveedor + id_number.toString().padStart(9, "0");
                req.body.idProveedor = idProveedor;
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`proveedor` set ?", [req.body]);
                res.json({ id: 1, message: "El proveedor fue registrado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El proveedor no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`proveedor` SET ? WHERE idProveedor = ?;", [req.body, idProveedor]);
                res.json({ id: 1, message: "El proveedor fue actualizado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El proveedor no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`proveedor` WHERE idProveedor = ?;", [idProveedor]);
                res.json({ id: 1, message: "El proveedor fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El proveedor no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const proveedorControllers = new ProveedorControllers();
exports.default = proveedorControllers;
