import { Request, Response } from "express";
import { addAddedCourse, assignNewUserCourse, deleteAddedCourse, getAddedCourses, getCoursesList, getProgramList, updateAddedCourse } from "../data/programDataAccess";


const getPrograms = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const getProgramResult = await getProgramList();

    if(!getProgramResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }

    res.status(200).json(getProgramResult);
}

const getCourses = async (req: Request, res: Response) => {

    const getCourseResult = await getCoursesList();

    if(!getCourseResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }
    
    res.status(200).json(getCourseResult);
}



//ADDED COURSES
const addCourse = async (req: Request, res: Response) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const addResult = await addAddedCourse(req.body);
    
    if(!addResult) {
        return res.status(404).json({ error: 'Failed to add' });
    }
    
    res.status(200).json(addResult);
}

const getAddedCourse = async (req: Request, res: Response) => {
    
    const courses = await getAddedCourses();

    if(!courses) return res.status(404).json({ error: 'Failed to retrieve' });

    res.status(200).json(courses);
}

const updateCourse = async (req: Request, res: Response) => {
    
    const updateClassResult = await updateAddedCourse(req.body);

    if(!updateClassResult) {
        return res.status(500).json({ error: "Failed to update class schedule"});
    }
    
    res.json({ message: "Update successful" });
}

const deleteCourse = async (req: Request, res: Response) => {

    const { id } = req.body;

    if(!id) {
        return res.status(422).json({ message: "Deletion error" });
    }

    const deleteResult = await deleteAddedCourse(id);

    if(!deleteResult) {
        return res.status(500).json({ error: "Failed to delete class schedule"});
    }
    
    res.json({ message: "Deletion successful" });

}

export { getPrograms, getCourses, addCourse, getAddedCourse, updateCourse, deleteCourse }