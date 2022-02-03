import { Types } from "mongoose";
export interface AuditInterface {
    _id?: Types.ObjectId;
    url: string;
    operation: string;
    entity: string;
    userEmail: string;
    userName: string;
    timestamp: Date;
}
