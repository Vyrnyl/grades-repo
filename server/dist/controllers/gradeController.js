"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentGrade = void 0;
const validationErrorHandler_1 = __importDefault(require("../utils/validationErrorHandler"));
const gradeValidator_1 = require("../validators/gradeValidator");
const gradeDataAccess_1 = require("../data/gradeDataAccess");
const updateStudentGrade = async (req, res) => {
    const { error, value } = (0, gradeValidator_1.validateGradeUpdate)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    const { userId, programId, courseId, grade } = value;
    const updateGradeDetails = await (0, gradeDataAccess_1.updateGrade)(userId, programId, courseId, grade);
    if (!updateGradeDetails) {
        return res.status(500).json({ error: 'Failed to update user grade' });
    }
    res.status(200).json(updateGradeDetails);
};
exports.updateStudentGrade = updateStudentGrade;
