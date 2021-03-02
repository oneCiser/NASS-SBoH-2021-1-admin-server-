import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { ResourceUserController } from '../controller';
import { isRole,isDefinedParamMiddleware, validationMiddleware } from '../middlewares';
import { maxsizeDTO } from '../dtos';
import passport from 'passport';
import { ROLES } from '../utils';

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

  createRoutes(): void {
    this.router.get(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .getById(req, res, next),
    );
    this.router.get(
      '/Listar', 
      //passport.authenticate('jwt',{session:false}),
      //isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .list(req, res, next));
    
    this.router.put(
      '/updateMS',
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      validationMiddleware(maxsizeDTO, true),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .updateById(req, res, next),
    );
    this.router.delete(
      '/DeleteUser',
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      validationMiddleware(maxsizeDTO, true),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .removeById(req, res, next),
    );
  }
}
export default new UserRouter().router;
