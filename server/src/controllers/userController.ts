import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserData, updateUserData } from "../data/userDataAccess";
import { getProgramName } from "../data/userUtils";
import { validateUserUpdate } from "../validators/authValidator";
import validationErrorHandler from "../utils/validationErrorHandler";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }
    
    const { userId } = req.body;

    const userDetails = await getUserData(userId);

    if(!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { programId } = userDetails;
    if(!programId) {
        return res.json({ error: 'Program ID not found in user details' });
    }

    const programDetails = await getProgramName(programId);
    
    if(!programDetails) {
        return res.status(404).json({ error: 'Program not found' });
    }
    
    res.status(200).json({ userDetails, programDetails });
}


const updateUser = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(400).json({ message: 'User is not authenticated' });
    }

    const { error, value } = validateUserUpdate(req.body);

    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    const { userId } = req.user;

    value.password = await bcrypt.hash(value.password, 10);
    delete value.confirmPassword;

    const userUpdateDetails = await updateUserData(userId, value);
    
    if(!userUpdateDetails) {
        return res.status(400).json({ error: 'Updating user error' });
    }

    res.status(200).json(userUpdateDetails);
}; 

export { getUser, updateUser };