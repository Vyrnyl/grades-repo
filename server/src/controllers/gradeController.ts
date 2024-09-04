import { Request, Response } from "express";
import validationErrorHandler from "../utils/validationErrorHandler";
import { validateGradeUpdate } from "../validators/gradeValidator";
import { updateGrade } from "../data/gradeDataAccess";


const updateStudentGrade = async (req: Request, res: Response) => {

    const { error, value } = validateGradeUpdate(req.body);

    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    const { userId, programId, courseId, grade } = value;
    
    const updateGradeDetails = await updateGrade(userId, programId, courseId, grade);

    if(!updateGradeDetails) {
        return res.status(500).json({ error: 'Failed to update user grade' });
    }

    res.status(200).json(updateGradeDetails);
};

export { updateStudentGrade };