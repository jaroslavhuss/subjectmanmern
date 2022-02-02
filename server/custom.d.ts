declare namespace Express {
  export interface Request {
    user: {
      name: string;
      surname: string;
      form: string;
      level: string;
      language: string;
      Subjects: string[];
      email: string;
      password: string;
      authLevel: string;
    };
  }
}
