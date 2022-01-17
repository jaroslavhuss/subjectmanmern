import Mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connect = async () => {
  /**
   *   const dev_mode = process.env.DEV_MODE;
  if (dev_mode === "development") {
    const connectionResuls = await new Mongoose()
      .createConnection(process.env.DB_LOCAL)
      .asPromise();
    console.log("\x1b[42m", "Connecting to the local DB.");
    return connectionResuls.readyState;
  } else {
    const connectionResuls = await new Mongoose()
      .createConnection(process.env.DB_PRODUCTION)
      .asPromise();
    console.log("\x1b[41m", "Connecting to the production DB.");
    return connectionResuls.readyState;
  }
   */
  const dev_mode = process.env.DEV_MODE;
  if (dev_mode === "development") {
    await Mongoose.connect(process.env.DB_LOCAL).then((status) => {
      console.log("\x1b[42m", "Connected to the local DB.");
    });
  } else {
    await Mongoose.connect(process.env.DB_PRODUCTION).then((status) => {
      console.log("\x1b[41m", "Connected to the production DB.");
    });
  }
};
