"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
exports.protectedRoute = (0, express_1.Router)();
exports.protectedRoute.get("/protected/", Auth_1.protect, (req, res) => {
    res.status(200).json({
        msg: "You are now authorized",
        //@ts-ignore
        user: req.user,
    });
});
//# sourceMappingURL=Private.js.map