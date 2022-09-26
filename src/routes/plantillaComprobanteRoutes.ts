import { Router } from "express";
import plantillaComprobanteControllers from "../controllers/plantillaComprobanteControllers";

class PlantillaComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", plantillaComprobanteControllers.list);
    this.router.get(
      "/:idPlantillaComprobante",
      plantillaComprobanteControllers.getOne
    );
    this.router.post("/", plantillaComprobanteControllers.create);
    this.router.put(
      "/:idPlantillaComprobante",
      plantillaComprobanteControllers.update
    );
    this.router.delete(
      "/:idPlantillaComprobante",
      plantillaComprobanteControllers.delete
    );
  }
}

const plantillaComprobanteRoutes = new PlantillaComprobanteRoutes();

export default plantillaComprobanteRoutes.router;
