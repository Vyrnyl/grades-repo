import Joi, { ValidationResult} from 'joi';
import { SignupPayload, LoginPayload, UserUpdatePayload } from '../types/types';

const signupSchema = Joi.object({
    firstName: Joi.string().max(50).required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name should be a type of text',
        'string.max': 'First name cannot exceed 50 characters'
    }),
    lastName: Joi.string().max(50).required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name should be a type of text',
        'string.max': 'Last name cannot exceed 50 characters'
    }),
    email: Joi.string().email({ tlds: { allow: false }}).required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be atleast 6 characters long',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'Confirm Password cannot be empty',
        'any.only': "Password don't match"
    }),
    // sex: Joi.string().required().messages({
    //     'string.empty': 'Sex cannot be empty'
    // }),
    role: Joi.string().required().messages({
        'string.empty': 'Please select role'
    }),
    // studentId: Joi.string().max(10).when('role', {
    //     is: 'student',
    //     then: Joi.required().messages({
    //         'string.empty': 'Student ID cannot be empty',
    //         'string.max': 'Student ID must be at most 10'
    //     }),
    //     otherwise: Joi.forbidden()
    // }),
    // yearLevel: Joi.number().integer().max(5).when('role', {
    //     is: 'student',
    //     then: Joi.required().messages({
    //         'number.base': 'Year level must be a type of number',
    //         'number.max': 'Year level must be at most 5',
    //         'number.empty': 'Year level cannot be empty',
    //         'any.required': 'Year level cannot be empty'
    //     }),
    //     otherwise: Joi.forbidden()
    // }),
    // programId: Joi.number().integer().max(10).when('role', {
    //     is: 'student',
    //     then: Joi.required().messages({
    //         'any.required': 'Program ID cannot be empty',
    //         'number.empty': 'Program ID cannot be empty',
    //         'number.max': 'Program ID must be at most 10'
    //     })
    // })
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
    return loginSchema.validate(payload, { abortEarly: false });
}

export { validateSignup, validateLogin };