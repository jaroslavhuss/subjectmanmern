import { Router, Request, Response } from "express";

class Student {
  private route = Router();
  public create() {
    return this.route.get("/create", (req: Request, res: Response) => {
      res.send("It does work");
    });
  }
  public update() {}
  public delete() {}
  public get() {}
}
export const student = new Student();
