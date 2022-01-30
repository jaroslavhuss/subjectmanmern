import { TopicInterface } from "../interface/TopicInterface";
import { Schema, model } from "mongoose";
const topicSchema = new Schema<TopicInterface>({
  dificulty: {
    type: Number,
    required: [true, "Property dificulty must not be empty!"],
    min: 1,
    max: 5,
  },
  digitalContent: {
    type: String,
    required: [true, "Property digitalContent must not be empty!"],
  },
  languages: {
    cs: {
      name: {
        type: String,
        required: [true, "Property cs.name must not be empty!"],
      },
      description: {
        type: String,
        required: [true, "Property cs.description must not be empty!"],
      },
    },
    en: {
      name: {
        type: String,
        required: [true, "Property en.name must not be empty!"],
      },
      description: {
        type: String,
        required: [true, "Property en.description must not be empty!"],
      },
    },
  },
});

export const TopicModel = model("topic", topicSchema);
