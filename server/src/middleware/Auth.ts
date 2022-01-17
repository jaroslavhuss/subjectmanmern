import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { ErrorInterface } from "../interface/AuthInterface";
const errorMap: ErrorInterface = {};
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    errorMap.err = "Not authorized";

    return res.status(401).json({
      errorMap,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    const user = await User.findById(decoded.id);
    if (!user) {
      errorMap.err = "User not found";
      return res.status(404).json({
        errorMap,
      });
    }
    //@ts-ignore doprdele
    req.user = user;
    next();
  } catch (error) {
    errorMap.err = "Not authorized";

    return res.status(401).json({
      errorMap,
    });
  }
};
