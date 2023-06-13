import { Router } from 'express';
import { UserRoutes } from '/user/user.routes';
import { BaseRoutes } from './base/base.routes';
import { DespesaRoutes } from '/despesa/despesa.routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/users`, new UserRoutes().routes());
  router.use(`${prefix}/despesas`, new DespesaRoutes().routes());
}
