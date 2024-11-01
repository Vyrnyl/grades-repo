import { Request, Response } from "express";
import { getProgramList } from "../data/programDataAccess";


const getPrograms = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const getPRogramResult = await getProgramList();

    if(!getPRogramResult) {
        return res.status(404).json({ error: 'Failed to retrieve' });
    }

    res.status(200).json(getPRogramResult);
}

export { getPrograms }