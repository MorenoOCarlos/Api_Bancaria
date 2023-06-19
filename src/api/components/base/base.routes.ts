import { Router } from 'express';
import { BaseController } from './base.controller';

export class BaseRouter {
    private router: Router = Router();

    private readonly controller: BaseController;

    constructor() {
        this.controller = new BaseController();
        this.init();
    }

    private init(): void {
        this.router.get('/', this.controller.index);
        this.router.get('/sobre', this.controller.sobre);
    }

    public routes(): Router {
        return this.router;
    }
}