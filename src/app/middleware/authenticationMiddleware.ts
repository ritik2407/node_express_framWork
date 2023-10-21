import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies['sessionToken'];

  if (token) {
    jwt.verify(token, 'secretkey', (err:any, decoded:any) => {
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
