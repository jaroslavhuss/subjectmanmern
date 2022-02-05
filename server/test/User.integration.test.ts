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

    test('should subscribe & unsubscribe student to & from given subject', async () => {
        const user = generateUser();
        const token = await loginUser(user);

        const readSubjectsResponse1 = await request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});

        expect(readSubjectsResponse1.status).toEqual(200);

        const subjectId = readSubjectsResponse1.body.restOfSubjects[0]._id;

        const subscribeResponse = await request
            .post('/api/user/subject/subscribe')
            .set('authorization', `Bearer ${token}`)
            .send({ subject: { subjectId }});

        expect(subscribeResponse.status).toEqual(200);

        const readSubjectsResponse2 = await request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});

        expect(readSubjectsResponse2.status).toEqual(200);

        // Check that student has exactly one subscribed subjects
        expect(readSubjectsResponse2.body.subjects).toBeDefined();
        expect(readSubjectsResponse2.body.subjects.length).toEqual(1);
        expect(readSubjectsResponse2.body.subjects[0]._id).toEqual(subjectId);

        const unsubscribeResponse = await request
            .post('/api/user/subject/unsubscribe')
            .set('authorization', `Bearer ${token}`)
            .send({ subject: { subjectId }});

        expect(unsubscribeResponse.status).toEqual(200);

        const readSubjectsResponse3 = await request
            .post('/api/user/subject/read')
            .set('authorization', `Bearer ${token}`)
            .send({});

        expect(readSubjectsResponse3.status).toEqual(200);

        // Check that student has been successfully unsubscribed from a given subject
        expect(readSubjectsResponse3.body.subjects).toBeDefined();
        expect(readSubjectsResponse3.body.subjects.length).toEqual(0);
    });
});
