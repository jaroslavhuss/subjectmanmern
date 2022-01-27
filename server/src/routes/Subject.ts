import { Response, Request, Router } from "express";
import { SubjectsView } from "../models/SubjectsView";
import { protect } from "../middleware/Auth";
import { ErrorInterface } from "../interface/AuthInterface";
const errorMap: ErrorInterface = {};

export const Subject = Router();

/**
 * @description Protected route - returns list of all subjects!
 */

Subject.get("/subjects", protect, async (req: Request, res: Response) => {
  if (req.query.id) {
    const subject = await SubjectsView.findOne({ _id: req.query.id });
    if (subject) {
      return res.status(200).json({
        subject,
        errorMap,
        success: true,
      });
    }
    errorMap.err = "No subject was found";
    return res.status(404).json({
      errorMap,
      success: false,
    });
  } else {
    const subjects = await SubjectsView.find({});
    res.status(200).json({
      subjects,
      errorMap,
      success: true,
    });
  }
});
