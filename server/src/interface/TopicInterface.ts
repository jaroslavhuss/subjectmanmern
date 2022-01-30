import { Types } from "mongoose";
export interface TopicInterface {
  _id?: Types.ObjectId;
  dificulty: number;
  digitalContent: string;
  languages: {
    cs: {
      name: string;
      description: string;
    };
    en: {
      name: string;
      description: string;
    };
  };
}
