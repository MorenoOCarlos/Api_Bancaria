import { Router } from 'express';
import { isValidateObjectRequest } from './helpers/validate';
import { loadContas, saveContas } from './helpers/load-data';

const router = Router();

router.get('/conta', function (req, res) {
    const conta = loadContas();
    res.send(conta);
});

router.post('/conta', function(req, res) {
    let ok = true;
    let mensagem = "Conta criada com sucesso.";

    const inputs = [
        {
            name: "nome",
            message: "A propriedade [nome] não deve estar em indefinida/vazio!"
        },
        {
            name: "email",
            message: "A propriedade [email] não deve estar em indefinida/vazio!"
        }
    ];

    const checkValidate = isValidateObjectRequest(req, inputs);

    if (Array.isArray(checkValidate)) {
        ok = false;

        mensagem = checkValidate.join(', ');
    }

    if (ok) {
        saveContas(req.body);
    }


    res.send({
        success: ok,
        message: mensagem
    })
});

export default router;