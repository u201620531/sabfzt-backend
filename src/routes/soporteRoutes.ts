import { Router } from 'express';
import soporteControllers from '../controllers/soporteControllers';

class SoporteRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', soporteControllers.list);
    this.router.get('/:idSoporte', soporteControllers.getByidSoporte);
    this.router.get('/:idSoporte/:valor', soporteControllers.getByidSoporteAndValue);
    this.router.post('/', soporteControllers.create);
    this.router.put('/:idSoporte', soporteControllers.update);
    this.router.delete('/:idSoporte', soporteControllers.delete);
  }
}

const soporteRoutes = new SoporteRoutes();

export default soporteRoutes.router;
