"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectValidator = void 0;
const express_validator_1 = require("express-validator");
const SubjectValidator = () => {
    return (0, express_validator_1.checkSchema)({
        credits: {
            exists: true,
            isInt: true,
            toInt: true,
            errorMessage: "Credits must be a number and not empty",
        },
        degree: {
            exists: true,
            isString: true,
            matches: {
                options: [/\b(?:Bc.|Mgr.|Ing.)\b/],
                errorMessage: "Must be 'Bc.','Mgr.','Ing.'",
            },
            errorMessage: "Degree is Missing",
        },
        forms: {
            exists: true,
            isArray: true,
            errorMessage: "Forms are missing - daily, distant",
        },
        links: {
            exists: true,
            isArray: true,
            errorMessage: "Links are missing - at least one link has to be present",
        },
        severity: {
            exists: true,
            isString: true,
            matches: {
                options: [/\b(?:compulsory|compulsory_optional|optional)\b/],
                errorMessage: "Must be 'compulsory', 'compulsory_optional','optional'",
            },
            errorMessage: "Severity is missing is Missing",
        },
        topics: {
            exists: true,
            isArray: true,
            errorMessage: "Topics are missing",
        },
        tutors: {
            exists: true,
            isArray: true,
            errorMessage: "Tutors are missing",
        },
        languages: {
            isObject: true,
            exists: true,
            errorMessage: "Languages are missing",
        },
    });
};
exports.SubjectValidator = SubjectValidator;
//# sourceMappingURL=SubjectValidation.js.map