import { Mongoose } from "mongoose";

class Connect {
  private mongoose: Mongoose = new Mongoose();
  public async connect() {
    const connectionResuls = await this.mongoose
      .createConnection("mongodb://127.0.0.1:27017/subjectman")
      .asPromise();
    return connectionResuls.readyState;
  }
}

export const connect = new Connect().connect();
