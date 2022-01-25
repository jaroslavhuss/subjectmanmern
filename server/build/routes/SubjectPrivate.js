"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubjects = void 0;
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
exports.listSubjects = express_1.Router();
exports.listSubjects.post("/subjects/get", Auth_1.protect, (req, res) => {
    res.status(200).json({
        msg: "You are now authorized",
        //@ts-ignore
        user: req.user,
    });
});
//# sourceMappingURL=SubjectPrivate.js.map