import { Router } from "express";
import auditoriaControllers from "../controllers/auditoriaControllers";

class AuditoriaRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get("/", auditoriaControllers.list);
    this.router.get("/:fecha", auditoriaControllers.getOne);
    this.router.post("/", auditoriaControllers.create);
    this.router.put("/:fecha", auditoriaControllers.update);
    this.router.delete("/:fecha", auditoriaControllers.delete);
  }
}

const auditoriaRoutes = new AuditoriaRoutes();

export default auditoriaRoutes.router;
