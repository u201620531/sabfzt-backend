import { Router } from 'express';
import moduloControllers from '../controllers/moduloControllers';

class ModuloRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', moduloControllers.list);
    this.router.get('/:idModulo', moduloControllers.getByIdModulo);
    this.router.get('/:idPerfilUsuario/:estado', moduloControllers.getByIdPerfilUsuario);
    this.router.post('/', moduloControllers.create);
    this.router.put('/:idModulo', moduloControllers.update);
    this.router.delete('/:idModulo', moduloControllers.delete);
  }
}

const moduloRoutes = new ModuloRoutes();

export default moduloRoutes.router;
