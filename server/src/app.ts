import Express from "express";
import { Auth } from "./controllers/Auth";
import { connect } from "./database/Connections";
import { config } from "dotenv";
config();
const PORT = process.env.PORT || 6000;
const App = Express();
App.use(Express.json());
connect();
App.use("/auth-api/", Auth);
App.listen(PORT, () => {
  console.log("Server is running!");
});
