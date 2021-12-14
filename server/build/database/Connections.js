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
exports.connect = void 0;
const mongoose_1 = require("mongoose");
class Connect {
    constructor() {
        this.mongoose = new mongoose_1.Mongoose();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionResuls = yield this.mongoose
                .createConnection("mongodb://127.0.0.1:27017/subjectman")
                .asPromise();
            return connectionResuls.readyState;
        });
    }
}
exports.connect = new Connect().connect();
//# sourceMappingURL=Connections.js.map