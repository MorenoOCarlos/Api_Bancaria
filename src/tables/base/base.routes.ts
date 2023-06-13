import { Router } from 'express';
const router = Router();

export class BaseRoutes {
	private router: Router = Router();
  
	private readonly controller: BaseController;
  
	constructor() {
	  this.controller = new BaseController();
	  this.init();
	}
  
	private init(): void {
	  this.router.get('/', this.controller.index);
	  this.router.get('/info', this.controller.info);
	}
  
	public routes(): Router {
	  return this.router;
	}
  }

router.get('/', function(req, res) {
	res.send({
        api_name: 'api-bancária',
        descricao: 'API para gestão de dados bancários',
        status: 'OK',
    });
});

router.get('/sobre', function(req, res) {
	res.send({
			nome: 'Carlos Eduardo e Moacir Roger',
			email: 'carlos.oliveirabispo@hotmail.com',
			github: 'github.com/MorenooCarlos',
	});
});

export default router;