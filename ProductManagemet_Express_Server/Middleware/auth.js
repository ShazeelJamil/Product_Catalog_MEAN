import { verifyToken } from '../Services/authService.js';

export const authMiddleware = async (req, res, next) => {
    // Exclude /signin and /signup routes
    if (req.path === '/signin' || req.path === '/signup') {
        return next();
    }
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }
    try {
        const decoded = await verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};
