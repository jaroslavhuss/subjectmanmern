import { Request, Response, Router } from "express";
import { protect } from "../middleware/Auth";
import { audit } from "../middleware/Audit";
export const protectedRoute = Router();

protectedRoute.get("/protected/", protect, audit, (req: Request, res: Response) => {
  res.status(200).json({
    msg: "You are now authorized",
    //@ts-ignore
    user: req.user,
    //@ts-ignore
    subjects: req.subjects,
  });
});
