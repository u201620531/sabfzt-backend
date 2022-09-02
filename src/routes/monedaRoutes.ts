import { Router } from 'express';
import monedaControllers from '../controllers/monedaControllers';

class MonedaRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', monedaControllers.list);
    this.router.get('/:idMoneda', monedaControllers.getOne);
    this.router.post('/', monedaControllers.create);
    this.router.put('/:idMoneda', monedaControllers.update);
    this.router.delete('/:idMoneda', monedaControllers.delete);
  }
}

const monedaRoutes = new MonedaRoutes();

export default monedaRoutes.router;
