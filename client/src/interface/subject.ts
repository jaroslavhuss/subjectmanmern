import { TopicInterface } from "./TopicInterface";
import { TutorInterface } from "./TutorInterface";
export interface SubjectInterface {
  credits: number; //checked
  degree: string; //checked
  forms: string[]; //checked
  links: string[]; //checked
  severity: string; //Checked
  topics: TopicInterface[]; //Checked
  tutors: TutorInterface[]; //checked
  tutorials: {
    daily: [];
    distant: [];
  };
  languages: [
    {
      cs: {
        name: string;
        goal: string;
        description: string;
        langSeverity: string;
        langForm: string[];
      };
      en: {
        name: string;
        goal: string;
        description: string;
        langSeverity: string;
        langForm: string[];
      };
    }
  ];
}
