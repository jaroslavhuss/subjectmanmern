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
            const user = User_1.User.create({
                username,
                email,
                password,
            }, (err, document) => {
                if (err) {
                    return (errorMap.err = err.message);
                }
            });
            return res.status(201).json({
                success: true,
                user,
                errorMap,
            });
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
exports.Auth.post("/login", (req, res, next) => {
    return res.send("Funguji");
});
exports.Auth.post("/forgot-password", (req, res, next) => {
    return res.send("Funguji");
});
exports.Auth.post("/reset-password", (req, res, next) => {
    return res.send("Funguji");
});
//# sourceMappingURL=Auth.js.map