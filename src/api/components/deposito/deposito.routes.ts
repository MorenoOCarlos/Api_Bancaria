import { Router } from 'express';
import { DepositoController } from './deposito.controller';

export class DepositoRoutes {
  private router: Router = Router();

  private controller: DepositoController;

  constructor() {
    this.controller = new DepositoController();
    this.init();
  }

  private init(): void {
    this.router.get('/:cod', this.controller.show);
    this.router.get('/list', this.controller.list);
    this.router.post('/depositar', this.controller.create);
  }

  public routes(): Router {
    return this.router;
  }
}