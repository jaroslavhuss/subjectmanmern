"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const supertest = __importStar(require("supertest"));
const user_1 = require("./utils/user");
// @ts-ignore
const request = supertest.default(app_1.default);
describe('Auth controller', () => {
    test('should return an error in case of wrong request body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth-api/register').send({});
        expect(response.status).toEqual(400);
    }));
    test('should return an error in case of weak password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = (0, user_1.generateUser)();
        user1.password = 'weakPassword';
        const user2 = (0, user_1.generateUser)();
        user2.password = 'weakPassword6';
        const user3 = (0, user_1.generateUser)();
        user3.password = 'weakPassword$';
        const response1 = yield request.post('/auth-api/register').send(user1);
        expect(response1.status).toEqual(400);
        const response2 = yield request.post('/auth-api/register').send(user2);
        expect(response2.status).toEqual(400);
        const response3 = yield request.post('/auth-api/register').send(user3);
        expect(response3.status).toEqual(400);
    }));
    test('should successfully register new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth-api/register').send((0, user_1.generateUser)());
        expect(response.status).toEqual(201);
    }));
    test('should not login user with given wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, user_1.generateUser)();
        // Register user
        const registerResponse = yield request.post('/auth-api/register').send(user);
        expect(registerResponse.status).toEqual(201);
        // Login user
        const loginResponse = yield request.post('/auth-api/login').send({
            email: user.email,
            password: 'wrong_password'
        });
        expect(loginResponse.status).toEqual(401);
    }));
    test('should successfully login given user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, user_1.generateUser)();
        // Register user
        const registerResponse = yield request.post('/auth-api/register').send(user);
        expect(registerResponse.status).toEqual(201);
        // Login user
        const loginResponse = yield request.post('/auth-api/login').send({
            email: user.email,
            password: user.password
        });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body.token).toBeDefined();
        expect(typeof loginResponse.body.token).toEqual('string');
    }));
});
//# sourceMappingURL=Auth.integration.test.js.map