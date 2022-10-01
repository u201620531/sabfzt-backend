import { Router } from "express";
import comprobanteControllers from "../controllers/comprobanteControllers";

class ComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", comprobanteControllers.list);
    this.router.get("/:idComprobante", comprobanteControllers.getOne);
    this.router.get(
      "/:nroDocumento/:idTipoDocumento/:idFormaPago/:idMoneda/:fechaEmisionIni/:fechaEmisionFin/:estado",
      comprobanteControllers.report
    );
    this.router.post("/", comprobanteControllers.create);
    this.router.post("/:numComprobantes", comprobanteControllers.createMsivo);
    this.router.put("/:idComprobante", comprobanteControllers.update);
    this.router.delete("/:idComprobante", comprobanteControllers.delete);
  }
}

const comprobanteRoutes = new ComprobanteRoutes();

export default comprobanteRoutes.router;
