import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { ErrorInterface } from "../interface/AuthInterface";
import { body, validationResult } from "express-validator";
export const Auth = Router();
const errorMap: ErrorInterface = {};

Auth.post(
  "/register",
  body("name").notEmpty().isString(),
  body("surname").notEmpty().isString(),
  body("form").notEmpty().isString(),
  body("level").notEmpty().isString(),
  body("language").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString().isLength({ min: 6 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, form, level, language, email, password } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const doesUserExists = await User.findOne({ email });
        if (doesUserExists) {
          errorMap.err = "This user already exists";
          res.status(409).json({
            success: false,
            errorMap,
          });
        } else {
          const user = await User.create({
            name,
            surname,
            form,
            level,
            language,
            email,
            password,
          });
          sendToken(user, 201, res);
        }
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
const sendToken = (user: any, statusCode: any, res: any) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    errorMap,
  });
};
