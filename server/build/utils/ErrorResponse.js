"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        //@ts-ignore
        this.statusCode = statusCode;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map