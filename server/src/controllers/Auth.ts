import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { ErrorInterface } from "../interface/AuthInterface";
import { body, validationResult } from "express-validator";
export const Auth = Router();
const errorMap: ErrorInterface = {};

Auth.post(
  "/register",
  body("username").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const user = await User.create({
          username,
          email,
          password,
        });
        sendToken(user, 201, res);
      } catch (error) {
        errorMap.err = error.message;
        return res.status(500).json({
          success: false,
          errorMap,
        });
      }
    } else {
      errorMap.err = errors.array();
      return res.status(500).json({
        success: false,
        errorMap,
      });
    }
  }
);
Auth.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      errorMap.err = "Invalid credentials";
      return res.status(404).json({
        errorMap,
      });
    }
    const isMatched: boolean = await user.matchPasswords(password);
    if (!isMatched) {
      errorMap.err = "Invalid credentials";
      return res.status(404).json({
        errorMap,
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    errorMap.err = error.message;
    return res.status(500).json({
      errorMap,
    });
  }
});
Auth.post(
  "/forgot-password",
  (req: Request, res: Response, next: NextFunction) => {
    return res.send("Funguji");
  }
);
Auth.post(
  "/reset-password",
  (req: Request, res: Response, next: NextFunction) => {
    return res.send("Funguji");
  }
);

const sendToken = (user: any, statusCode: any, res: any) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
