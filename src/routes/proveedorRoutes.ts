import { Router } from 'express';
import proveedorControllers from '../controllers/proveedorControllers';

class ProveedorRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', proveedorControllers.list);
    this.router.get('/:idProveedor', proveedorControllers.getOne);
    this.router.post('/', proveedorControllers.create);
    this.router.put('/:idProveedor', proveedorControllers.update);
    this.router.delete('/:idProveedor', proveedorControllers.delete);
  }
}

const proveedorRoutes = new ProveedorRoutes();

export default proveedorRoutes.router;
