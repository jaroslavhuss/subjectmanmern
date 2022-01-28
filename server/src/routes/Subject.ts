import { Response, Request, Router } from "express";
import { SubjectsView } from "../models/SubjectsView";
import { protect } from "../middleware/Auth";
import { ErrorInterface } from "../interface/AuthInterface";
import { SubjectInterface } from "../interface/SubjectInterface";
import { SubjectModel } from "../models/Subject";
import { ObjectId } from "mongodb";

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

Subject.post(
  "/subject/update",
  protect,
  async (req: Request, res: Response) => {
    const subjectToUpdate: SubjectInterface = req.body.subject;
    const topicsObjectId = subjectToUpdate.topics.map((topic) => {
      return topic;
    });

    subjectToUpdate.topics = topicsObjectId;
    const tutorsObjectId = subjectToUpdate.tutors.map((tutor) => {
      return tutor;
    });
    //@ts-ignore
    subjectToUpdate.tutors = tutorsObjectId;
    try {
      const getSubjectBeforeUpdate = await SubjectModel.findByIdAndUpdate(
        subjectToUpdate._id,
        //@ts-ignore
        subjectToUpdate,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.status(200).json({
        errorMap,
        success: true,
        subject: getSubjectBeforeUpdate,
      });
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subjectToUpdate,
        });
      }
    }
  }
);
