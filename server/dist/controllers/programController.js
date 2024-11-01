"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrograms = void 0;
const programDataAccess_1 = require("../data/programDataAccess");
const getPrograms = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const getPRogramResult = await (0, programDataAccess_1.getProgramList)();
    if (!getPRogramResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getPRogramResult);
};
exports.getPrograms = getPrograms;
