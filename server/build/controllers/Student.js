"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
const express_1 = require("express");
class Student {
    constructor() {
        this.route = express_1.Router();
    }
    create() {
        return this.route.get("/create", (req, res) => {
            res.send("It does work");
        });
    }
    update() { }
    delete() { }
    get() { }
}
exports.student = new Student();
//# sourceMappingURL=Student.js.map