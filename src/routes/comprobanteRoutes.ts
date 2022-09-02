import { Router } from 'express';
import comprobanteControllers from '../controllers/comprobanteControllers';

class ComprobanteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', comprobanteControllers.list);
    this.router.get('/:idComprobante', comprobanteControllers.getOne);
    this.router.post('/', comprobanteControllers.create);
    this.router.put('/:idComprobante', comprobanteControllers.update);
    this.router.delete('/:idComprobante', comprobanteControllers.delete);
  }
}

const comprobanteRoutes = new ComprobanteRoutes();

export default comprobanteRoutes.router;
