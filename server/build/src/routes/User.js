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
exports.UserRoute = void 0;
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
const User_1 = require("../models/User");
const SubjectsView_1 = require("../models/SubjectsView");
exports.UserRoute = (0, express_1.Router)();
/**
 * @method POST
 * @description Returns a user with udpated subjects
 */
exports.UserRoute.post("/user/subject/subscribe", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {
        err: "",
    };
    const { user } = req;
    const { subjectId } = req.body.subject;
    const isSubjectAlreadySubscribed = user.Subjects.includes(subjectId);
    if (isSubjectAlreadySubscribed) {
        errorMap.err = "Subject is already subscribed on this user";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    user.Subjects.push(subjectId);
    yield User_1.User.findOneAndUpdate(
    //@ts-ignore
    { _id: user._id }, 
    //@ts-ignore
    { $set: { Subjects: user.Subjects } });
    const UsersSubscribedSubjects = yield SubjectsView_1.SubjectsView.find()
        .where("_id")
        .in(user.Subjects)
        .exec();
    return res.status(200).json({
        success: true,
        user,
        errorMap,
        subjects: UsersSubscribedSubjects,
    });
}));
exports.UserRoute.post("/user/subject/unsubscribe", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {
        err: "",
    };
    const { user } = req;
    const subjectId = req.body.subject;
    const doesSubjectExistsAtUser = user.Subjects.includes(subjectId);
    if (!doesSubjectExistsAtUser) {
        errorMap.err = "Such subject is not present at this user";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
    const filteredItems = user.Subjects.filter((subject) => subjectId !== subject);
    user.Subjects = filteredItems;
    yield User_1.User.findOneAndUpdate(
    //@ts-ignore
    { _id: user._id }, 
    //@ts-ignore
    { $set: { Subjects: filteredItems } });
    const UsersSubscribedSubjects = yield SubjectsView_1.SubjectsView.find()
        .where("_id")
        .in(user.Subjects)
        .exec();
    return res.status(200).json({
        success: true,
        user,
        errorMap,
        subjects: UsersSubscribedSubjects,
    });
}));
exports.UserRoute.post("/user/subject/read", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMap = {
        err: "",
    };
    const { user } = req;
    const UsersSubscribedSubjects = yield SubjectsView_1.SubjectsView.find()
        .where("_id")
        .in(user.Subjects)
        .exec();
    const allSubjects = yield SubjectsView_1.SubjectsView.find({});
    const arrayOfSubscribedSubjects = UsersSubscribedSubjects.map((subject) => subject._id.toString());
    const unique = allSubjects.filter((subjectAll) => {
        return !arrayOfSubscribedSubjects.includes(subjectAll._id.toString());
    });
    return res.status(200).json({
        success: true,
        user,
        errorMap,
        subjects: UsersSubscribedSubjects,
        restOfSubjects: unique,
    });
}));
//# sourceMappingURL=User.js.map