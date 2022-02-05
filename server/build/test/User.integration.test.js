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
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const registerResponse = yield request.post('/auth-api/register').send(user);
    expect(registerResponse.status).toEqual(201);
    const loginResponse = yield request.post('/auth-api/login').send({
        email: user.email,
        password: user.password
    });
    expect(loginResponse.status).toEqual(200);
    return loginResponse.body.token;
});
describe('User controller', () => {
    test('should only return subject same to user`s programme level', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, user_1.generateUser)();
        const token = yield loginUser(user);
        const response = yield request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});
        expect(response.status).toEqual(200);
        // Check that student has 0 subscribed subjects
        expect(response.body.subjects).toBeDefined();
        expect(response.body.subjects.length).toEqual(0);
        // Check that user receives in response subjects only available to his level of study
        expect(response.body.restOfSubjects).toBeDefined();
        expect(response.body.restOfSubjects.length).toBeGreaterThan(0);
        expect(response.body.restOfSubjects.every((s) => s.degree === user.level)).toEqual(true);
    }));
    test('should subscribe & unsubscribe student to & from given subject', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, user_1.generateUser)();
        const token = yield loginUser(user);
        const readSubjectsResponse1 = yield request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});
        expect(readSubjectsResponse1.status).toEqual(200);
        const subjectId = readSubjectsResponse1.body.restOfSubjects[0]._id;
        const subscribeResponse = yield request
            .post('/api/user/subject/subscribe')
            .set('authorization', `Bearer ${token}`)
            .send({ subject: { subjectId } });
        expect(subscribeResponse.status).toEqual(200);
        const readSubjectsResponse2 = yield request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});
        expect(readSubjectsResponse2.status).toEqual(200);
        // Check that student has exactly one subscribed subjects
        expect(readSubjectsResponse2.body.subjects).toBeDefined();
        expect(readSubjectsResponse2.body.subjects.length).toEqual(1);
        expect(readSubjectsResponse2.body.subjects[0]._id).toEqual(subjectId);
        const unsubscribeResponse = yield request
            .post('/api/user/subject/unsubscribe')
            .set('authorization', `Bearer ${token}`)
            .send({ subject: { subjectId } });
        expect(unsubscribeResponse.status).toEqual(200);
        const readSubjectsResponse3 = yield request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});
        expect(readSubjectsResponse3.status).toEqual(200);
        // Check that student has been successfully unsubscribed from a given subject
        expect(readSubjectsResponse3.body.subjects).toBeDefined();
        expect(readSubjectsResponse3.body.subjects.length).toEqual(0);
    }));
});
//# sourceMappingURL=User.integration.test.js.map