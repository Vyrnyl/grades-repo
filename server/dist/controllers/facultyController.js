"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyProgramYear = exports.getFacultyProgramYears = exports.getFacultyProgramYear = exports.addFacultyProgramYear = exports.updateFacultySpecialization = exports.getFacultySpecialization = exports.addFacultySpecialization = exports.updateHandled = exports.getAllHandled = exports.getHandled = exports.addHandled = void 0;
const facultyDataAccess_1 = require("../data/facultyDataAccess");
//COURSES
const addHandled = async (req, res) => {
    const addResult = await (0, facultyDataAccess_1.addHandledCourse)(req.body.data);
    if (!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    res.status(200).json(addResult);
};
exports.addHandled = addHandled;
const getHandled = async (req, res) => {
    const courses = await (0, facultyDataAccess_1.getHandledCourse)(req.body.userId);
    if (!courses)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(courses);
};
exports.getHandled = getHandled;
const getAllHandled = async (req, res) => {
    const courses = await (0, facultyDataAccess_1.getHandledCourses)();
    if (!courses)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(courses);
};
exports.getAllHandled = getAllHandled;
const updateHandled = async (req, res) => {
    const { data, userId } = req.body;
    const courses = await (0, facultyDataAccess_1.updateHandledCourse)(data, userId);
    if (!courses)
        return res.status(404).json({ error: 'Failed to update' });
    res.status(200).json(courses);
};
exports.updateHandled = updateHandled;
//SPECIALIZATION
const addFacultySpecialization = async (req, res) => {
    const addResult = await (0, facultyDataAccess_1.addSpecialization)(req.body.data);
    if (!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    res.status(200).json(addResult);
};
exports.addFacultySpecialization = addFacultySpecialization;
const getFacultySpecialization = async (req, res) => {
    const programs = await (0, facultyDataAccess_1.getSpecialization)(req.body.userId);
    if (!programs)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(programs);
};
exports.getFacultySpecialization = getFacultySpecialization;
const updateFacultySpecialization = async (req, res) => {
    const { data, userId } = req.body;
    const programs = await (0, facultyDataAccess_1.updateSpecialization)(data, userId);
    if (!programs)
        return res.status(404).json({ error: 'Failed to update' });
    res.status(200).json(programs);
};
exports.updateFacultySpecialization = updateFacultySpecialization;
//PROGRAM YEAR
const addFacultyProgramYear = async (req, res) => {
    const addResult = await (0, facultyDataAccess_1.addProgramYear)(req.body.data);
    if (!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    res.status(200).json(addResult);
};
exports.addFacultyProgramYear = addFacultyProgramYear;
const getFacultyProgramYear = async (req, res) => {
    const programYear = await (0, facultyDataAccess_1.getProgramYear)(req.body.userId);
    if (!programYear)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(programYear);
};
exports.getFacultyProgramYear = getFacultyProgramYear;
const getFacultyProgramYears = async (req, res) => {
    const programYears = await (0, facultyDataAccess_1.getProgramYears)();
    if (!programYears)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(programYears);
};
exports.getFacultyProgramYears = getFacultyProgramYears;
const updateFacultyProgramYear = async (req, res) => {
    const { data, userId } = req.body;
    const programYear = await (0, facultyDataAccess_1.updateProgramYear)(data, userId);
    if (!programYear)
        return res.status(404).json({ error: 'Failed to update' });
    res.status(200).json(programYear);
};
exports.updateFacultyProgramYear = updateFacultyProgramYear;
