import { Request, Response } from 'express';
import { sessionController } from '../../utils/sessionController';

class WebLogoutController {
  public async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies['sessionToken'];

      if (token) {
        await sessionController.destroySession(token);
      }

      res.clearCookie('sessionToken');
      res.redirect('/login');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const webLogoutController = new WebLogoutController();
