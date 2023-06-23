import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { Agencia } from './agencia.entity';
import { Banco } from '../banco/banco.entity';

export class AgenciaController {
  public async list(req: Request, res: Response) {

    const agencias = await AppDataSource.manager.find(Agencia);

    return res.status(200).json({ dados: agencias });
  }

  public async create(req: Request, res: Response) {

    //aqui que pegamos o dados para cadastrar uma nova agencia

    let { id, numero, nome_fantasia,razao_social,cnpj,telefone, email, ban_id } = req.body;

    const veri_banco = await AppDataSource.manager.findOneBy(Banco, {id: ban_id})

    if(veri_banco == null){
      return res.status(404).json({erro:"Não existe banco com esse id."})
    }

    let agencia = new Agencia();
    agencia.id = id; 
    agencia.numero = numero;
    agencia.nome_fantasia = nome_fantasia;
    agencia.razao_social = razao_social;
    agencia.cnpj = cnpj;
    agencia.telefone = telefone;
    agencia.email = email;
    agencia.ban_id = ban_id;

    const erros = await validate(agencia);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _agencia = await AppDataSource.manager.save(agencia);

    return res.status(201).json(_agencia);
  }

  public async update (req: Request, res:Response){
    const {cod}  = req.params;

    const novaagencia = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });
    if(novaagencia == null){
      return res.status(404).json({erro:"Agência não encontrada"});
    }

    let { numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id } = req.body;

    const veri_banco = await AppDataSource.manager.findOneBy(Banco, {id: ban_id})

    if(veri_banco == null){
      return res.status(404).json({erro:"Não existe banco com esse id: "+ban_id})
    }

    novaagencia.numero = numero;
    novaagencia.nome_fantasia = nome_fantasia;
    novaagencia.razao_social = razao_social;
    novaagencia.cnpj = cnpj;
    novaagencia.telefone = telefone;
    novaagencia.email = email;
    novaagencia.ban_id = ban_id;

    await AppDataSource.manager.save(novaagencia);

    return res.status(201).json({Agencia_atualizada: novaagencia});

  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const _agencia = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });

    if (_agencia == null) {
      return res.status(404).json({ erro: 'Agência não encontrada!' });
    }

    return res.json(_agencia);
  }

  public async destroy (req: Request, res:Response){
    const { cod }= req.params;

    const agencia = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });

    if (agencia == null) {
      return res.status(404).json({ erro: 'Agência não encontrada!' });
    }

    let ok=true;
    try{
      await AppDataSource.manager.delete(Agencia,agencia);
    }
    catch
    {
      ok = false;
    }
    finally
    {
      if(ok == false){
        return res.status(404).json({ erro: 'Erro ao deletar agência, há dados relacionados a ela!' });
      }
      return res.status(200).json({mensagem:"Agência excluida com sucesso!"});
    }
  }

}
