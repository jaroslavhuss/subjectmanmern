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
exports.Tutor = void 0;
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
const Tutor_1 = require("../models/Tutor");
exports.Tutor = (0, express_1.Router)();
exports.Tutor.post("/tutor/create", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {};
    const isUserAdmin = req.user.authLevel.match("Admin");
    if (!isUserAdmin) {
        errorMap.err =
            "Not enough privileges! U are a student or you are not authorized for this action.";
        return res.status(403).json({
            success: false,
            errorMap,
        });
    }
    if (!req.body.tutor) {
        errorMap.err = "Tutor is not not correclty filled in or is Missing!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    let { name, surname, titleBefore, titleAfter } = req.body.tutor;
    if (!name && !surname) {
        errorMap.err = "Tutor is not not correclty filled in or is Missing!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    if (!titleBefore) {
        titleBefore = null;
    }
    if (!titleAfter) {
        titleAfter = null;
    }
    try {
        const createdTutor = yield Tutor_1.TutorModel.create({
            titleBefore,
            name,
            surname,
            titleAfter,
        });
        return res.status(200).json({
            success: true,
            errorMap,
            tutor: createdTutor,
        });
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            return res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
}));
exports.Tutor.post("/tutor/delete", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {};
    const isUserAdmin = req.user.authLevel.match("Admin");
    if (!isUserAdmin) {
        errorMap.err =
            "Not enough privileges! U are a student or you are not authorized for this action.";
        return res.status(403).json({
            success: false,
            errorMap,
        });
    }
    if (!req.body.tutor) {
        errorMap.err = "Tutor is not not correctly filled in or is Missing!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    const { _id } = req.body.tutor;
    if (!_id) {
        errorMap.err = "Id of the tutor is missing - it should be _id not just id";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    try {
        const createdTutor = yield Tutor_1.TutorModel.findOneAndDelete({ _id });
        return res.status(200).json({
            success: true,
            errorMap,
            tutor: createdTutor,
        });
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            return res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
}));
//Returns all tutors
exports.Tutor.post("/tutor/list", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {};
    const isUserAdmin = req.user.authLevel.match("Admin");
    if (!isUserAdmin) {
        errorMap.err =
            "Not enough privileges! U are a student or you are not authorized for this action.";
        return res.status(403).json({
            success: false,
            errorMap,
        });
    }
    try {
        const createdTutor = yield Tutor_1.TutorModel.find({});
        return res.status(200).json({
            success: true,
            errorMap,
            tutor: createdTutor,
        });
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            return res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
}));
//# sourceMappingURL=Tutor.js.map