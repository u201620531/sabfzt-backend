import { Router } from 'express';
import cuentaContableControllers from '../controllers/cuentaContableControllers';

class CuentaContableRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', cuentaContableControllers.list);
    this.router.get('/:idCuentaContable', cuentaContableControllers.getOne);
    this.router.post('/', cuentaContableControllers.create);
    this.router.put('/:idCuentaContable', cuentaContableControllers.update);
    this.router.delete('/:idCuentaContable', cuentaContableControllers.delete);
  }
}

const cuentaContableRoutes = new CuentaContableRoutes();

export default cuentaContableRoutes.router;
