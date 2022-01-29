import { Schema, model } from "mongoose";
const subjectView = new Schema({
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
  languages: { type: Array, required: [true, "Language object is missing"] },
  tutors: {
    type: Array,
    required: [true, "At least one tutor has to be filled in"],
  },
  forms: {
    type: Array,
    required: [true, "Study form has to be selected"],
  },
  tutorials: {
    type: Object,
    require: [true, "At least one tutorial has to be filled!"],
  },
});
export const SubjectsView = model("subjectsView", subjectView, "subjectsView");
