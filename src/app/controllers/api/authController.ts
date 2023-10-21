import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

class AuthController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const authController = new AuthController();
