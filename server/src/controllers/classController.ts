import { Request, Response } from "express";
import { validateClass } from "../validators/classValidator";
import { addClassSched, getClassesSched } from "../data/classDataAccess";
import validationErrorHandler from "../utils/validationErrorHandler";

const getClasses = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const getClassesResult = await getClassesSched(req.user.userId);

    if(!getClassesResult) {
        return res.status(404).json({ error: 'Classes not found' });
    }

    res.status(200).json(getClassesResult);
}


const addClass = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error, value } = validateClass(req.body);

    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    const { userId } = req.user;
    const addClassResult = await addClassSched(userId, value);

    if(!addClassResult) {
        return res.status(500).json({ error: "Failed to create class schedule"});
    }

    res.status(201).json(addClassResult);
}

export { getClasses, addClass };