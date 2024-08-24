import Joi, { ValidationResult} from 'joi';
import { SignupPayload, LoginPayload } from '../types/types';

const signupSchema = Joi.object({
    firstName: Joi.string().max(50).required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name should be a type of text'
    }),
    lastName: Joi.string().max(50).required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name should be a type of text'
    }),
    email: Joi.string().email({ tlds: { allow: false }}).required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be atleast 6 characters long'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'Confirm Password cannot be empty',
        'any.only': 'Password do not match'
    }),
    sex: Joi.string().required().messages({
        'string.empty': 'Sex cannot be empty'
    }),
    role: Joi.string().valid('student', 'professor', 'admin').required().messages({
        'string.empty': 'Role cannot be empty'
    }),
    studentId: Joi.string().when('role', {
        is: 'student',
        then: Joi.required().messages({
            'string.empty': 'Student ID cannot be empty'
        }),
        otherwise: Joi.forbidden()
    }),
    yearLevel: Joi.number().integer().when('role', {
        is: 'student',
        then: Joi.required().messages({
            'any.required': 'Year Level cannot be empty',
        }),
        otherwise: Joi.forbidden()
    }),
    programId: Joi.number().integer().when('role', {
        is: 'student',
        then: Joi.required().messages({
            'any.required': 'Program ID cannot be empty'
        })
    })
});

const loginSchema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false }}).messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
    })
});

const validateSignup = (payload: SignupPayload) => {
    return signupSchema.validate(payload, { abortEarly: false });
};

const validateLogin = (payload: LoginPayload) => {
    return loginSchema.validate(payload, { abortEarly: false });;
}

export { validateSignup, validateLogin };