import { ObjectId } from "mongoose";

export interface SubjectInterfaceRequestBody {
  _id: String;
  credits: number; //checked
  degree: string; //checked
  forms: string[]; //checked
  links: string[]; //checked
  severity: string; //Checked
  topics: string[]; //Checked
  tutors: string[]; //checked
  languages: {
    cs: {
      name: string;
      goal: string;
      description: string;
      langSeverity: string;
      langForm: string[];
    };
    eng: {
      name: string;
      goal: string;
      description: string;
      langSeverity: string;
      langForm: string[];
    };
  };
}

export interface SubjectInterface {
  _id: String;
  credits: number; //checked
  degree: string; //checked
  forms: string[]; //checked
  links: string[]; //checked
  severity: string; //Checked
  topics: ObjectId[]; //Checked
  tutors: ObjectId[]; //checked
  languages: {
    cs: {
      name: string;
      goal: string;
      description: string;
      langSeverity: string;
      langForm: string[];
    };
    eng: {
      name: string;
      goal: string;
      description: string;
      langSeverity: string;
      langForm: string[];
    };
  };
}
