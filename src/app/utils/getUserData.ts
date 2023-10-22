// src/utils/getUserData.ts

import { environment } from './../../config/environment';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function getUserData(req: Request) {
    const token = req.headers['authorization'];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, environment.secretkey); // Change 'secretkey' to your actual secret
            return decodedToken;
        } catch (error) {
            return null; // Invalid token
        }
    }

    return null; // No token provided
}
