"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActivity = exports.getActivity = void 0;
const activityDataAccess_1 = require("../data/activityDataAccess");
const getActivity = async (req, res) => {
    const getActivityResult = await (0, activityDataAccess_1.getLoginActivity)();
    if (!getActivityResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getActivityResult);
};
exports.getActivity = getActivity;
const addActivity = async (req, res) => {
    const addActivityResult = await (0, activityDataAccess_1.addLoginActivity)(req.body);
    if (!addActivityResult) {
        return res.status(500).json({ error: "Failed to create class schedule" });
    }
    res.status(200).json(addActivityResult);
};
exports.addActivity = addActivity;
