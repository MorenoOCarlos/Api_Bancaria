import { Router } from "express";
import baseRouter from './base';
import contaRouter from './contas';

const router = Router();

router.use('/', baseRouter);
router.use('/contas', contaRouter);

export default router;