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
exports.Subject = void 0;
const express_1 = require("express");
const SubjectsView_1 = require("../models/SubjectsView");
const Auth_1 = require("../middleware/Auth");
const Audit_1 = require("../middleware/Audit");
const Subject_1 = require("../models/Subject");
const mongodb_1 = require("mongodb");
exports.Subject = (0, express_1.Router)();
/**
 * @protected User/Admin
 */
exports.Subject.get("/subjects", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {};
    const user = req.user;
    const isUserAdmin = user.authLevel.match("Admin");
    try {
        if (req.query.id) {
            const subject = yield SubjectsView_1.SubjectsView.findOne({ _id: req.query.id });
            if (subject) {
                if (!isUserAdmin && subject.degree !== user.level) {
                    errorMap.err =
                        "Can not access a subject not in students programme level";
                    return res.status(403).json({
                        success: false,
                        errorMap,
                    });
                }
                errorMap.err = "";
                return res.status(200).json({
                    subject,
                    errorMap,
                    success: true,
                });
            }
            errorMap.err = "No subject was found";
            return res.status(404).json({
                errorMap,
                success: false,
            });
        }
        else {
            let subjects;
            if (isUserAdmin) {
                subjects = yield SubjectsView_1.SubjectsView.find({});
            }
            else {
                subjects = yield SubjectsView_1.SubjectsView.find()
                    .where("degree")
                    .equals(user.level)
                    .exec();
            }
            res.status(200).json({
                subjects,
                errorMap,
                success: true,
            });
        }
    }
    catch (error) {
        errorMap.err = error.message;
        res.status(400).json({
            errorMap,
            success: true,
        });
    }
}));
//Admin
exports.Subject.post("/subject/update", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //Validation runs here
        const subjectToUpdate = req.body.subject;
        yield Subject_1.SubjectModel.validate(subjectToUpdate);
        const topicsObjectId = subjectToUpdate.topics.map((topic) => {
            return new mongodb_1.ObjectId(topic);
        });
        const tutorsObjectId = subjectToUpdate.tutors.map((tutor) => {
            return new mongodb_1.ObjectId(tutor);
        });
        if (!subjectToUpdate._id) {
            throw new Error("Subject ID is missing - do not know what to update rly... ");
        }
        const updatedSubject = yield Subject_1.SubjectModel.findByIdAndUpdate(subjectToUpdate._id, Object.assign(Object.assign({}, subjectToUpdate), { topics: topicsObjectId, tutors: tutorsObjectId }), { new: true, upsert: true, setDefaultsOnInsert: true });
        res.status(200).json({
            errorMap,
            success: true,
            subject: updatedSubject,
        });
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
}));
//Admin
exports.Subject.post("/subject/delete", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const subjectToUpdate = req.body.subject;
    try {
        const getSubjectTobeDeleted = yield Subject_1.SubjectModel.findByIdAndDelete(subjectToUpdate._id);
        if (getSubjectTobeDeleted) {
            errorMap.err = "";
            res.status(200).json({
                errorMap,
                success: true,
                subject: getSubjectTobeDeleted,
            });
        }
        else {
            errorMap.err = "No such subject exist in our DB";
            res.status(401).json({
                errorMap,
                success: false,
                subject: getSubjectTobeDeleted,
            });
        }
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            res.status(500).json({
                success: false,
                errorMap,
                subject: subjectToUpdate,
            });
        }
    }
}));
//Admin
exports.Subject.post("/subject/create", Auth_1.protect, Audit_1.audit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //Validation runs here
        const subjectToBeCreated = req.body.subject;
        yield Subject_1.SubjectModel.validate(subjectToBeCreated);
        const topicsObjectId = subjectToBeCreated.topics.map((topic) => {
            return new mongodb_1.ObjectId(topic);
        });
        const tutorsObjectId = subjectToBeCreated.tutors.map((tutor) => {
            return new mongodb_1.ObjectId(tutor);
        });
        const createdSubject = yield Subject_1.SubjectModel.create(Object.assign(Object.assign({}, subjectToBeCreated), { topics: topicsObjectId, tutors: tutorsObjectId }));
        res.status(200).json({
            errorMap,
            success: true,
            subject: createdSubject,
        });
    }
    catch (error) {
        if (error) {
            errorMap.err = error.message;
            res.status(500).json({
                success: false,
                errorMap,
            });
        }
    }
}));
//# sourceMappingURL=Subject.js.map