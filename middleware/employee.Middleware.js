// import authMiddleware from './authMiddleware';

// Middleware to check employee permissions
const permissionMiddleware = (requiredPermission) => (req, res, next) => {
    if (req.user.role === 'director') return next(); // Directors have full access
    if (!req.user.permissions.includes(requiredPermission)) {
        console.log(`User ${req.user.username} does not have permission to access ${requiredPermission}`);
        return res.status(403).json({ message: `Access denied to ${requiredPermission}` });
    }
    next();
};

export default permissionMiddleware;
