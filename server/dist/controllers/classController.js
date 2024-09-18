"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.addClass = exports.getClasses = void 0;
const classValidator_1 = require("../validators/classValidator");
const classDataAccess_1 = require("../data/classDataAccess");
const validationErrorHandler_1 = __importDefault(require("../utils/validationErrorHandler"));
const getClasses = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const getClassesResult = await (0, classDataAccess_1.getClassesSched)(req.user.userId);
    if (!getClassesResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getClassesResult);
};
exports.getClasses = getClasses;
const addClass = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { error, value } = (0, classValidator_1.validateClass)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    const { userId } = req.user;
    const addClassResult = await (0, classDataAccess_1.addClassSched)(userId, value);
    if (!addClassResult) {
        return res.status(500).json({ error: "Failed to create class schedule" });
    }
    res.status(201).json({ mess: "Class added" });
};
exports.addClass = addClass;
const updateClass = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { error, value } = (0, classValidator_1.validateClass)(req.body);
    if (error) {
        const err = (0, validationErrorHandler_1.default)(error);
        return res.status(422).json(err);
    }
    const { userId } = req.user;
    const updateClassResult = await (0, classDataAccess_1.updateClassSched)(userId, value);
    if (!updateClassResult) {
        return res.status(500).json({ error: "Failed to update class schedule" });
    }
    res.json({ mess: "Update successful" });
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { classId } = req.body;
    if (!classId) {
        return res.status(422).json({ mess: "Deletion error" });
    }
    const { userId } = req.user;
    const deletedClassResult = await (0, classDataAccess_1.deleteClassSched)(userId, classId);
    if (!deletedClassResult) {
        return res.status(500).json({ error: "Failed to delete class schedule" });
    }
    res.json({ mess: "Deletion successful" });
};
exports.deleteClass = deleteClass;
