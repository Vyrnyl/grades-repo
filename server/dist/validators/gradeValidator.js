"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGradeUpdate = void 0;
const joi_1 = __importDefault(require("joi"));
const gradeUpdateSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().required().messages({
        'number.base': 'User ID must be a type of number',
        'number.empty': 'User ID cannot be empty',
        'any.required': 'User ID cannot be empty'
    }),
    programId: joi_1.default.number().integer().required().messages({
        'number.base': 'Program ID must be a type of number',
        'number.empty': 'Program ID cannot be empty',
        'any.required': 'Program ID cannot be empty'
    }),
    courseId: joi_1.default.number().integer().required().messages({
        'number.base': 'Course ID must be a type of number',
        'number.empty': 'Course ID cannot be empty',
        'any.required': 'Course ID cannot be empty'
    }),
    grade: joi_1.default.number().precision(2).required().messages({
        'number.base': 'Grade must be a type of number',
        'number.empty': 'Grade cannot be empty',
        'number.precision': 'Grade can have up to 2 decimal places',
        'any.required': 'Grade cannot be empty'
    })
});
const validateGradeUpdate = (payload) => {
    return gradeUpdateSchema.validate(payload, { abortEarly: false });
};
exports.validateGradeUpdate = validateGradeUpdate;
