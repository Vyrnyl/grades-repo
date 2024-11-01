import { Request, Response } from "express";
import { validateClass } from "../validators/classValidator";
import { addClassSched, deleteClassSched, getClassesSched, updateClassSched } from "../data/classDataAccess";
import validationErrorHandler from "../utils/validationErrorHandler";

const getClasses = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const getClassesResult = await getClassesSched(req.user.userId);
    
    if(!getClassesResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
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

    res.status(201).json({ mess: "Class added" });
}


const updateClass = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error, value } = validateClass(req.body);
    
    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    const { userId } = req.user;
    const updateClassResult = await updateClassSched(userId, value);

    if(!updateClassResult) {
        return res.status(500).json({ error: "Failed to update class schedule"});
    }
    
    res.json({ mess: "Update successful" });
}


const deleteClass = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { classId } = req.body;

    if(!classId) {
        return res.status(422).json({ message: "Deletion error" });
    }

    const { userId } = req.user;
    const deletedClassResult = await deleteClassSched(userId, classId);

    if(!deletedClassResult) {
        return res.status(500).json({ error: "Failed to delete class schedule"});
    }
    
    res.json({ message: "Deletion successful" });

}

export { getClasses, addClass, updateClass, deleteClass };