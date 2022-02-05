"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUser = void 0;
// @ts-ignore
const community_faker_1 = __importDefault(require("community-faker"));
beforeAll(() => {
    community_faker_1.default.locale = 'en';
});
const generateUser = () => {
    const gender = community_faker_1.default.name.gender();
    const name = community_faker_1.default.name.firstName(gender);
    const surname = community_faker_1.default.name.lastName(gender);
    const language = community_faker_1.default.datatype.boolean() ? 'en' : 'cz';
    const password = 'randomP@ssword6';
    const form = community_faker_1.default.datatype.boolean() ? 'daily' : 'distant';
    const level = community_faker_1.default.datatype.boolean() ? 'Bc.' : 'Ing.';
    const email = community_faker_1.default.internet.email(name, surname);
    return {
        name, surname, form, level, language, email, password
    };
};
exports.generateUser = generateUser;
//# sourceMappingURL=user.js.map