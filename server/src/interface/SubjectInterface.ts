export interface SubjectInterface {
  _id: String;
  credits: Number;
  degree: String;
  forms: String[];
  links: String[];
  severity: String;
  topics: String[];
  tutors: String[];
  languages: {
    cs: {
      name: String;
      goal: String;
      description: String;
      langSeverity: String;
      langForm: String[];
    };
    eng: {
      name: String;
      goal: String;
      description: String;
      langSeverity: String;
      langForm: String[];
    };
  };
}
