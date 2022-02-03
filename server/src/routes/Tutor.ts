import { Response, Request, Router } from "express";
import { protect } from "../middleware/Auth";
import { audit } from "../middleware/Audit";
import { ErrorInterface } from "../interface/AuthInterface";
import { TutorModel } from "../models/Tutor";
import { TutorInterface } from "../interface/TutorInterface";
export const Tutor = Router();
/**
 * @protected Admin
 * @description Creates a Tutor based on TutorInterface
 * @method POST
 */
Tutor.post("/tutor/create", protect, audit, async (req: Request, res: Response) => {
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
    const tutor: TutorInterface = req.body.tutor || {};
    await TutorModel.validate(tutor);
    const createdTutor = await TutorModel.create(tutor);
    if (!createdTutor) {
      throw new Error("Tutor could not be created!");
    }
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
/**
 * @protected Admin
 * @description Deletes tutor based on TutorInterface
 * @method POST
 */
Tutor.post("/tutor/delete", protect, audit, async (req: Request, res: Response) => {
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
    const tutor: TutorInterface = req.body.tutor || {};
    await TutorModel.validate(tutor);
    const createdTutor = await TutorModel.findOneAndDelete({ _id: tutor._id });
    if (!createdTutor) {
      throw new Error("No such a tutor found in DB");
    }
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
/**
 * @protected Admin
 * @description Gets all tutors based on TutorInterface
 * @method get
 */
Tutor.get("/tutor/list", protect, audit, async (req: Request, res: Response) => {
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
    if (!createdTutor) {
      throw new Error("Could not find any tutors...");
    }
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

/**
 * @protected Admin
 * @description Updates tutor based on TutorInterface
 * @method POST
 */
Tutor.post("/tutor/update", protect, audit, async (req: Request, res: Response) => {
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
    const tutor: TutorInterface = req.body.tutor || {};
    if (!tutor._id) {
      throw new Error("Tutor ID is missing");
    }
    await TutorModel.validate(tutor);
    const updatedTutor = await TutorModel.findOneAndUpdate(
      { _id: tutor._id },
      { ...tutor }
    );
    if (!updatedTutor) {
      throw new Error("This tutor could not be updated!");
    }
    return res.status(200).json({
      success: true,
      errorMap,
      tutor: updatedTutor,
    });
  } catch (error) {
    errorMap.err = error.message;
    return res.status(400).json({
      success: false,
      errorMap,
    });
  }
});
