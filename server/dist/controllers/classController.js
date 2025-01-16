"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.addClass = exports.getClasses = void 0;
const classDataAccess_1 = require("../data/classDataAccess");
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
    // const { error, value } = validateClass(req.body);
    // if(error) {
    //     const err = validationErrorHandler(error);
    //     return res.status(422).json(err);
    // }
    const { userId } = req.user;
    const addClassResult = await (0, classDataAccess_1.addClassSched)(userId, req.body);
    if (!addClassResult) {
        return res.status(500).json({ error: "Failed to create class schedule" });
    }
    res.status(201).json({ message: "Class added", addedData: addClassResult });
};
exports.addClass = addClass;
const updateClass = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // const { error, value } = validateClass(req.body);
    // if(error) {
    //     const err = validationErrorHandler(error);
    //     return res.status(422).json(err);
    // }
    const { userId } = req.user;
    const updateClassResult = await (0, classDataAccess_1.updateClassSched)(userId, req.body);
    if (!updateClassResult) {
        return res.status(500).json({ error: "Failed to update class schedule" });
    }
    res.json({ message: "Update successful" });
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { classId } = req.body;
    if (!classId) {
        return res.status(422).json({ message: "Deletion error" });
    }
    const { userId } = req.user;
    const deletedClassResult = await (0, classDataAccess_1.deleteClassSched)(userId, classId);
    if (!deletedClassResult) {
        return res.status(500).json({ error: "Failed to delete class schedule" });
    }
    res.json({ message: "Deletion successful" });
};
exports.deleteClass = deleteClass;
