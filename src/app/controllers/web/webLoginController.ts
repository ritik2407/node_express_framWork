import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import { sessionController } from '../../utils/sessionController';
import { environment } from './../../../config/environment';

class WebLoginController {
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).sendFile('login.html', { root: './views' });
        return;
      }

      const token = jwt.sign({ userId: user.id }, environment.secretkey, { expiresIn: '1h' });

      await sessionController.createSession(user.id, token);

      res.cookie('sessionToken', token, { httpOnly: true });
      res.redirect('/');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const webLoginController = new WebLoginController();
