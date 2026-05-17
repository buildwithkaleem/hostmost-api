// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.js";
import { responseHandler } from "../utils/responseHandler.js";

export const protect = (req, res, next) => {
  try {
     const token = req.cookies?.Token;

     if (!token) {
       return responseHandler(res, 401, {}, "No token", false);
      }
      const decoded = verifyToken(token);
      
      req.user = decoded;

    next();
  } catch (error) {
    req.user = null
    return responseHandler(res, 401, {}, "Invalid token", false);
  }
};