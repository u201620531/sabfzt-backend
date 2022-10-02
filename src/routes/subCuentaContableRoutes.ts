import { Router } from 'express';
import subCuentaContableControllers from '../controllers/subCuentaContableControllers';

class SubCuentaContableRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', subCuentaContableControllers.list);
    this.router.get('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers.getOne);
    this.router.post('/', subCuentaContableControllers.create);
    this.router.put('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers.update);
    this.router.delete('/:idCuentaContable/:idSubCuentaContable', subCuentaContableControllers.delete);
  }
}

const subCuentaContableRoutes = new SubCuentaContableRoutes();

export default subCuentaContableRoutes.router;
