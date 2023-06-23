import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { validate } from 'class-validator';
import { Conta } from './conta.entity';
import { Agencia } from '../agencia/agencia.entity';
import { Cliente } from '../cliente/cliente.entity';

export class ContaController {
    public async list(req: Request, res: Response) {
  
      const contas = await AppDataSource.manager.find(Conta);
  
      return res.status(200).json({ dados: contas });
    }
  
    public async create(req: Request, res: Response) {
  
      //aqui que pegamos o dados para cadastrar uma nova despesa
  
      let { numero, data_abertura, saldo, tipo, sigla_tipo, valor_limite, saldo_limite, agencia_id, cliente_id } = req.body;
  
      const veri_agencia = await AppDataSource.manager.findOneBy(Agencia, {id: agencia_id})
      //Verifica se existe a agencia com o id inserido.
      if(veri_agencia == null){
        return res.status(404).json({erro:"Não existe agência com esse id: "+agencia_id})
      }
  
      const veri_cliente = await AppDataSource.manager.findOneBy(Cliente, {id: cliente_id})
      //Verifica se existe o cliente com o id inserido.
      if(veri_cliente == null){
        return res.status(404).json({erro:"Não existe cliente com esse id: "+cliente_id})
      }
  
      let conta = new Conta();
      conta.numero = numero;
      conta.data_abertura = data_abertura;
      conta.saldo = saldo;
      conta.tipo = tipo;
      conta.sigla_tipo = sigla_tipo;
      conta.valor_limite = valor_limite;
      conta.saldo_limite = saldo_limite;
      conta.agencia_id = agencia_id;
      conta.cliente_id = cliente_id;
      const erros = await validate(conta);
  
      if(erros.length > 0) {
        return res.status(400).json(erros);
      }
  
      const _conta = await AppDataSource.manager.save(conta);
  
      return res.status(201).json(_conta);
    }
  
    public async update(req: Request, res: Response) {
      // const cod = req.params.cod;
      const { cod } = req.params;
  
      const novaconta = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });
  
      if (novaconta == null) {
        return res.status(404).json({ erro: 'Cadastro não encontrado!' });
      }
  
      let { saldo, tipo, sigla_tipo, valor_limite, saldo_limite } = req.body;
  
      novaconta.saldo = saldo;
      novaconta.tipo = tipo;
      novaconta.sigla_tipo = sigla_tipo;
      novaconta.valor_limite = valor_limite;
      novaconta.saldo_limite = saldo_limite;
  
      await AppDataSource.manager.save(novaconta);
  
      return res.status(201).json({Conta_atualizada: novaconta});
  
    }
  
    public async show(req: Request, res: Response) {
      const { cod } = req.params;
  
      if(!Number.isInteger(parseInt(cod))) {
        return res.status(400).json();
      }
  
      const _conta = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });
  
      if (_conta == null) {
        return res.status(404).json({ erro: 'Cadastro não encontrada!' });
      }
  
      return res.json(_conta);
    }
  
    public async destroy(req: Request, res: Response) {
      const { cod } = req.params;
  
      const _conta = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });
  
      if (_conta == null) {
        return res.status(404).json({ erro: 'Cadastro não encontrado!' });
      }
  
      await AppDataSource.manager.delete(Conta, _conta);
  
      return res.status(204).json({conta_deletada: _conta});
    }
  
  }
  
