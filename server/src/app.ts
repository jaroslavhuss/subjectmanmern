import Express from "express";
import { Auth } from "./controllers/Auth";
import { protectedRoute } from "./routes/Private";
import { connect } from "./database/Connections";
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 6000;
const App = Express();
App.use(Express.json());
connect();

App.use("/auth-api/", Auth);
App.use("/api/", protectedRoute);

const server = App.listen(PORT, () => {
  console.log("Server is running!");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
