"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectModel = void 0;
const mongoose_1 = require("mongoose");
const subjectSchema = new mongoose_1.Schema({
    credits: {
        type: Number,
        required: [true, "Number of credits is missing"],
    },
    degree: {
        type: String,
        required: [true, "Subject's degree is missing"],
    },
    severity: {
        type: String,
        required: [true, "Compulsory value is missing"],
    },
    links: {
        type: Array,
        required: [true, "At least one link has to be added to the subject"],
    },
    topics: {
        type: Array,
        required: [true, "At least one topic must be within the subject"],
    },
    languages: {
        cz: {
            name: String,
            goal: String,
            description: String,
            langSeverity: String,
            langForm: Array,
        },
        eng: {
            name: String,
            goal: String,
            description: String,
            langSeverity: String,
            langForm: Array,
        },
    },
    tutors: {
        type: Array,
        required: [true, "At least one tutor has to be filled in"],
    },
    forms: {
        type: Array,
        required: [true, "Study form has to be selected"],
    },
});
exports.SubjectModel = (0, mongoose_1.model)("subject", subjectSchema);
//# sourceMappingURL=Subject.js.map