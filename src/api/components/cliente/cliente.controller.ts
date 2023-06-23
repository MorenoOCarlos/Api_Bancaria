import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { Cliente } from './cliente.entity';
import { validate } from "class-validator";

export class ClienteController {
  public async list(req: Request, res: Response) {

    const clientes = await AppDataSource.manager.find(Cliente);

    return res.status(200).json({ dados: clientes });
  }

  public async create(req: Request, res: Response) {

    //aqui que pegamos o dados para cadastrar uma nova despesa

    let { id, nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereco, email, telefone } = req.body;

    let cliente = new Cliente();

    cliente.id = id;
    cliente.nome = nome;
    cliente.cpf_cnpj = cpf_cnpj;
    cliente.rg = rg;
    cliente.sexo = sexo;
    cliente.data_nascimento = data_nascimento;
    cliente.renda = renda;
    cliente.endereco = endereco;
    cliente.email = email;
    cliente.telefone = telefone;

    const erros = await validate(cliente);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _cliente = await AppDataSource.manager.save(cliente);

    return res.status(201).json(_cliente);
  }

  public async update(req: Request, res: Response) {
    const { cod } = req.params;

    const cliente = await AppDataSource.manager.findOneBy(Cliente, { id: parseInt(cod) });

    if (cliente == null) {
      return res.status(404).json({ erro: 'Cliente não encontrado!' });
    }

    let { nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereço, email, telefone } = req.body;

    cliente.nome = nome;
    cliente.cpf_cnpj = cpf_cnpj;
    cliente.rg = rg;
    cliente.sexo = sexo;
    cliente.data_nascimento = data_nascimento;
    cliente.renda = renda;
    cliente.endereco = endereço;
    cliente.email = email;
    cliente.telefone = telefone;

    await AppDataSource.manager.save(cliente);

    return res.status(201).json({Cliente_atualizada: cliente});

  }

  public async show(req: Request, res: Response) {
    const { cod } = req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const _cliente = await AppDataSource.manager.findOneBy(Cliente, { id: parseInt(cod) });

    if (_cliente == null) {
      return res.status(404).json({ erro: 'Cliente não encontrado!' });
    }

    return res.json(_cliente);
  }

  public async destroy (req: Request, res:Response){

    const { cod } = req.params;

    const cliente = await AppDataSource.manager.findOneBy(Cliente, { id: parseInt(cod) });

    if (cliente == null) {
      return res.status(404).json({ erro: 'Cliente não encontrado!' });
    }

    

    let ok=true;
    try{
      await AppDataSource.manager.delete(Cliente, cliente);
    }
    catch
    {
      ok = false;
    }
    finally
    {
      if(ok == false){
        return res.status(404).json({ erro: 'Não foi possível deletar esse cliente, tem uma conta relacionada a ele!' });
      }
      return res.status(204).json({mensagem:"Cliente excluido com sucesso"})
    }

  }

}
