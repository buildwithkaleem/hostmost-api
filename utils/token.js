import jwt from "jsonwebtoken";

export const generateVerifyToken = (userId,role,expire="1d") => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: expire } // 1 day
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET) 
};