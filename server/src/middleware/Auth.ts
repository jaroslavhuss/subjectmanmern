import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { SubjectsView } from "../models/SubjectsView";
import { Request, Response, NextFunction } from "express";
import { ErrorInterface } from "../interface/AuthInterface";
const errorMap: ErrorInterface = {};
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    errorMap.err = "Not authorized";
    return res.status(401).json({
      errorMap,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    const user = await User.findById(decoded.id);
    const subjects = await SubjectsView.find({});
    if (!user) {
      errorMap.err = "User not found";
      return res.status(404).json({
        errorMap,
      });
    }

    //@ts-ignore user
    req.user = user;
    //@ts-ignore user
    req.subjects = subjects;
    next();
  } catch (error) {
    errorMap.err = "Not authorized";

    return res.status(401).json({
      errorMap,
    });
  }
};

export const protectedSubjectManipulation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    errorMap.err = "Not authorized";
    return res.status(401).json({
      errorMap,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    const user = await User.findById(decoded.id);
    if (!user) {
      errorMap.err = "User not found";
      return res.status(404).json({
        errorMap,
      });
    } else {
      const findSubjectForSubscribe = await SubjectsView.findById(
        req.body.subject
      );
      const currentSubjects: [] = user.Subjects;
      //@ts-ignore
      currentSubjects.push(findSubjectForSubscribe);
      //@ts-ignore
      await User.findByIdAndUpdate(
        //@ts-ignore
        { _id: decoded.id },
        //@ts-ignore
        { $set: { Subjects: currentSubjects } }
      );
      //@ts-ignore
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    errorMap.err = "Not authorized";

    return res.status(401).json({
      errorMap,
    });
  }
};
