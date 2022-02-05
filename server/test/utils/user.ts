// @ts-ignore
import faker from "community-faker";

beforeAll(() => {
    faker.locale = 'en';
});

export const generateUser = () => {
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
