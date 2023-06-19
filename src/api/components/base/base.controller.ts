import { Request, Response } from 'express';

export class BaseController {

	public index(req: Request, res: Response) {
    res.status(200).json({
        api_name: 'api-bancária',
        descricao: 'API para gestão de dados bancários',
        status: 'OK',
        });
	};
	
	public sobre(req: Request, res: Response) {
    res.status(200).json({
            alunos: 'Carlos Eduardo e Moacir Roger',
            email_carlos: 'carlos.oliveirabispo@hotmail.com',
            email_moacir: 'moaciryuno705@gmail.com',
            github_carlos: 'github.com/MorenooCarlos',
            github_moacir: 'https://github.com/CoffeNoMilk'
        });
    };
};