"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = void 0;
const mongoose_1 = require("mongoose");
const topicSchema = new mongoose_1.Schema({
    dificulty: {
        type: Number,
        required: [true, "Property dificulty must not be empty!"],
        min: 1,
        max: 5,
    },
    digitalContent: {
        type: String,
        required: [true, "Property digitalContent must not be empty!"],
    },
    languages: {
        cs: {
            name: {
                type: String,
                required: [true, "Property cs.name must not be empty!"],
            },
            description: {
                type: String,
                required: [true, "Property cs.description must not be empty!"],
            },
        },
        en: {
            name: {
                type: String,
                required: [true, "Property en.name must not be empty!"],
            },
            description: {
                type: String,
                required: [true, "Property en.description must not be empty!"],
            },
        },
    },
});
exports.TopicModel = (0, mongoose_1.model)("topic", topicSchema);
//# sourceMappingURL=Topic.js.map