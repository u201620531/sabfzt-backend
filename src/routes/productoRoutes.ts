import { Router } from 'express';
import productosController from '../controllers/productoControllers';

class ProductoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', productosController.list);
    this.router.get('/:idProducto', productosController.getOne);
    this.router.post('/', productosController.create);
    this.router.put('/:idProducto', productosController.update);
    this.router.delete('/:idProducto', productosController.delete);
  }
}

const productoRoutes = new ProductoRoutes();

export default productoRoutes.router;
