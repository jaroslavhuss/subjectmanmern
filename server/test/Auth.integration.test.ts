import app from "../src/app";
import * as supertest from "supertest";

// @ts-ignore
const request = supertest.default(app);

describe('Auth controller', () => {
    test('should return an error in case of wrong request body', async () => {
        const response = await request.post('/auth-api/register').send({});
        expect(response.status).toEqual(400);
    });
});
