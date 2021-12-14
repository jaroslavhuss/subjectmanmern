import Express from "express";
import { student } from "./controllers/Student";
import { connect } from "./database/Connections";
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 5000;
const App = Express();
connect.then((dbConnectionState: number) => {
  if (dbConnectionState === 1) {
    App.use("/student/", student.create());
    App.listen(PORT, () => {
      console.log("Server is running");
    });
  }
});
