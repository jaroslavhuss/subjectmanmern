import { Request, Response, Router } from "express";
import { protect } from "../middleware/Auth";
export const protectedRoute = Router();

protectedRoute.get("/protected/", protect, (req: Request, res: Response) => {
  res.status(200).json({
    msg: "You are now authorized",
    //@ts-ignore
    user: req.user,
    //@ts-ignore
    subjects: req.subjects,
  });
});
