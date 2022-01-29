import { Schema, model } from "mongoose";
import { SubjectInterface } from "../interface/SubjectInterface";
import { ObjectID } from "bson";
const subjectSchema = new Schema<SubjectInterface>({
  credits: {
    type: Number,
    required: [true, "Number of credits is missing"],
  },
  degree: {
    type: String,
    required: [true, "Subject's degree is missing"],
  },
  severity: {
    type: String,
    required: [true, "Compulsory value is missing"],
  },
  links: {
    type: [String],
    required: [true, "At least one link has to be added to the subject"],
  },
  topics: {
    type: [ObjectID],
    required: [true, "At least one topic must be within the subject"],
  },
  languages: {
    cs: {
      name: String,
      goal: String,
      description: String,
      langSeverity: String,
      langForm: Array,
    },
    en: {
      name: String,
      goal: String,
      description: String,
      langSeverity: String,
      langForm: Array,
    },
  },
  tutors: {
    type: [ObjectID],
    required: [true, "At least one tutor has to be filled in"],
  },
  forms: {
    type: [String],
    required: [true, "Study form has to be selected"],
  },
});
export const SubjectModel = model("subject", subjectSchema);
