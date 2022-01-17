import { Response, Request, NextFunction } from "express";
export const Auth = (req: Request, res: Response, next: NextFunction) => {
  res.send("This is the register route");
};
export const Login = (req: Request, res: Response, next: NextFunction) => {
  res.send("This is the Login route");
};
export const ForgotPwd = (req: Request, res: Response, next: NextFunction) => {
  res.send("This is the Forget Password");
};
export const ResetPwd = (req: Request, res: Response, next: NextFunction) => {
  res.send("This is the Reset route");
};
