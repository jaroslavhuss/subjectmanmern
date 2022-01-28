import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
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
    type: Array,
    required: [true, "At least one link has to be added to the subject"],
  },
  topics: {
    type: Array,
    required: [true, "At least one topic must be within the subject"],
  },
  languages: {
    cz: {
      name: String,
      goal: String,
      description: String,
      langSeverity: String,
      langForm: Array,
    },
    eng: {
      name: String,
      goal: String,
      description: String,
      langSeverity: String,
      langForm: Array,
    },
  },
  tutors: {
    type: Array,
    required: [true, "At least one tutor has to be filled in"],
  },
  forms: {
    type: Array,
    required: [true, "Study form has to be selected"],
  },
});
export const SubjectModel = model("subject", subjectSchema);
