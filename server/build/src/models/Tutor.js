"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorModel = void 0;
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is missing and is mandatory"],
    },
    titleBefore: {
        type: String,
        default: null,
    },
    surname: {
        type: String,
        required: [true, "Surname is missing and is mandatory"],
    },
    titleAfter: {
        type: String,
        default: null,
    },
});
exports.TutorModel = (0, mongoose_1.model)("tutor", tutorSchema);
//# sourceMappingURL=Tutor.js.map