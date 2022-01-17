"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
exports.Auth = express_1.Router();
const errorMap = {};
exports.Auth.post("/register", express_validator_1.body("username").notEmpty().isString(), express_validator_1.body("email").notEmpty().isEmail(), express_validator_1.body("password").notEmpty().isString().isLength({ min: 6 }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        try {
            const user = yield User_1.User.create({
                username,
                email,
                password,
            });
            sendToken(user, 201, res);
        }
        catch (error) {
            errorMap.err = error.message;
            return res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
    else {
        errorMap.err = errors.array();
        return res.status(500).json({
            success: false,
            errorMap,
        });
    }
}));
exports.Auth.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email }).select("+password");
        if (!user) {
            errorMap.err = "Invalid credentials";
            return res.status(404).json({
                errorMap,
            });
        }
        const isMatched = yield user.matchPasswords(password);
        if (!isMatched) {
            errorMap.err = "Invalid credentials";
            return res.status(404).json({
                errorMap,
            });
        }
        sendToken(user, 200, res);
    }
    catch (error) {
        errorMap.err = error.message;
        return res.status(500).json({
            errorMap,
        });
    }
}));
exports.Auth.post("/forgot-password", (req, res, next) => {
    return res.send("Funguji");
});
exports.Auth.post("/reset-password", (req, res, next) => {
    return res.send("Funguji");
});
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token,
    });
};
//# sourceMappingURL=Auth.js.map