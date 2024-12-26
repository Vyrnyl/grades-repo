import { Request, Response } from "express";
import { addHandledCourse, addSpecialization, getHandledCourse, getSpecialization } from "../data/facultyDataAccess";

const addHandled = async (req: Request, res: Response) => {

    const addResult = await addHandledCourse(req.body.data);
    
    if(!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    
    res.status(200).json(addResult);
}

const getHandled = async (req: Request, res: Response) => {

    const courses = await getHandledCourse(req.body.userId);
    
    if(!courses) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(courses);
}



const addFacultySpecialization = async (req: Request, res: Response) => {

    const addResult = await addSpecialization(req.body.data);
    
    if(!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    
    res.status(200).json(addResult);
}

const getFacultySpecialization = async (req: Request, res: Response) => {

    const programs = await getSpecialization(req.body.userId);

    if(!programs) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(programs);
}

export { addHandled, getHandled, addFacultySpecialization, getFacultySpecialization }