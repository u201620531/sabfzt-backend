import { Router } from 'express';
import usuarioControllers from '../controllers/usuarioControllers';

class UsuarioRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', usuarioControllers.list);
    this.router.get('/:codigoUsuario', usuarioControllers.getByCodigoUsuario);
    this.router.get('/:codigoUsuario/:contrasena', usuarioControllers.getBycodigoUsuarioAndContrasena);
    this.router.post('/', usuarioControllers.create);
    this.router.put('/', usuarioControllers.updateAuthentication);
    this.router.put('/:codigoUsuario', usuarioControllers.update);
    this.router.delete('/:codigoUsuario', usuarioControllers.delete);
  }
}

const usuarioRoutes = new UsuarioRoutes();

export default usuarioRoutes.router;
