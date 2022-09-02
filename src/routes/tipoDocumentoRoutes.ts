import express, { Router } from 'express';
import tipoDocumentoControllers from '../controllers/tipoDocumentoControllers';

class TipoDocumentoRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', tipoDocumentoControllers.list);
    this.router.get('/:idTipoDocumento', tipoDocumentoControllers.getOne);
    this.router.post('/', tipoDocumentoControllers.create);
    this.router.put('/:idTipoDocumento', tipoDocumentoControllers.update);
    this.router.delete('/:idTipoDocumento', tipoDocumentoControllers.delete);
  }
}

const tipoDocumentoRoutes = new TipoDocumentoRoutes();

export default tipoDocumentoRoutes.router;
