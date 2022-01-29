"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./controllers/Auth");
const Subject_1 = require("./routes/Subject");
const Private_1 = require("./routes/Private");
const User_1 = require("./routes/User");
const Connections_1 = require("./database/Connections");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 5001;
const App = (0, express_1.default)();
App.use(express_1.default.json());
App.use(express_1.default.text());
(0, Connections_1.connect)();
App.use("/auth-api/", (0, cors_1.default)(), Auth_1.Auth);
App.use("/api/", (0, cors_1.default)(), Private_1.protectedRoute);
App.use("/api/", (0, cors_1.default)(), User_1.UserRoute);
App.use("/api/", (0, cors_1.default)(), Subject_1.Subject);
let server;
if (process.env.TEST !== "TRUE") {
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
exports.default = App;
//# sourceMappingURL=app.js.map