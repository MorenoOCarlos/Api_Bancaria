import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/mysql-datasource.config';
import { validate } from 'class-validator';
import { Cliente } from './cliente.entity';


