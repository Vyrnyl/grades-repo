import { Request, Response } from "express";
import { getLoginActivity, getAdminRecentActivity } from "../data/activityDataAccess";

const getActivity = async (req: Request, res: Response) => {

    const getActivityResult = await getLoginActivity();
    
    if(!getActivityResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }

    res.status(200).json(getActivityResult);
}


// const addActivity = async (req: Request, res: Response) => {


//     const addActivityResult = await addLoginActivity(req.body.email);

//     if(!addActivityResult) {
//         return res.status(500).json({ error: "Failed to create"});
//     }

//     res.status(200).json(addActivityResult);
// }




//RECENT ACTIVITY

const getAdminActivity = async (req: Request, res: Response) => {

    const getActivityResult = await getAdminRecentActivity();
    
    if(!getActivityResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }

    res.status(200).json(getActivityResult);
}

export { getActivity, getAdminActivity }