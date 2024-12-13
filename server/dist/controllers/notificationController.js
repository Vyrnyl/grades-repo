"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = void 0;
const notificationDataAccess_1 = require("../data/notificationDataAccess");
const getNotifications = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const notif = await (0, notificationDataAccess_1.getNotificationData)(req.user.userId);
    if (!notif) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    res.status(200).json(notif);
};
exports.getNotifications = getNotifications;
