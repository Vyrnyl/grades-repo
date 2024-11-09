import { Request, Response } from "express";
import { validateLogin, validateSignup } from "../validators/authValidator";
import { checkEmail, deleteRefreshToken, storeRefreshToken } from "../data/userUtils";
import { createUser, getUserData } from "../data/userDataAccess";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../services/tokenService";
import validationErrorHandler from "../utils/validationErrorHandler";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { addLoginActivity } from "../data/activityDataAccess";


//SIGNUP
const signup = async (req: Request, res: Response) => {

    const { error, value } = validateSignup(req.body);
    
    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }
    
    //CHECK EMAIL
    const emailExist = await checkEmail(value.email);
    
    if(emailExist) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    
    //PASSWORD HASHING
    value.password = await hashPassword(value.password);
    delete value.confirmPassword;


    //DB STORE
    const newUserResult = await createUser(value);
    
    if('error' in newUserResult) {
        // return res.status(500).json(newUserResult);
        console.log(newUserResult)
        return res.status(409).json({ error: 'Email already registered' });
    }

    //TOKEN
    const payload = {
        userId: newUserResult.id,
        firstName: newUserResult.firstName,
        role: newUserResult.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //Store refresh token
    const storeResult = await storeRefreshToken(refreshToken);
    
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
    
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(201).json({ message: 'Registration successful' });
};


//LOGIN
const login = async (req: Request, res: Response) => {

    const { error, value } = validateLogin(req.body);

    if(error) {
        const err = validationErrorHandler(error);
        return res.status(422).json(err);
    }

    //CHECK USER
    const user = await checkEmail(value.email);
    if(!user) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }

    //COMPARE PASSWORD
    const isPasswordMatch = await comparePassword(value.password, user.password);
    
    if(!isPasswordMatch) {
        
        await addLoginActivity(user.email, 'Failed');
              
        return res.status(404).json({ error: 'Invalid email or password' });
    }
    await addLoginActivity(user.email, 'Successful');
    
    const payload = {
        userId: user.id,
        firstName: user.firstName,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    
    //Store refresh token
    const storeResult = await storeRefreshToken(refreshToken);
    
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
    
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });

    const userData = await getUserData(user.id);

    res.status(200).json({ message: 'Login successful', userData });
}


const logout = async (req: Request, res: Response) => {

    const refreshToken = req.headers['refresh-token'] as string;
    
    if(!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }
    
    const deleteToken = await deleteRefreshToken(refreshToken);
    
    if(!deleteToken) {
        return res.status(404).json({ error: 'Already logged out or token not found' });
    }

   res.status(200).json({ message: 'Logout successful' });
}   


const refreshToken = async (req: Request, res: Response) => {

    const receivedRefreshToken = req.header('refresh-token');

    if(!receivedRefreshToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const validateTokenResult = await verifyRefreshToken(receivedRefreshToken);

    if(!validateTokenResult) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    console.log(validateTokenResult);

    const { userId, firstName, role } = validateTokenResult;

    const accessToken = generateAccessToken({ userId, firstName, role });

    res.set({ 'Authorization': `Bearer ${accessToken}` });
    res.status(200).json({ message: 'Refresh Token successful'});
}


//TEST ROUTE
const test = (req: Request, res: Response) =>{
    console.log(req.user);
    res.json({ message: 'Protected'});
}


export { signup, login, logout, refreshToken, test };