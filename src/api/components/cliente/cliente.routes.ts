import { Router } from 'express';
import { ClienteController } from './cliente.controller';

export class ClienteRoutes {
  private router: Router = Router();

  private controller: ClienteController;

  constructor() {
    this.controller = new ClienteController();
    this.init();
  }

  private init(): void {
    this.router.get('/list', this.controller.list);
    this.router.post('/novo', this.controller.create);

    this.router.get('/:cod', this.controller.show);
    this.router.put('/update/:cod', this.controller.update);
    this.router.delete('/delete/:cod', this.controller.destroy);
  }

  public routes(): Router {
    return this.router;
  }
}