"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getAddedCourse = exports.addCourse = exports.getCourses = exports.getPrograms = void 0;
const programDataAccess_1 = require("../data/programDataAccess");
const getPrograms = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const getProgramResult = await (0, programDataAccess_1.getProgramList)();
    if (!getProgramResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getProgramResult);
};
exports.getPrograms = getPrograms;
const getCourses = async (req, res) => {
    const getCourseResult = await (0, programDataAccess_1.getCoursesList)();
    if (!getCourseResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getCourseResult);
};
exports.getCourses = getCourses;
//ADDED COURSES
const addCourse = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const addResult = await (0, programDataAccess_1.addAddedCourse)(req.body);
    if (!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    res.status(200).json(addResult);
};
exports.addCourse = addCourse;
const getAddedCourse = async (req, res) => {
    const courses = await (0, programDataAccess_1.getAddedCourses)();
    if (!courses)
        return res.status(404).json({ error: 'Failed to retrieve' });
    res.status(200).json(courses);
};
exports.getAddedCourse = getAddedCourse;
const updateCourse = async (req, res) => {
    const updateClassResult = await (0, programDataAccess_1.updateAddedCourse)(req.body);
    if (!updateClassResult) {
        return res.status(500).json({ error: "Failed to update class schedule" });
    }
    res.json({ message: "Update successful" });
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(422).json({ message: "Deletion error" });
    }
    const deleteResult = await (0, programDataAccess_1.deleteAddedCourse)(id);
    if (!deleteResult) {
        return res.status(500).json({ error: "Failed to delete class schedule" });
    }
    res.json({ message: "Deletion successful" });
};
exports.deleteCourse = deleteCourse;
