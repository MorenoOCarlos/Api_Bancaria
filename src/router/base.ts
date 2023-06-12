import { Router } from 'express';
const router = Router();

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