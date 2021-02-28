import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { ResourceUserController } from '../controller';
import { isDefinedParamMiddleware, validationMiddleware } from '../middlewares';
import { ExampleDTO } from '../dtos';

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
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .list(req, res, next));
    
    this.router.put(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      validationMiddleware(ExampleDTO, true),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .updateById(req, res, next),
    );
    this.router.delete(
      this.pathIdParam,
      isDefinedParamMiddleware(),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .removeById(req, res, next),
    );
  }
}
export default new UserRouter().router;
