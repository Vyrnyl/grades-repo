import { Request, Response } from "express";
import { addNotificationData, getNotificationData } from "../data/notificationDataAccess";

const getNotifications = async (req: Request, res: Response) => {
    
    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const notif = await getNotificationData(req.user.userId);
    
    if(!notif) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }

    res.status(200).json(notif);
}


export { getNotifications };