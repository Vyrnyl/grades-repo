"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultySpecialization = exports.addFacultySpecialization = exports.getHandled = exports.addHandled = void 0;
const facultyDataAccess_1 = require("../data/facultyDataAccess");
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
