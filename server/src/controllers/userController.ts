import { Request, Response } from "express";
import { deleteUserData, getUserData, getUsersData, updateUserData } from "../data/userDataAccess";
import { validateUserId, validateUserUpdate } from "../validators/userValidator";
import validationErrorHandler from "../utils/validationErrorHandler";
import bcrypt from 'bcrypt';


const getUsers = async (req: Request, res: Response) => {

    if(!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
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
        return res.status(401).json({ message: 'User is not authenticated' });
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
        return res.status(500).json({ error: 'Failed to update user details' });
    }

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

    res.status(200).json({ message: 'Deletion successful'});
}

export { getUsers, getUser, updateUser, deleteUser };