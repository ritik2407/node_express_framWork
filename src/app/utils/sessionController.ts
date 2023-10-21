import { Session } from '../models/Session';

class SessionController {
  public async createSession(userId: number, token: string): Promise<void> {
    await Session.create({ userId, token });
  }

  public async verifySession(token: string): Promise<boolean> {
    const session = await Session.findOne({ where: { token } });
    return !!session;
  }

  public async destroySession(token: string): Promise<void> {
    await Session.destroy({ where: { token } });
  }
}

export const sessionController = new SessionController();
