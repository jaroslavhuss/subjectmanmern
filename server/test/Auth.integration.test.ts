import app from "../src/app";
import * as supertest from "supertest";
// @ts-ignore
import faker from "community-faker";

// @ts-ignore
const request = supertest.default(app);

const generateUser = () => {
    const gender = faker.name.gender();
    const name = faker.name.firstName(gender);
    const surname = faker.name.lastName(gender);
    const language = faker.datatype.boolean() ? 'en' : 'cz';
    const password = 'randomP@ssword6';
    const form = faker.datatype.boolean() ? 'daily' : 'distant';
    const level = faker.datatype.boolean() ? 'Bc.' : 'Ing.';
    const email = faker.internet.email(name, surname);
    return {
        name, surname, form, level, language, email, password
    };
};

describe('Auth controller', () => {
    beforeAll(() => {
        faker.locale = 'en';
    });

    test('should return an error in case of wrong request body', async () => {
        const response = await request.post('/auth-api/register').send({});
        expect(response.status).toEqual(400);
    });

    test('should return an error in case of weak password', async () => {
        const user1 = generateUser();
        user1.password = 'weakPassword';
        const user2 = generateUser();
        user2.password = 'weakPassword6';
        const user3 = generateUser();
        user3.password = 'weakPassword$';

        const response1 = await request.post('/auth-api/register').send(user1);
        expect(response1.status).toEqual(400);

        const response2 = await request.post('/auth-api/register').send(user2);
        expect(response2.status).toEqual(400);

        const response3 = await request.post('/auth-api/register').send(user3);
        expect(response3.status).toEqual(400);
    });

    test('should successfully register new user', async () => {
        const response = await request.post('/auth-api/register').send(generateUser());
        expect(response.status).toEqual(201);
    });

    test('should not login user with given wrong credentials', async () => {
        const user = generateUser();
        // Register user
        const registerResponse = await request.post('/auth-api/register').send(user);
        expect(registerResponse.status).toEqual(201);
        // Login user
        const loginResponse = await request.post('/auth-api/login').send({
            email: user.email,
            password: 'wrong_password'
        });
        expect(loginResponse.status).toEqual(401);
    });

    test('should successfully login given user', async () => {
        const user = generateUser();
        // Register user
        const registerResponse = await request.post('/auth-api/register').send(user);
        expect(registerResponse.status).toEqual(201);
        // Login user
        const loginResponse = await request.post('/auth-api/login').send({
            email: user.email,
            password: user.password
        });
        expect(loginResponse.status).toEqual(200);
        expect(loginResponse.body.token).toBeDefined();
        expect(typeof loginResponse.body.token).toEqual('string');
    });
});
