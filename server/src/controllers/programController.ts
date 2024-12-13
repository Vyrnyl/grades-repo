import { Request, Response } from "express";
import { getCoursesList, getProgramList } from "../data/programDataAccess";


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

export { getPrograms, getCourses }