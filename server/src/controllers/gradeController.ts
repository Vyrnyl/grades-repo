import { Request, Response } from "express";
import { getAddedCourseRecord, getGrades, getRecords, getStudents, updateGrade } from "../data/gradeDataAccess";
import { addNotificationData } from "../data/notificationDataAccess";

const getStudentGrades = async (req: Request, res: Response) => {
    
    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const record = await getGrades(req.user.userId);
    
    if(!record) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }
    
    res.status(200).json(record);
}

const getStudentRecords = async (req: Request, res: Response) => {

    const records = await getStudents();
    
    if(!records) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }
    
    res.status(200).json(records);
}

const updateStudentGrade = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { userId, programId, courseCode, grade } = req.body;
    
    const updateGradeDetails = await updateGrade(userId, programId, courseCode, grade);
    
    if(!updateGradeDetails) {
        return res.status(500).json({ error: 'Failed to update user grade' });
    }

    await addNotificationData(userId, req.user.userId);

    res.status(201).json(updateGradeDetails);
};




//ADDED COURSE GRADES
const getAddedCourseGrade = async (req: Request, res: Response) => {

    if(!req.body.userId) return res.status(400).json({ error: 'Invalid Request Body' });
    const records = await getAddedCourseRecord(req.body.userId);

    if(!records) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }

    res.status(201).json(records);
}



export { getStudentGrades, getStudentRecords, updateStudentGrade, getAddedCourseGrade };