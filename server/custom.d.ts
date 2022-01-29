declare namespace Express {
  export interface Request {
    user: {
      authLevel: string;
    };
  }
}
