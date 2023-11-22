import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createJWT = (user) => {
  // user parameter is an object.
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  // token is string which this method returns.
  return token;
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
