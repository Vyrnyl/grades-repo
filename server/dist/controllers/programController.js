"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = exports.getPrograms = void 0;
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
