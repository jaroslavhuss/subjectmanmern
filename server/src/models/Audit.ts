import { Schema, model } from "mongoose";
import { AuditInterface } from "../interface/AuditInterface";
const auditSchema = new Schema<AuditInterface>({
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
export const AuditModel = model("audit", auditSchema);
