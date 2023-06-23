import { Router } from 'express';
import { ContaRoutes } from './conta/conta.routes';
import { BaseRouter } from './base/base.routes';
import { ClienteRoutes } from './cliente/cliente.routes';
import { SaqueRoutes } from './saque/saque.routes';
import { BancoRoutes } from './banco/banco.routes';
import { TransferenciaRoutes } from './transferencia/transferencia.routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}`, new BaseRouter().routes());
  router.use(`${prefix}/conta`, new ContaRoutes().routes());
  router.use(`${prefix}/cliente`, new ClienteRoutes().routes());
  router.use(`${prefix}/saque`, new SaqueRoutes().routes());
  router.use(`${prefix}/banco`, new BancoRoutes().routes());
  router.use(`${prefix}/transferencia`, new TransferenciaRoutes().routes());
  router.use(`${prefix}/cliente`, new ClienteRoutes().routes());
  router.use(`${prefix}/cliente`, new ClienteRoutes().routes());
}
