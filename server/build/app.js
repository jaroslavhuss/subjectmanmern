"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("./controllers/Auth");
const Private_1 = require("./routes/Private");
const Connections_1 = require("./database/Connections");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 5001;
const App = (0, express_1.default)();
App.use(express_1.default.json());
(0, Connections_1.connect)();
App.use("/auth-api/", (0, cors_1.default)(), Auth_1.Auth);
App.use("/api/", (0, cors_1.default)(), Private_1.protectedRoute);
const server = App.listen(PORT, () => {
    console.log("Server is running!");
});
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=app.js.map