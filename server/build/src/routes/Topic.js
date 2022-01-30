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
exports.Topic = void 0;
const Topic_1 = require("../models/Topic");
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
exports.Topic = (0, express_1.Router)();
/**
 * @protected Admin
 * @description Creates Topic based on TopicInterface
 * @method POST
 */
exports.Topic.post("/topic/create", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const topic = req.body.topic || {};
        yield Topic_1.TopicModel.validate(topic);
        const createdTopic = yield Topic_1.TopicModel.create(topic);
        return res.status(200).json({
            success: true,
            errorMap,
            topic: createdTopic,
        });
    }
    catch (error) {
        errorMap.err = "Topic is not correclty filled in or is Missing!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
}));
/**
 * @protected Admin
 * @description Deletes topic based on TopicInterface
 * @method POST
 */
exports.Topic.post("/topic/delete", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const topic = req.body.topic || {};
        yield Topic_1.TopicModel.validate(topic);
        const deletedTopic = yield Topic_1.TopicModel.findOneAndDelete({ _id: topic._id });
        return res.status(200).json({
            success: true,
            errorMap,
            topic: deletedTopic,
        });
    }
    catch (error) {
        errorMap.err =
            "Topic is not correclty filled in or is missing! Or Id of the topic can not be found!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
}));
/**
 * @protected Admin
 * @description Returns all topics based on TopicInterface
 * @method GET
 */
exports.Topic.get("/topic/list", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const allTopics = yield Topic_1.TopicModel.find({});
        return res.status(200).json({
            success: true,
            errorMap,
            topic: allTopics,
        });
    }
    catch (error) {
        errorMap.err =
            "Topic is not correclty filled in or is missing! Or Id of the topic can not be found!";
        return res.status(400).json({
            success: false,
            errorMap,
        });
    }
}));
/**
 * @protected Admin
 * @description Updates topics based on TopicInterface
 * @method POST
 */
exports.Topic.post("/topic/update", Auth_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const topic = req.body.topic || {};
        if (!topic._id) {
            throw new Error("Topic ID is missing");
        }
        yield Topic_1.TopicModel.validate(topic);
        const updatedTopic = yield Topic_1.TopicModel.findOneAndUpdate({ _id: topic._id }, Object.assign({}, topic));
        return res.status(200).json({
            success: true,
            errorMap,
            topic: updatedTopic,
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
//# sourceMappingURL=Topic.js.map