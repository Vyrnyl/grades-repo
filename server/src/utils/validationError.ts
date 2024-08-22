import { ValidationError } from "joi";

const validationError = (error: ValidationError) => {
    const err = error.details.map(e => {
        return { path: e.path[0], message: e.message };
    });
    return err;
}

export default validationError;