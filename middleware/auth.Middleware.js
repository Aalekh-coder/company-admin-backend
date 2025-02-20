// ../middleware/auth.Middleware.js
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import User from '../model/user.Model.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request - No token provided');
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user by ID, excluding sensitive fields
    const user = await User.findById(decodedToken?._id).select('-password -refreshToken');

    if (!user) {
      throw new ApiError(401, 'Unauthorized request - Invalid user');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || 'Unauthorized request - Token verification failed'));
  }
};

export default authMiddleware;
