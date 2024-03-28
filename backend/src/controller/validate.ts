import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  jwt.verify(
    token,
    process.env.JWT_TOKEN as string,
    (err: any, decode: any) => {
      if (err) {
        return res.status(403).json({ message: "user is not authenticated!" });
      } else {
        req.user = decode.user;
        next();
      }
    }
  );
};
