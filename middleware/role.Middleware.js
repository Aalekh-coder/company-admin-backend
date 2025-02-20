// ../middleware/role.Middleware.js
import { ApiError } from "../utils/apiError.js";
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      console.log("User role:", req.user.role); // Debugging line
      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(403, "Forbidden: Insufficient privileges");
      }
      next();
    };
  };
  

export default roleMiddleware; // Use default export
