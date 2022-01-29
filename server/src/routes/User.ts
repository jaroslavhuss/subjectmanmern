import { Request, Response, Router } from "express";
import { UserInterface } from "../interface/User";
import { protect } from "../middleware/Auth";
import { ErrorInterface } from "../interface/AuthInterface";
import { User } from "../models/User";
import { SubjectsView } from "../models/SubjectsView";
export const UserRoute = Router();

/**
 * @method POST
 * @description Returns a user with udpated subjects
 */
UserRoute.post(
  "/user/subject/subscribe",
  protect,
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
    const { user }: { user: UserInterface } = req;
    const subjectId = req.body.subject;
    const isSubjectAlreadySubscribed: boolean =
      user.Subjects.includes(subjectId);
    if (isSubjectAlreadySubscribed) {
      errorMap.err = "Subject is already subscribed on this user";
      return res.status(400).json({
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
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
    const { user }: { user: UserInterface } = req;
    const subjectId = req.body.subject;
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
  async (req: Request | any, res: Response) => {
    const errorMap: ErrorInterface = {
      err: "",
    };
    const { user }: { user: UserInterface } = req;
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
