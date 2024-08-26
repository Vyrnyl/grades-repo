"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().max(50).required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name should be a type of text',
        'string.max': 'First name cannot exceed 50 characters'
    }),
    lastName: joi_1.default.string().max(50).required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name should be a type of text',
        'string.max': 'Last name cannot exceed 50 characters'
    }),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be atleast 6 characters long',
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
        'string.empty': 'Confirm Password cannot be empty',
        'any.only': 'Password do not match'
    }),
    sex: joi_1.default.string().required().messages({
        'string.empty': 'Sex cannot be empty'
    }),
    role: joi_1.default.string().valid('student', 'professor', 'admin').required().messages({
        'string.empty': 'Role cannot be empty'
    }),
    studentId: joi_1.default.string().max(10).when('role', {
        is: 'student',
        then: joi_1.default.required().messages({
            'string.empty': 'Student ID cannot be empty',
            'string.max': 'Student ID must be at most 10'
        }),
        otherwise: joi_1.default.forbidden()
    }),
    yearLevel: joi_1.default.number().integer().max(5).when('role', {
        is: 'student',
        then: joi_1.default.required().messages({
            'number.base': 'Year level must be a type of number',
            'number.max': 'Year level must be at most 5',
            'number.empty': 'Year level cannot be empty',
            'any.required': 'Year level cannot be empty'
        }),
        otherwise: joi_1.default.forbidden()
    }),
    programId: joi_1.default.number().integer().max(10).when('role', {
        is: 'student',
        then: joi_1.default.required().messages({
            'any.required': 'Program ID cannot be empty',
            'number.empty': 'Program ID cannot be empty',
            'number.max': 'Program ID must be at most 10'
        })
    })
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email({ tlds: { allow: false } }).messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: joi_1.default.string().required().messages({
        'string.empty': 'Password cannot be empty',
    })
});
const userUpdateSchema = joi_1.default.object({
    firstName: joi_1.default.string().max(50).required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name should be a type of text',
        'string.max': 'First Name cannot exceed 50 characters'
    }),
    lastName: joi_1.default.string().max(50).required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name should be a type of text',
        'string.max': 'Last Name cannot exceed 50 characters'
    }),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be atleast 6 characters long',
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
        'string.empty': 'Confirm Password cannot be empty',
        'any.only': 'Password do not match'
    }),
    sex: joi_1.default.string().max(10).required().messages({
        'string.empty': 'Sex cannot be empty',
        'string.max': 'Sex cannot exceed 10 characters'
    }),
    studentId: joi_1.default.string().max(10).messages({
        'string.empty': 'Student ID cannot be empty',
        'string.max': 'Student ID must be at most 10'
    }),
    yearLevel: joi_1.default.number().integer().max(5).messages({
        'number.base': 'Year level must be a type of number',
        'number.max': 'Year level must be at most 5',
        'number.empty': 'Year level cannot be empty',
        'any.required': 'Year level cannot be empty'
    })
});
const validateSignup = (payload) => {
    return signupSchema.validate(payload, { abortEarly: false });
};
exports.validateSignup = validateSignup;
const validateLogin = (payload) => {
    return loginSchema.validate(payload, { abortEarly: false });
};
exports.validateLogin = validateLogin;
const validateUserUpdate = (payload) => {
    return userUpdateSchema.validate(payload, { abortEarly: false });
    ;
};
exports.validateUserUpdate = validateUserUpdate;
