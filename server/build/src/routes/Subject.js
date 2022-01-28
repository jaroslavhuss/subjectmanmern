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
const Subject_1 = require("../models/Subject");
const errorMap = {};
exports.Subject = (0, express_1.Router)();
/**
 * @description Protected route - returns list of all subjects!
 */
exports.Subject.get("/subjects", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id) {
        const subject = yield SubjectsView_1.SubjectsView.findOne({ _id: req.query.id });
        if (subject) {
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
        const subjects = yield SubjectsView_1.SubjectsView.find({});
        res.status(200).json({
            subjects,
            errorMap,
            success: true,
        });
    }
}));
exports.Subject.post("/subject/update", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectToUpdate = req.body.subject;
    const getSubjectBeforeUpdate = yield Subject_1.SubjectModel.findById(subjectToUpdate._id);
    res.status(200).json({
        errorMap,
        success: true,
        subject: getSubjectBeforeUpdate,
    });
}));
//# sourceMappingURL=Subject.js.map