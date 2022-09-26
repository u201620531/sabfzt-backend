import { Router } from 'express';
import empleadoControllers from '../controllers/empleadoControllers';

class EmpleadoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', empleadoControllers.list);
    this.router.get('/:idEmpleado', empleadoControllers.getOne);
    this.router.post('/', empleadoControllers.create);
    this.router.put('/:idEmpleado', empleadoControllers.update);
    this.router.delete('/:idEmpleado', empleadoControllers.delete);
  }
}

const empleadoRoutes = new EmpleadoRoutes();

export default empleadoRoutes.router;
