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
class EmpleadoControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleadoes = yield database_1.default.query("SELECT EM.`idEmpleado`," +
                    " EM.`idCargo`," +
                    " CEM.`descripcion` As `desCargo`," +
                    " EM.`nombre`," +
                    " EM.`apellido`," +
                    " EM.`direccion`," +
                    " EM.`telefono`," +
                    " EM.`email1`," +
                    " EM.`email2`," +
                    " EM.`fechaNacimiento`," +
                    " EM.`estado`," +
                    " EM.`fechaCreacion`," +
                    " EM.`usuarioCreacion`" +
                    " FROM `" +
                    keys_1.default.database.database +
                    "`.`empleado` AS EM" +
                    " INNER JOIN `" +
                    keys_1.default.database.database +
                    "`.`soporte` AS CEM ON EM.`idCargo` = CEM.valor AND CEM.idSoporte='CEM';");
                res.json(empleadoes);
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "No existen empleados",
                    detail: error.message,
                });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEmpleado } = req.params;
                const empleado = yield database_1.default.query("SELECT * FROM `" +
                    keys_1.default.database.database +
                    "`.`empleado` WHERE idEmpleado = ?;", [idEmpleado]);
                if (empleado.length > 0) {
                    res.json(empleado[0]);
                }
                else {
                    res.json({ id: 1, text: "El empleado no existe", detail: "" });
                }
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El empleado no existe",
                    detail: error.message,
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id_number = 1;
                const getMaxId = yield database_1.default.query("SELECT COUNT(*) idEmpleado FROM `" +
                    keys_1.default.database.database +
                    "`.`empleado`;");
                if (getMaxId.length > 0) {
                    id_number = getMaxId[0].id + 1;
                }
                const idEmpleado = "E" + id_number.toString().padStart(9, "0");
                req.body.idEmpleado = idEmpleado;
                yield database_1.default.query("INSERT INTO `" + keys_1.default.database.database + "`.`empleado` set ?", [req.body]);
                res.json({ id: 1, message: "El empleado fue registrado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El empleado no fue registrado",
                    detail: error.message,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEmpleado } = req.params;
                yield database_1.default.query("UPDATE `" +
                    keys_1.default.database.database +
                    "`.`empleado` SET ? WHERE idEmpleado = ?;", [req.body, idEmpleado]);
                res.json({ id: 1, message: "El empleado fue actualizado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El empleado no fue actualizado",
                    detail: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEmpleado } = req.params;
                yield database_1.default.query("DELETE FROM `" +
                    keys_1.default.database.database +
                    "`.`empleado` WHERE idEmpleado = ?;", [idEmpleado]);
                res.json({ id: 1, message: "El empleado fue eliminado", detail: "" });
            }
            catch (error) {
                res.json({
                    id: 0,
                    message: "El empleado no fue eliminado",
                    detail: error.message,
                });
            }
        });
    }
}
const empleadoControllers = new EmpleadoControllers();
exports.default = empleadoControllers;
