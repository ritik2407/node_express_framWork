import { Request, Response } from 'express';
import { User } from '../../models/User';

class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const userController = new UserController();
