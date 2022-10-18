import { Router } from "express";
import correlativoPlantillaComprobanteControllers from "../controllers/correlativoPlantillaComprobanteControllers";

class CorrelativoPlantillaComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", correlativoPlantillaComprobanteControllers.list);
    this.router.get(
      "/:ano/:mes",
      correlativoPlantillaComprobanteControllers.getOne
    );
    this.router.post("/", correlativoPlantillaComprobanteControllers.create);
    this.router.put(
      "/:ano/:mes",
      correlativoPlantillaComprobanteControllers.update
    );
    this.router.delete(
      "/:ano/:mes",
      correlativoPlantillaComprobanteControllers.delete
    );
  }
}

const correlativoPlantillaComprobanteRoutes =
  new CorrelativoPlantillaComprobanteRoutes();

export default correlativoPlantillaComprobanteRoutes.router;
