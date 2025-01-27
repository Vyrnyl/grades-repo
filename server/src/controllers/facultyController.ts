import { Request, Response } from "express";
import { addHandledCourse, addProgramYear, addSpecialization, getHandledCourse, getHandledCourses, getProgramYear, getProgramYears, getSpecialization, updateHandledCourse, updateProgramYear, updateSpecialization } from "../data/facultyDataAccess";


//COURSES
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

const getAllHandled = async (req: Request, res: Response) => {

    const courses = await getHandledCourses();
    
    if(!courses) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(courses);
}

const updateHandled = async (req: Request, res: Response) => {
    
    const { data, userId } = req.body;
    const courses = await updateHandledCourse(data, userId)
    
    if(!courses) return res.status(404).json({ error: 'Failed to update' });

    res.status(200).json(courses);
}


//SPECIALIZATION
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

const updateFacultySpecialization = async (req: Request, res: Response) => {
    
    const { data, userId } = req.body;
    
    const programs = await updateSpecialization(data, userId)

    if(!programs) return res.status(404).json({ error: 'Failed to update' });

    res.status(200).json(programs);
}


//PROGRAM YEAR
const addFacultyProgramYear = async (req: Request, res: Response) => {

    const addResult = await addProgramYear(req.body.data);
    
    if(!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    
    res.status(200).json(addResult);
}

const getFacultyProgramYear = async (req: Request, res: Response) => {

    const programYear = await getProgramYear(req.body.userId);

    if(!programYear) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(programYear);
}

const getFacultyProgramYears = async (req: Request, res: Response) => {

    const programYears = await getProgramYears();

    if(!programYears) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(programYears);
}

const updateFacultyProgramYear = async (req: Request, res: Response) => {

    const { data, userId } = req.body;
    
    const programYear = await updateProgramYear(data, userId)

    if(!programYear) return res.status(404).json({ error: 'Failed to update' });

    res.status(200).json(programYear);

}

export { 
    addHandled, 
    getHandled,
    getAllHandled,
    updateHandled,
    
    addFacultySpecialization, 
    getFacultySpecialization,
    updateFacultySpecialization,

    addFacultyProgramYear,
    getFacultyProgramYear,
    getFacultyProgramYears,
    updateFacultyProgramYear
}