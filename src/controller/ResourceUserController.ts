/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IPayLoad, IUser } from '../interfaces';
import { ResourceUser } from '../models';
import { HttpException } from '../exceptions';
import { ResourceService } from '../services';

/**
 *
 * The controller of resources
 * @category Controllers
 * @class ResourceUserController
 */
class ResourceUserController {
  /**
   *
   * List all resources
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of resources
   * @memberof ResourceUserController
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const resources: Array<IUser> = await ResourceService.list();
      const users = resources.map( (i) => {
        const user = {
          _id: i._id, 
          name: i.name,
          username: i.username,
          email: i.email,
          type_user: i.type_user,
          maxsize: i.maxsize,
        };
        return user;
      });
      res.json({users}); 
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
      
    }
  }

  
  
  


  /**
   *
   * Get resource by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of resources
   * @memberof ResourceUserController
   */
  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resource: IUser | null = await ResourceService.getById(id);
      if (!resource) throw new HttpException(404, 'Resource not found');
      res.json(resource);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * Remove tasresource by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of resourceS
   * @memberof ResourceUserController
   */
  public static async removeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resource: IUser | null = await ResourceService
        .removeById(id);
      if (!resource) throw new HttpException(404, 'Resource not found');
      res.json(resource);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   *
   * Update resource by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of resourceS
   * @memberof ResourceUserController
   */
  public static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const update = req.body; 
      const resourceUpdated: IUser | null = await ResourceService
        .updateById(id, update);
      if (!resourceUpdated) throw new HttpException(404, 'resource not found');
      res.json({maxsize: resourceUpdated.maxsize});
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }
}
export default ResourceUserController;
