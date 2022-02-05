import { Server } from "http";
import Express from "express";
import { Auth } from "./controllers/Auth";
import { Subject } from "./routes/Subject";
import { protectedRoute } from "./routes/Private";
import { Tutor } from "./routes/Tutor";
import { UserRoute } from "./routes/User";
import { Topic } from "./routes/Topic";
import { connect } from "./database/Connections";
import { config } from "dotenv";
import cors from "cors";
config();
const PORT = process.env.PORT || 5001;
const App = Express();
App.use(Express.json());
App.use(Express.text());
App.use(cors());
connect();

App.use("/auth-api/", cors(), Auth);
App.use("/api/", cors(), protectedRoute);
App.use("/api/", cors(), UserRoute);
App.use("/api/", cors(), Subject);
App.use("/api/", cors(), Tutor);
App.use("/api/", cors(), Topic);

let server: Server;

if (process.env.TEST !== "true") {
  server = App.listen(PORT, () => {
    console.log("Server is running!");
  });
}

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

export default App;
