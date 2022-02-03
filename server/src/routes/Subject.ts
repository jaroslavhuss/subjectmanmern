import { Response, Request, Router } from "express";
import { SubjectsView } from "../models/SubjectsView";
import { protect } from "../middleware/Auth";
import { audit } from "../middleware/Audit";
import { ErrorInterface } from "../interface/AuthInterface";
import {
  SubjectInterface,
  SubjectInterfaceRequestBody,
} from "../interface/SubjectInterface";
import { SubjectModel } from "../models/Subject";
import { ObjectId } from "mongodb";
export const Subject = Router();
/**
 * @protected User/Admin
 */
Subject.get("/subjects", protect, audit, async (req: Request, res: Response) => {
  const errorMap: ErrorInterface = {};
  const user = req.user;
  const isUserAdmin = user.authLevel.match("Admin");

  try {
    if (req.query.id) {
      const subject: SubjectInterface | undefined = await SubjectsView.findOne({ _id: req.query.id });
      if (subject) {
        if (!isUserAdmin && subject.degree !== user.level) {
          errorMap.err = "Can not access a subject not in students programme level";
          return res.status(403).json({
            success: false,
            errorMap,
          });
        }

        errorMap.err = "";
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
      let subjects;

      if (isUserAdmin) {
        subjects = await SubjectsView.find({});
      } else {
        subjects = await SubjectsView.find()
            .where("degree")
            .equals(user.level)
            .exec();
      }

      res.status(200).json({
        subjects,
        errorMap,
        success: true,
      });
    }
  } catch (error) {
    errorMap.err = error.message;
    res.status(400).json({
      errorMap,
      success: true,
    });
  }
});
//Admin
Subject.post(
  "/subject/update",
  protect,
  audit,
  async (req: Request, res: Response) => {
    const errorMap: ErrorInterface = {};
    const isUserAdmin = req.user.authLevel.match("Admin");
    if (!isUserAdmin) {
      errorMap.err =
        "Not enough privileges! U are a student or you are not authorized for this action.";
      return res.status(403).json({
        success: false,
        errorMap,
      });
    }

    try {
      //Validation runs here
      const subjectToUpdate: SubjectInterface = req.body.subject;
      await SubjectModel.validate(subjectToUpdate);

      const topicsObjectId: any = subjectToUpdate.topics.map((topic: any) => {
        return new ObjectId(topic);
      });
      const tutorsObjectId: any = subjectToUpdate.tutors.map((tutor: any) => {
        return new ObjectId(tutor);
      });
      if (!subjectToUpdate._id) {
        throw new Error(
          "Subject ID is missing - do not know what to update rly... "
        );
      }
      const updatedSubject: SubjectInterface =
        await SubjectModel.findByIdAndUpdate(
          subjectToUpdate._id,
          {
            ...subjectToUpdate,
            topics: topicsObjectId,
            tutors: tutorsObjectId,
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      res.status(200).json({
        errorMap,
        success: true,
        subject: updatedSubject,
      });
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
        });
      }
    }
  }
);
//Admin
Subject.post(
  "/subject/delete",
  protect,
  audit,
  async (req: Request, res: Response) => {
    const errorMap: ErrorInterface = {};
    const subjectToUpdate: SubjectInterfaceRequestBody = req.body.subject;
    try {
      const getSubjectTobeDeleted = await SubjectModel.findByIdAndDelete(
        subjectToUpdate._id
      );
      if (getSubjectTobeDeleted) {
        errorMap.err = "";
        res.status(200).json({
          errorMap,
          success: true,
          subject: getSubjectTobeDeleted,
        });
      } else {
        errorMap.err = "No such subject exist in our DB";
        res.status(401).json({
          errorMap,
          success: false,
          subject: getSubjectTobeDeleted,
        });
      }
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subject: subjectToUpdate,
        });
      }
    }
  }
);
//Admin
Subject.post(
  "/subject/create",
  protect,
  audit,
  async (req: Request, res: Response) => {
    const errorMap: ErrorInterface = {};
    const subjectToBeCreated: SubjectInterfaceRequestBody = req.body.subject;
    const topicsObjectId = subjectToBeCreated.topics.map((topic) => {
      return new ObjectId(topic);
    });

    const tutorsObjectId = subjectToBeCreated.tutors.map((tutor) => {
      return new ObjectId(tutor);
    });
    try {
      const createdSubject = await SubjectModel.create({
        ...subjectToBeCreated,
        topics: topicsObjectId,
        tutors: tutorsObjectId,
      });
      if (createdSubject) {
        errorMap.err = "";
        res.status(200).json({
          errorMap,
          success: true,
          subject: createdSubject,
        });
      } else {
        errorMap.err = "The subject was not created!";
        res.status(401).json({
          errorMap,
          success: false,
          subject: subjectToBeCreated,
        });
      }
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subject: subjectToBeCreated,
        });
      }
    }
  }
);
