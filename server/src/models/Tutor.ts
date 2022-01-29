import { Schema, model } from "mongoose";
import { TutorInterface } from "../interface/TutorInterface";
const tutorSchema = new Schema<TutorInterface>({
  name: {
    type: String,
    required: [true, "Name is missing and is mandatory"],
  },
  titleBefore: {
    type: String,
    required: [false, "Title before is missng"],
    preferences: {
      type: { preference1: String, preference2: String },
      default: null,
    },
    minlength: 0,
  },
  surname: {
    type: String,
    required: [true, "Surname is missing and is mandatory"],
  },
  titleAfter: {
    type: String,
    required: [false, "Title after is missing"],
    preferences: {
      type: { preference1: String, preference2: String },
      default: null,
    },
    minlength: 0,
  },
});
export const TutorModel = model("tutor", tutorSchema);
