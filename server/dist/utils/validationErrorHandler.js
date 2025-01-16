"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationErrorHandler = (error) => {
    const err = error.details.map(e => {
        return { path: e.path[0], message: e.message };
    });
    return err;
};
exports.default = validationErrorHandler;
