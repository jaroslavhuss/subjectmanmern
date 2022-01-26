"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ErrorResponse_1 = require("../utils/ErrorResponse");
const errorHandler = (err, request, response, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    console.log(error);
    if (err.code === 11000) {
        const message = "Duplicated field value";
        error = new ErrorResponse_1.ErrorResponse(message, 400);
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => {
            //@ts-ignore
            val.message;
        });
        error = new ErrorResponse_1.ErrorResponse(message, 400);
    }
    response.status(error.status || 500).json({
        success: false,
        error: error.message || "Server error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=Error.js.map