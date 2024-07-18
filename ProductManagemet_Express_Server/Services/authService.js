import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error('Failed to authenticate token'));
            }
            resolve(decoded);
        });
    });
};

