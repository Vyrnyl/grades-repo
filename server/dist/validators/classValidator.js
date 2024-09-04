"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClass = void 0;
const joi_1 = __importDefault(require("joi"));
const classSchema = joi_1.default.object({
    courseCode: joi_1.default.string().max(10).required().messages({
        'string.empty': 'Course Code cannot be empty',
        'string.max': 'Course Code must be at most 10',
        'any.required': 'User ID cannot be empty'
    }),
    day: joi_1.default.string().max(10).required().messages({
        'string.empty': 'Day cannot be empty',
        'string.max': 'Day must be at most 10',
        'any.required': 'Day cannot be empty'
    }),
    time: joi_1.default.string().required().messages({
        'string.empty': 'Time cannot be empty',
        'any.required': 'Time cannot be empty'
    }),
    room: joi_1.default.string().required().messages({
        'string.empty': 'Room cannot be empty',
        'any.required': 'Room cannot be empty'
    })
});
const validateClass = (payload) => {
    return classSchema.validate(payload, { abortEarly: false });
};
exports.validateClass = validateClass;
