import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { ResourceUserController } from '../controller';
import { isDefinedParamMiddleware, validationMiddleware, isRole } from '../middlewares';
import { ExampleDTO } from '../dtos';
import passport from 'passport';
import {ROLES} from '../utils'
/**
 *
 * Managament the routes of resource
 * @category Routes
 * @class ExampleRouter
 * @implements {IRoute}
 */
class UserRouter implements IRoute {
  public router = Router();

  public pathIdParam = '/:id';

  constructor() {
    this.createRoutes();
  }
  /**
     * @name admin/users
     * @category Routes
     * @function
     * @description admin user list of users
     * @memberof module:routers/admin~adminRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} passport - validation of req.body
     * @param {callback} isRole - controller of login
     */
  createRoutes(): void {
    this.router.get(
      "/users",
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController.list(req,res, next)
    );
    
    this.router.put(
      `/user${this.pathIdParam}`,
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController.updateById(req,res, next)
    );
  }
}
export default new UserRouter().router;
