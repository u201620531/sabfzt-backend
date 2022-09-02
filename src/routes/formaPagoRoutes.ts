import { Router } from 'express';
import formaPagosController from '../controllers/formaPagoControllers';

class FormaPagoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', formaPagosController.list);
    this.router.get('/:idFormaPago', formaPagosController.getOne);
    this.router.post('/', formaPagosController.create);
    this.router.put('/:idFormaPago', formaPagosController.update);
    this.router.delete('/:idFormaPago', formaPagosController.delete);
  }
}

const formaPagoRoutes = new FormaPagoRoutes();

export default formaPagoRoutes.router;
