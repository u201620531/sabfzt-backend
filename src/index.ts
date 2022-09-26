import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import monedaRoutes from "./routes/monedaRoutes";
import soporteRoutes from "./routes/soporteRoutes";
import productoRoutes from "./routes/productoRoutes";
import proveedorRoutes from "./routes/proveedorRoutes";
import tipoDocumentoRoutes from "./routes/tipoDocumentoRoutes";
import formaPagoRoutes from "./routes/formaPagoRoutes";
import comprobanteRoutes from "./routes/comprobanteRoutes";
import moduloRoutes from "./routes/moduloRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import empleadoRoutes from "./routes/empleadoRoutes";
import perfilUsuarioRoutes from "./routes/perfilUsuarioRoutes";
import plantillaComprobanteRoutes from "./routes/plantillaComprobanteRoutes";
import detallePlantillaComprobanteRoutes from "./routes/detallePlantillaComprobanteRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env["PORT"] || 3000);
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use("/api/tipodocumentos", tipoDocumentoRoutes);
    this.app.use("/api/formapagos", formaPagoRoutes);
    this.app.use("/api/comprobantes", comprobanteRoutes);
    this.app.use("/api/plantillas", plantillaComprobanteRoutes);
    this.app.use("/api/detalleplantillas", detallePlantillaComprobanteRoutes);
    this.app.use("/api/monedas", monedaRoutes);
    this.app.use("/api/modulos", moduloRoutes);
    this.app.use("/api/soportes", soporteRoutes);
    this.app.use("/api/productos", productoRoutes);
    this.app.use("/api/proveedores", proveedorRoutes);
    this.app.use("/api/usuarios", usuarioRoutes);
    this.app.use("/api/empleados", empleadoRoutes);
    this.app.use("/api/perfilusuarios", perfilUsuarioRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
