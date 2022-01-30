import { Schema, model } from "mongoose";
import { TutorInterface } from "../interface/TutorInterface";
const tutorSchema = new Schema<TutorInterface>({
  name: {
    type: String,
    required: [true, "Name is missing and is mandatory"],
  },
  titleBefore: {
    type: String,
    default: null,
  },
  surname: {
    type: String,
    required: [true, "Surname is missing and is mandatory"],
  },
  titleAfter: {
    type: String,
    default: null,
  },
});
export const TutorModel = model("tutor", tutorSchema);
