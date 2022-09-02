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
class ProveedorControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proveedores = yield database_1.default.query("SELECT PV.`idProveedor`," +
                " PV.`idTipoProveedor`," +
                " TPV.`descripcion` As `desTipoProveedor`," +
                " PV.`idTipoDocumento`," +
                " TDP.`descripcion` As `desTipoDocumento`," +
                " PV.`nroDocumento`," +
                " PV.`razonSocial`," +
                " PV.`nombreComercial`," +
                " PV.`direccion`," +
                " PV.`direccionFiscal`," +
                " PV.`email1`," +
                " PV.`email2`," +
                " PV.`estado`," +
                " PV.`fechaCreacion`," +
                " PV.`usuarioCreacion`" +
                " FROM `sabfztdb`.`proveedor` AS PV" +
                " INNER JOIN `sabfztdb`.`soporte` AS TPV ON PV.`idTipoProveedor` = TPV.valor AND TPV.idSoporte='TPV'" +
                " INNER JOIN `sabfztdb`.`soporte` AS TDP ON PV.`idTipoDocumento` = TDP.valor AND TDP.idSoporte='TDP';");
            res.json(proveedores);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                const proveedor = yield database_1.default.query("SELECT * FROM sabfztdb.`proveedor` WHERE idProveedor = ?;", [idProveedor]);
                if (proveedor.length > 0) {
                    res.json(proveedor[0]);
                }
                else {
                    res
                        .status(404)
                        .json({ id: 1, text: "proveedor no existe", detail: "" });
                }
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The proveedor no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idProveedor FROM `sabfztdb`.`proveedor` WHERE `proveedor`.`idTipoProveedor` = ?;", [req.body.proveedorType]);
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].id + 1;
                }
                const idProveedor = req.body.proveedorType + id_number.toString().padStart(9, "0");
                req.body.idProveedor = idProveedor;
                yield database_1.default.query("INSERT INTO `sabfztdb`.`proveedor` set ?", [req.body]);
                res.json({ id: 1, message: "The proveedor fue registrado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The proveedor no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                yield database_1.default.query("UPDATE `sabfztdb`.`proveedor` SET ? WHERE idProveedor = ?;", [req.body, idProveedor]);
                res.json({ id: 1, message: "The proveedor fue actualizado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The proveedor no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProveedor } = req.params;
                yield database_1.default.query("DELETE FROM `sabfztdb`.`proveedor` WHERE idProveedor = ?;", [idProveedor]);
                res.json({ id: 1, message: "The proveedor fue eliminado", detail: "" });
            }
            catch (error) {
                res.status(404).json({
                    id: 0,
                    message: "The proveedor no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const proveedorControllers = new ProveedorControllers();
exports.default = proveedorControllers;
