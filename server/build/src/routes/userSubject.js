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
exports.subscribeSubject = void 0;
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
exports.subscribeSubject = (0, express_1.Router)();
exports.subscribeSubject.post("/subscribe-subject/", Auth_1.protectedSubjectManipulation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: "the sujbect was successfully subscribed",
        //@ts-ignore
        user: req.user,
    });
}));
//# sourceMappingURL=userSubject.js.map