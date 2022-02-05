import app from "../src/app";
import * as supertest from "supertest";
import { generateUser } from "./utils/user";

// @ts-ignore
const request = supertest.default(app);

const loginUser = async (user: any): Promise<string> => {
    const registerResponse = await request.post('/auth-api/register').send(user);
    expect(registerResponse.status).toEqual(201);
    const loginResponse = await request.post('/auth-api/login').send({
        email: user.email,
        password: user.password
    });
    expect(loginResponse.status).toEqual(200);
    return loginResponse.body.token;
};

describe('User controller', () => {
    test('should only return subject same to user`s programme level', async () => {
        const user = generateUser();
        const token = await loginUser(user);

        const response = await request
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
        expect(response.body.restOfSubjects.every((s: any) => s.degree === user.level)).toEqual(true);
    });
});
