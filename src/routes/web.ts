import { Router } from 'express';
import { webController } from '../app/controllers/web/webController';
import { webLoginController } from '../app/controllers/web/webLoginController';
import { webLogoutController } from '../app/controllers/web/webLogoutController';
import { sessionAuthMiddleware } from '../app/middleware/sessionAuthMiddleware';

const web = Router();

web.get('/',  webController.showHomePage);
web.get('/login', webController.showLoginPage);
web.get('/register', webController.showRegisterPage);

web.post('/login', webLoginController.loginUser);
web.post('/logout', webLogoutController.logoutUser);

export default web;
