import { Types } from "mongoose";
export interface TutorInterface {
  _id?: Types.ObjectId;
  titleBefore: string | null;
  name: string;
  surname: string;
  titleAfter: string | null;
}
