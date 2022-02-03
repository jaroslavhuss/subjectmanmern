"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditModel = void 0;
const mongoose_1 = require("mongoose");
const auditSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: [true, "Url is missing and is mandatory"],
    },
    operation: {
        type: String,
        required: [true, "Operation is missing and is mandatory"],
    },
    entity: {
        type: String,
        required: [true, "Entity is missing and is mandatory"],
    },
    userEmail: {
        type: String,
        required: [true, "UserEmail is missing and is mandatory"],
    },
    userName: {
        type: String,
        required: [true, "UserName is missing and is mandatory"],
    },
    timestamp: {
        type: Date,
        required: [true, "Timestamp is missing and is mandatory"],
    },
});
exports.AuditModel = (0, mongoose_1.model)("audit", auditSchema);
//# sourceMappingURL=Audit.js.map