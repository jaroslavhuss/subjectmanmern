"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_1 = require("./controllers/Student");
const Connections_1 = require("./database/Connections");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const PORT = process.env.PORT || 6000;
const App = express_1.default();
Connections_1.connect.then((dbConnectionState) => {
    if (dbConnectionState === 1) {
        App.use("/student/", Student_1.student.create());
        App.listen(PORT, () => {
            console.log("Server is running!");
        });
    }
});
//# sourceMappingURL=app.js.map