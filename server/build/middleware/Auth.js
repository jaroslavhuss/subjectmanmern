"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPwd = exports.ForgotPwd = exports.Login = exports.Auth = void 0;
const Auth = (req, res, next) => {
    res.send("This is the register route");
};
exports.Auth = Auth;
const Login = (req, res, next) => {
    res.send("This is the Login route");
};
exports.Login = Login;
const ForgotPwd = (req, res, next) => {
    res.send("This is the Forget Password");
};
exports.ForgotPwd = ForgotPwd;
const ResetPwd = (req, res, next) => {
    res.send("This is the Reset route");
};
exports.ResetPwd = ResetPwd;
//# sourceMappingURL=Auth.js.map