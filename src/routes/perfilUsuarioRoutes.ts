import { Router } from 'express';
import perfilUsuarioControllers from '../controllers/perfilUsuarioControllers';

class PerfilUsuarioRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', perfilUsuarioControllers.list);
    this.router.get('/:idPerfilUsuario', perfilUsuarioControllers.getByidPerfilUsuario);
    this.router.post('/', perfilUsuarioControllers.create);
    this.router.put('/:idPerfilUsuario', perfilUsuarioControllers.update);
    this.router.delete('/:idPerfilUsuario', perfilUsuarioControllers.delete);
  }
}

const perfilUsuarioRoutes = new PerfilUsuarioRoutes();

export default perfilUsuarioRoutes.router;
