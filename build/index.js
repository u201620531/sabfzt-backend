"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const monedaRoutes_1 = __importDefault(require("./routes/monedaRoutes"));
const soporteRoutes_1 = __importDefault(require("./routes/soporteRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const proveedorRoutes_1 = __importDefault(require("./routes/proveedorRoutes"));
const tipoDocumentoRoutes_1 = __importDefault(require("./routes/tipoDocumentoRoutes"));
const formaPagoRoutes_1 = __importDefault(require("./routes/formaPagoRoutes"));
const comprobanteRoutes_1 = __importDefault(require("./routes/comprobanteRoutes"));
const moduloRoutes_1 = __importDefault(require("./routes/moduloRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const empleadoRoutes_1 = __importDefault(require("./routes/empleadoRoutes"));
const perfilUsuarioRoutes_1 = __importDefault(require("./routes/perfilUsuarioRoutes"));
const plantillaComprobanteRoutes_1 = __importDefault(require("./routes/plantillaComprobanteRoutes"));
const detallePlantillaComprobanteRoutes_1 = __importDefault(require("./routes/detallePlantillaComprobanteRoutes"));
const config_1 = require("./config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", config_1.PORT);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)({
            origin: "*",
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/tipodocumentos", tipoDocumentoRoutes_1.default);
        this.app.use("/api/formapagos", formaPagoRoutes_1.default);
        this.app.use("/api/comprobantes", comprobanteRoutes_1.default);
        this.app.use("/api/plantillas", plantillaComprobanteRoutes_1.default);
        this.app.use("/api/detalleplantillas", detallePlantillaComprobanteRoutes_1.default);
        this.app.use("/api/monedas", monedaRoutes_1.default);
        this.app.use("/api/modulos", moduloRoutes_1.default);
        this.app.use("/api/soportes", soporteRoutes_1.default);
        this.app.use("/api/productos", productoRoutes_1.default);
        this.app.use("/api/proveedores", proveedorRoutes_1.default);
        this.app.use("/api/usuarios", usuarioRoutes_1.default);
        this.app.use("/api/empleados", empleadoRoutes_1.default);
        this.app.use("/api/perfilusuarios", perfilUsuarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
