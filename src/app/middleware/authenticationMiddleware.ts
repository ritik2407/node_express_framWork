import { environment } from './../../config/environment';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token:any = req.headers['Authorization'];

  if (token) {
    jwt.verify(token, environment.secretkey, (err:any, decoded:any) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        // Token is valid, you can access the decoded information
        // For example, decoded.userId
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
