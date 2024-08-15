import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {AppDataSource} from '../data-source';
import User from '../models/User';
dotenv.config();
const {JWT_SECRET = "1234566789"} = process.env;

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  //@ts-ignore
  req['currentUser'] = decode;
  next();
};

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      //@ts-ignore
      where: {id: req['currentUser'].id}
    });
    console.log(user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({message: 'Forbidden'});
    }
    next();
  };
};
