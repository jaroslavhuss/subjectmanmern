import Express from "express";
import { Auth } from "./controllers/Auth";
import { protectedRoute } from "./routes/Private";
import { connect } from "./database/Connections";
import { config } from "dotenv";
import cors from "cors";
config();
const PORT = process.env.PORT || 5001;
const App = Express();
App.use(Express.json());
connect();

App.use("/auth-api/", cors(), Auth);
App.use("/api/", cors(), protectedRoute);

const server = App.listen(PORT, () => {
  console.log("Server is running!");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
