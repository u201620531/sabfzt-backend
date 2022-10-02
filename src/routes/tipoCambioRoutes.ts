import { Router } from "express";
import tipoCambioControllers from "../controllers/tipoCambioControllers";

class TipoCambioRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", tipoCambioControllers.list);
    this.router.get("/:fecha", tipoCambioControllers.getOne);
    this.router.post("/", tipoCambioControllers.create);
    this.router.put("/:fecha", tipoCambioControllers.update);
    this.router.delete("/:fecha", tipoCambioControllers.delete);
  }
}

const tipoCambioRoutes = new TipoCambioRoutes();

export default tipoCambioRoutes.router;
