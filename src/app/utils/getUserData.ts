// src/utils/getUserData.ts

import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function getUserData(req: Request) {
    const token = req.headers['authorization'];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'secretkey'); // Change 'secretkey' to your actual secret
            return decodedToken;
        } catch (error) {
            return null; // Invalid token
        }
    }

    return null; // No token provided
}
