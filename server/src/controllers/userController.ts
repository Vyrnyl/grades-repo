import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "../data/userDataAccess";
import { getProgramName } from "../data/userUtils";

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {
    
    if(!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }
    
    const userDetails = await getUserById(req.user.userId);

    if(!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }

    const programId = userDetails.programId;
    if(!programId) {
        return res.json({ error: 'Program ID not found in user details' });
    }

    const programDetails = await getProgramName(programId);
    
    if(!programDetails) {
        return res.status(404).json({ error: 'Program not found' });
    }
    
    res.status(200).json({ userDetails, programDetails });
}

export { getUser };