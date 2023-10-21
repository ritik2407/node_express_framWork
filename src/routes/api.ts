import { Router } from 'express';
import { authController } from '../app/controllers/api/authController';
import { userController } from '../app/controllers/api/userController';

const api = Router();

api.post('/register', authController.registerUser);
api.post('/login', authController.loginUser);

api.get('/users', userController.getAllUsers);
api.get('/users/:id', userController.getUserById);

export default api;
