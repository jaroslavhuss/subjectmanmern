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
const Audit_1 = require("../middleware/Audit");
const Tutor_1 = require("../models/Tutor");
exports.Tutor = (0, express_1.Router)();
/**
 * @protected Admin
 * @description Creates a Tutor based on TutorInterface
 * @method POST
 */
exports.Tutor.post("/tutor/create", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const tutor = req.body.tutor || {};
        yield Tutor_1.TutorModel.validate(tutor);
        const createdTutor = yield Tutor_1.TutorModel.create(tutor);
        if (!createdTutor) {
            throw new Error("Tutor could not be created!");
        }
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
/**
 * @protected Admin
 * @description Deletes tutor based on TutorInterface
 * @method POST
 */
exports.Tutor.post("/tutor/delete", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const tutor = req.body.tutor || {};
        yield Tutor_1.TutorModel.validate(tutor);
        const createdTutor = yield Tutor_1.TutorModel.findOneAndDelete({ _id: tutor._id });
        if (!createdTutor) {
            throw new Error("No such a tutor found in DB");
        }
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
/**
 * @protected Admin
 * @description Gets all tutors based on TutorInterface
 * @method get
 */
exports.Tutor.get("/tutor/list", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (!createdTutor) {
            throw new Error("Could not find any tutors...");
        }
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
/**
 * @protected Admin
 * @description Updates tutor based on TutorInterface
 * @method POST
 */
exports.Tutor.post("/tutor/update", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const tutor = req.body.tutor || {};
        if (!tutor._id) {
            throw new Error("Tutor ID is missing");
        }
        yield Tutor_1.TutorModel.validate(tutor);
        const updatedTutor = yield Tutor_1.TutorModel.findOneAndUpdate({ _id: tutor._id }, Object.assign({}, tutor));
        if (!updatedTutor) {
            throw new Error("This tutor could not be updated!");
        }
        return res.status(200).json({
            success: true,
            errorMap,
            tutor: updatedTutor,
        });
    }
    catch (error) {
        errorMap.err = error.message;
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
}));
//# sourceMappingURL=Tutor.js.map