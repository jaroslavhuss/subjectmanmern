import { Request, Response, NextFunction } from "express";
import { AuditModel } from "../models/Audit";
import { AuditInterface } from "../interface/AuditInterface";

export const audit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;

    if (!user) {
        return next();
    }

    let entity = " ";

    for (const key of Object.keys(req.params)) {
        entity += `${key}: ${req.params[key]},`;
    }

    for (const key of Object.keys(req.query)) {
        entity += `${key}: ${req.query[key]},`;
    }

    const record: AuditInterface = {
        entity: entity,
        url: req.url,
        operation: req.method,
        userEmail: user.email,
        userName: `${user.name} ${user.surname}`,
        timestamp: new Date()
    };

    try {
        await AuditModel.create(record);
    } catch(e) {
        // intentionally suppress errors
        console.error(e);
    }

    return next();
};
