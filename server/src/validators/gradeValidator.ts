import Joi from 'joi';

const gradeUpdateSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
        'number.base': 'User ID must be a type of number',
        'number.empty': 'User ID cannot be empty',
        'any.required': 'User ID cannot be empty'
    }),
    programId: Joi.number().integer().required().messages({
        'number.base': 'Program ID must be a type of number',
        'number.empty': 'Program ID cannot be empty',
        'any.required': 'Program ID cannot be empty'
    }),
    courseId: Joi.number().integer().required().messages({
        'number.base': 'Course ID must be a type of number',
        'number.empty': 'Course ID cannot be empty',
        'any.required': 'Course ID cannot be empty'
    }),
    grade: Joi.number().precision(2).required().messages({
        'number.base': 'Grade must be a type of number',
        'number.empty': 'Grade cannot be empty',
        'number.precision': 'Grade can have up to 2 decimal places',
        'any.required': 'Grade cannot be empty'
    })
});

const validateGradeUpdate = (payload: { userId: number, courseId: number, grade: number }) => {
    return gradeUpdateSchema.validate(payload, { abortEarly: false });
}

export { validateGradeUpdate };