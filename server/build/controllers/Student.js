"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
const express_1 = require("express");
class Student {
    constructor() {
        this.route = (0, express_1.Router)();
    }
    create() {
        return this.route.get("/create", (dtoIn, dtoOut) => {
            dtoOut.send("It does work");
        });
    }
    update() { }
    delete() { }
    get() { }
}
exports.student = new Student();
//# sourceMappingURL=Student.js.map