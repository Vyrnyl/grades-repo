"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddedCourseGrade = exports.updateStudentGrade = exports.getStudentRecords = exports.getStudentGrades = void 0;
const gradeDataAccess_1 = require("../data/gradeDataAccess");
const notificationDataAccess_1 = require("../data/notificationDataAccess");
const getStudentGrades = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const record = await (0, gradeDataAccess_1.getGrades)(req.user.userId);
    if (!record) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }
    res.status(200).json(record);
};
exports.getStudentGrades = getStudentGrades;
const getStudentRecords = async (req, res) => {
    const records = await (0, gradeDataAccess_1.getStudents)();
    if (!records) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }
    res.status(200).json(records);
};
exports.getStudentRecords = getStudentRecords;
const updateStudentGrade = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { userId, programId, courseCode, grade } = req.body;
    const updateGradeDetails = await (0, gradeDataAccess_1.updateGrade)(userId, programId, courseCode, grade);
    if (!updateGradeDetails) {
        return res.status(500).json({ error: 'Failed to update user grade' });
    }
    await (0, notificationDataAccess_1.addNotificationData)(userId, req.user.userId);
    res.status(201).json(updateGradeDetails);
};
exports.updateStudentGrade = updateStudentGrade;
//ADDED COURSE GRADES
const getAddedCourseGrade = async (req, res) => {
    if (!req.body.userId)
        return res.status(400).json({ error: 'Invalid Request Body' });
    const records = await (0, gradeDataAccess_1.getAddedCourseRecord)(req.body.userId);
    if (!records) {
        return res.status(500).json({ error: 'Failed to retrieve user grades' });
    }
    res.status(201).json(records);
};
exports.getAddedCourseGrade = getAddedCourseGrade;
