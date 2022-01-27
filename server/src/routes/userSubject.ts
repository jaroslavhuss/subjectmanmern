import { Request, Response, Router } from "express";
import { protectedSubjectManipulation } from "../middleware/Auth";
export const subscribeSubject = Router();
subscribeSubject.post(
  "/subscribe-subject/",
  protectedSubjectManipulation,
  async (req: Request, res: Response) => {
    res.status(200).json({
      msg: "the sujbect was successfully subscribed",
      //@ts-ignore
      user: req.user,
    });
  }
);
