import { ValidationError } from "joi";

const validationErrorHandler = (error: ValidationError) => {
    const err = error.details.map(e => {
        return { path: e.path[0], message: e.message };
    });
    return err;
}

export default validationErrorHandler;