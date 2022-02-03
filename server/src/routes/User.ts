import { Request, Response, Router } from "express";
import { UserInterface } from "../interface/User";
import { protect } from "../middleware/Auth";
import { audit } from "../middleware/Audit";
import { ErrorInterface } from "../interface/AuthInterface";
import { User } from "../models/User";
import { SubjectsView } from "../models/SubjectsView";
import { SubjectInterface } from "../interface/SubjectInterface";
export const UserRoute = Router();

/**
 * @method POST
 * @description Returns a user with udpated subjects
 */
UserRoute.post(
  "/user/subject/subscribe",
  protect,
  audit,
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
    const { user }: { user: UserInterface } = req;
    const { subjectId } = req.body.subject;
    const isSubjectAlreadySubscribed: boolean =
      user.Subjects.includes(subjectId);
    if (isSubjectAlreadySubscribed) {
      errorMap.err = "Subject is already subscribed on this user";
      return res.status(400).json({
        success: false,
        errorMap,
      });
    }

    const subject: SubjectInterface | undefined = await SubjectsView.findOne({ _id: subjectId });

    if (!subject) {
        errorMap.err = "Subject does not exists";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }

    if (subject.degree !== user.level) {
        errorMap.err = "Can not subscribe to a subject not in students programme level";
        return res.status(403).json({
            success: false,
            errorMap,
        });
    }

    user.Subjects.push(subjectId);
    await User.findOneAndUpdate(
      //@ts-ignore
      { _id: user._id },
      //@ts-ignore
      { $set: { Subjects: user.Subjects } }
    );
    const UsersSubscribedSubjects = await SubjectsView.find()
      .where("_id")
      .in(user.Subjects)
      .exec();
    return res.status(200).json({
      success: true,
      user,
      errorMap,
      subjects: UsersSubscribedSubjects,
    });
  }
);
UserRoute.post(
  "/user/subject/unsubscribe",
  protect,
  audit,
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
    const { user }: { user: UserInterface } = req;
    const { subjectId } = req.body.subject;
    const doesSubjectExistsAtUser: boolean = user.Subjects.includes(subjectId);
    if (!doesSubjectExistsAtUser) {
      errorMap.err = "Such subject is not present at this user";
      return res.status(400).json({
        success: false,
        errorMap,
      });
    }
    const filteredItems = user.Subjects.filter(
      (subject) => subjectId !== subject
    );
    user.Subjects = filteredItems;
    await User.findOneAndUpdate(
      //@ts-ignore
      { _id: user._id },
      //@ts-ignore
      { $set: { Subjects: filteredItems } }
    );
    const UsersSubscribedSubjects = await SubjectsView.find()
      .where("_id")
      .in(user.Subjects)
      .exec();
    return res.status(200).json({
      success: true,
      user,
      errorMap,
      subjects: UsersSubscribedSubjects,
    });
  }
);

UserRoute.post(
  "/user/subject/read",
  protect,
  audit,
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };

    const { user }: { user: UserInterface } = req;

    const UsersSubscribedSubjects = await SubjectsView.find()
        .where("_id")
        .in(user.Subjects)
        .where("degree")
        .equals(user.level)
        .exec();

    const allSubjects = await SubjectsView.find()
        .where("degree")
        .equals(user.level)
        .exec();

    const arrayOfSubscribedSubjects = UsersSubscribedSubjects.map(
      (subject: SubjectInterface) => subject._id.toString()
    );

    const unique = allSubjects.filter((subjectAll) => {
      return !arrayOfSubscribedSubjects.includes(subjectAll._id.toString());
    });

    return res.status(200).json({
      success: true,
      user,
      errorMap,
      subjects: UsersSubscribedSubjects,
      restOfSubjects: unique,
    });
  }
);

//Admin protected
UserRoute.get(
  "/users/get/all",
  protect,
  audit,
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
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
      const users = await User.find({ authLevel: "Student" });
      if (users) {
        return res.status(200).json({
          users,
          errorMap,
          success: true,
        });
      }
      errorMap.err = "No users found";
      return res.status(400).json({
        errorMap,
        success: true,
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
  }
);
