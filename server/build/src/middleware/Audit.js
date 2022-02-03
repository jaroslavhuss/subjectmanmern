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
exports.audit = void 0;
const Audit_1 = require("../models/Audit");
const audit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const record = {
        entity: entity,
        url: req.url,
        operation: req.method,
        userEmail: user.email,
        userName: `${user.name} ${user.surname}`,
        timestamp: new Date()
    };
    try {
        yield Audit_1.AuditModel.create(record);
    }
    catch (e) {
        // intentionally suppress errors
        console.error(e);
    }
    return next();
});
exports.audit = audit;
//# sourceMappingURL=Audit.js.map