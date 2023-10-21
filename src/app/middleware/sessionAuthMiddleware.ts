import { Request, Response, NextFunction } from 'express';
import { sessionController } from '../utils/sessionController';

export async function sessionAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies['sessionToken'];

  if (token) {
    const isValidSession = await sessionController.verifySession(token);

    if (isValidSession) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
