"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessions = exports.getFacultyActivity = exports.getAdminActivity = exports.getActivity = void 0;
const activityDataAccess_1 = require("../data/activityDataAccess");
const getActivity = async (req, res) => {
    const getActivityResult = await (0, activityDataAccess_1.getLoginActivity)();
    if (!getActivityResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getActivityResult);
};
exports.getActivity = getActivity;
// const addActivity = async (req: Request, res: Response) => {
//     const addActivityResult = await addLoginActivity(req.body.email);
//     if(!addActivityResult) {
//         return res.status(500).json({ error: "Failed to create"});
//     }
//     res.status(200).json(addActivityResult);
// }
//RECENT ACTIVITY
const getAdminActivity = async (req, res) => {
    const getActivityResult = await (0, activityDataAccess_1.getAdminRecentActivity)();
    if (!getActivityResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(getActivityResult);
};
exports.getAdminActivity = getAdminActivity;
const getFacultyActivity = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { userId } = req.user;
    const activities = await (0, activityDataAccess_1.getFacultyRecentActivity)(userId);
    if (!activities) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(activities);
};
exports.getFacultyActivity = getFacultyActivity;
//LOGIN SESSION
const getSessions = async (req, res) => {
    const sessions = await (0, activityDataAccess_1.getLoginSession)();
    if (!sessions) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(sessions);
};
exports.getSessions = getSessions;
