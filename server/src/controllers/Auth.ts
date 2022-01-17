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
        const user = User.create(
          {
            username,
            email,
            password,
          },
          (err, document) => {
            if (err) {
              return (errorMap.err = err.message);
            }
          }
        );
        return res.status(201).json({
          success: true,
          user,
          errorMap,
        });
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
Auth.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Funguji");
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
