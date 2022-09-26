import { Router } from "express";
import detallePlantillaComprobanteControllers from "../controllers/detallePlantillaComprobanteControllers";

class DetallePlantillaComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/:idPlantillaComprobante", detallePlantillaComprobanteControllers.list);
    this.router.get(
      "/:idPlantillaComprobante/:idComprobante",
      detallePlantillaComprobanteControllers.getOne
    );
    this.router.post("/", detallePlantillaComprobanteControllers.create);
    this.router.put(
      "/:idPlantillaComprobante",
      detallePlantillaComprobanteControllers.update
    );
    this.router.put(
      "/:idPlantillaComprobante/:idComprobante",
      detallePlantillaComprobanteControllers.updateOne
    );
    this.router.delete(
      "/:idPlantillaComprobante",
      detallePlantillaComprobanteControllers.delete
    );
    this.router.delete(
      "/:idPlantillaComprobante/:idComprobante",
      detallePlantillaComprobanteControllers.deleteOne
    );
  }
}

const detallePlantillaComprobanteRoutes =
  new DetallePlantillaComprobanteRoutes();

export default detallePlantillaComprobanteRoutes.router;
