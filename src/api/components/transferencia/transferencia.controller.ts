import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { Transferencia } from './transferencia.entity';
import { Conta } from '../conta/conta.entity';
import { validate } from "class-validator";

export class TransferenciaController {
  public async list(req: Request, res: Response) {

    const transferencias = await AppDataSource.manager.find(Transferencia, {
      relations: {
        conta_origem_id: true,
      }
    })

    res.status(200).json({ dados: transferencias });
  }

  public async create(req: Request, res: Response) {
    
    let { id, descricao, valor, data_hora, conta_origem_id, conta_destino_id } = req.body;

    //Verifica se é possivel fazer o saque da conta origem

    const veri_conta_ori = await AppDataSource.manager.findOneBy (Conta, {id: conta_origem_id});
    if(veri_conta_ori == null){
      return res.status(404).json({erro:"Não existe conta com esse id."})
    }

    if(veri_conta_ori.saldo-valor < 0){
      return res.status(404).json({erro:"Não foi possível realizar a transferência. Saldo insuficiente da conta origem."})
    }

    //Verifica se é possivel depositar na conta destino

    const veri_conta_des = await AppDataSource.manager.findOneBy (Conta, {id: conta_destino_id});
    if(veri_conta_des == null){
      return res.status(404).json({erro:"Não existe conta com esse id."})
    }

    if(veri_conta_des.saldo+valor > veri_conta_des.saldo_limite){
      return res.status(404).json({erro:"Não foi possível realizar o depósito. O valor do saldo na conta origem é menor que o valor da transferência."})
    }

    let transferencia = new Transferencia();
    transferencia.descricao = descricao;
    transferencia.data_hora = data_hora;
    transferencia.valor = valor;
    transferencia.conta_origem_id = conta_origem_id;
    transferencia.conta_destino_id = conta_destino_id;

    const erros = await validate(transferencia);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _transferencia = await AppDataSource.manager.save(transferencia);
    veri_conta_ori.saldo -= transferencia.valor;
    veri_conta_des.saldo += transferencia.valor;
    await AppDataSource.manager.save(veri_conta_ori);
    await AppDataSource.manager.save(veri_conta_des);

    /*Colocar um código para que dps da transferencia o saldo da conta origem diminua e o 
     saldo da conta destino aumente. Mudar o nome da função para transferir
     */

    return res.status(201).json({Transferencia:_transferencia,Conta_origem_saldo_novo:veri_conta_ori, Conta_destino_saldo_novo:veri_conta_des});
  }

  public async show(req: Request, res: Response){
    let {cod} = req.params

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const showtransferencia = await AppDataSource.manager.findOneBy(Transferencia, {id:parseInt(cod)})

    if (showtransferencia == null) {
      return res.status(404).json({ erro: 'Transferência não encontrada!' });
    }

    return res.status(201).json(showtransferencia);
  }
}