import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { Deposito } from './deposito.entity';
import { Conta } from '../conta/conta.entity';
import { validate } from "class-validator";

export class DepositoController {
  public async list(req: Request, res: Response) {

    const depositos = await AppDataSource.manager.find(Deposito);

    return res.status(200).json({ dados: depositos });
  }

  public async create(req: Request, res: Response) {


    let { id, valor, data_hora, conta_id } = req.body;

    const veri_conta = await AppDataSource.manager.findOneBy (Conta, {id: conta_id});
    if(veri_conta == null){
      return res.status(404).json({erro:"Não existe conta com esse ID."})
    }
    if(veri_conta.saldo+valor > veri_conta.saldo_limite){
      return res.status(404).json({erro:"Não foi possível realizar o depósito."})
    }

    let deposito = new Deposito();
    deposito.id = id;
    deposito.valor = valor;
    deposito.data_hora = data_hora;
    deposito.conta_id = conta_id;

    const erros = await validate(deposito);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _deposito = await AppDataSource.manager.save(deposito);

    //Realizando a soma do valor da conta e do valor do depósito
    veri_conta.saldo += deposito.valor;

    await AppDataSource.manager.save(veri_conta);
    return res.status(201).json({Deposito:_deposito,Conta_saldo_novo: veri_conta});
  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }


    const showdeposito = await AppDataSource.manager.findOneBy(Deposito, { id: parseInt(cod) });

    if (showdeposito == null) {
      return res.status(404).json({ erro: 'Depósito não encontrado!' });
    }

    return res.json(showdeposito);
  }
}
