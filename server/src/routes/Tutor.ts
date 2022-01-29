import { Response, Request, Router } from "express";
import { protect } from "../middleware/Auth";
import { ErrorInterface } from "../interface/AuthInterface";
import { TutorModel } from "../models/Tutor";
import { TutorInterface } from "../interface/TutorInterface";
export const Tutor = Router();
Tutor.post("/tutor/create", protect, async (req: Request, res: Response) => {
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
  if (!req.body.tutor) {
    errorMap.err = "Tutor is not not correclty filled in or is Missing!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
  let { name, surname, titleBefore, titleAfter }: TutorInterface =
    req.body.tutor;
  if (!name && !surname) {
    errorMap.err = "Tutor is not not correclty filled in or is Missing!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
  if (!titleBefore) {
    titleBefore = null;
  }
  if (!titleAfter) {
    titleAfter = null;
  }
  try {
    const createdTutor = await TutorModel.create({
      titleBefore,
      name,
      surname,
      titleAfter,
    });

    return res.status(200).json({
      success: true,
      errorMap,
      tutor: createdTutor,
    });
  } catch (error) {
    if (error) {
      errorMap.err = error.message;
      return res.status(500).json({
        success: false,
        errorMap,
      });
    }
  }
});
Tutor.post("/tutor/delete", protect, async (req: Request, res: Response) => {
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

  if (!req.body.tutor) {
    errorMap.err = "Tutor is not not correctly filled in or is Missing!";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
  const { _id } = req.body.tutor;
  if (!_id) {
    errorMap.err = "Id of the tutor is missing - it should be _id not just id";
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
  try {
    const createdTutor = await TutorModel.findOneAndDelete({ _id });
    return res.status(200).json({
      success: true,
      errorMap,
      tutor: createdTutor,
    });
  } catch (error) {
    if (error) {
      errorMap.err = error.message;
      return res.status(500).json({
        success: false,
        errorMap,
      });
    }
  }
});
//Returns all tutors
Tutor.post("/tutor/list", protect, async (req: Request, res: Response) => {
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
    const createdTutor = await TutorModel.find({});
    return res.status(200).json({
      success: true,
      errorMap,
      tutor: createdTutor,
    });
  } catch (error) {
    if (error) {
      errorMap.err = error.message;
      return res.status(500).json({
        success: false,
        errorMap,
      });
    }
  }
});
