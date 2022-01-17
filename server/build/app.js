"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./controllers/Auth");
const Connections_1 = require("./database/Connections");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const PORT = process.env.PORT || 6000;
const App = express_1.default();
App.use(express_1.default.json());
Connections_1.connect();
App.use("/auth-api/", Auth_1.Auth);
App.listen(PORT, () => {
    console.log("Server is running!");
});
//# sourceMappingURL=app.js.map