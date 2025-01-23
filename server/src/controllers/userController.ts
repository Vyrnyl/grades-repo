import { Request, Response } from "express";
import { checkUserId, deleteUserData, getUserData, getUsersData, updateUserData } from "../data/userDataAccess";
import { validateUserId, validateUserUpdate } from "../validators/userValidator";
import validationErrorHandler from "../utils/validationErrorHandler";
import bcrypt from 'bcrypt';
import { addFacultyActivity, deleteLoginSession } from "../data/activityDataAccess";
import { checkEmail, checkUserEmail } from "../data/userUtils";


const getUsers = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = +req.params.id;

    const users = await getUsersData();

    if(!users) {
        return res.status(404).json({ error: 'Users not found' });
    }

    res.status(200).json(users);
}

const getUser = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { userId } = req.user;

    const userDetails = await getUserData(userId);

    if(!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(userDetails);
};


const updateUser = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'User is not authenticated' });
    }

    const value = req.body;

    try {
        if (!value.password) {
            delete value.password;
        } else {
            value.password = await bcrypt.hash(value.password, 10);
        }
    } catch (error) {
        console.error("Error hashing password:", error);
    }
    

    //Check ID
    const user = await getUserData(value.id);
    const userIdExist = await checkUserId(value.studentId);
    
    if(user?.studentId !== value.studentId) {
        if(userIdExist?.message) return res.status(409).json({ error: 'UserID already exist!' });
    }
    

    const { userId } = req.user;
    
    const userDetails = await getUserData(userId);
    const userUpdateDetails = await updateUserData(value.id, value);
    
    if(!userUpdateDetails) {
        return res.status(500).json({ error: 'Failed to update user details' });
    }

    
    
    //Set Activity
    const setActivity = async () => {
        if(userDetails?.firstName !== userUpdateDetails.firstName)
            await addFacultyActivity(userId, 
                `First name updated from ${userDetails?.firstName} to ${userUpdateDetails.firstName}.`);
                
        if(userDetails?.lastName !== userUpdateDetails.lastName)
            await addFacultyActivity(userId, 
                `Last name updated from ${userDetails?.lastName} to ${userUpdateDetails.lastName}.`);
        
        if(userDetails?.studentId !== userUpdateDetails.studentId)
            await addFacultyActivity(userId, 
                `School ID updated from ${userDetails?.studentId} to ${userUpdateDetails.studentId}.`);
        
        if((userDetails?.sex !== userUpdateDetails.sex) && userUpdateDetails.sex !== '')
            await addFacultyActivity(userId, 
                `Gender updated`);
                
        if(userDetails?.phoneNumber !== userUpdateDetails.phoneNumber && userUpdateDetails.phoneNumber !== '')
            await addFacultyActivity(userId, 
                `Phone Number updated`);
        
        if(userDetails?.email !== userUpdateDetails.email)
            await addFacultyActivity(userId, 
                `Email address updated to ${userUpdateDetails.email}`);
        
        if(value.password) {
            await addFacultyActivity(userId, 
                `You successfully changed your password`);
        }
    }
    setActivity();

    res.status(200).json(userUpdateDetails);
};


const deleteUser = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ error: 'User is not authenticated' });
    }
    if(!req.body.userId) {
        return res.status(400).json({ error: 'Missing necessary data' });
    }

    const { error, value } = validateUserId(req.body);

    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    const deletedUser = await deleteUserData(value.userId);
    
    if(!deletedUser) {
        return res.status(400).json({ error: 'Deletion error' });
    }
    await deleteLoginSession();

    res.status(200).json({ message: 'Deletion successful'});
}


const getEmail = async (req: Request, res: Response) => {

    if(!req.body) {
        return res.status(400).json({ error: 'Missing necessary data' });
    }
    
    const { id, email } = req.body;
    
    const userDetails = await checkUserEmail(id, email);
    
    if(!userDetails) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(userDetails);
}

export { getUsers, getUser, updateUser, deleteUser, getEmail };