import { Request, Response } from "express";
import { validateLogin, validateSignup } from "../validators/authValidator";
import { checkEmail, deleteRefreshToken, storeRefreshToken } from "../data/userUtils";
import { checkUserId, createUser, getUserData, getUserDataByEmail } from "../data/userDataAccess";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../services/tokenService";
import validationErrorHandler from "../utils/validationErrorHandler";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { addAdminRecentActivity, addLoginActivity, addLoginSession, deleteLoginSession } from "../data/activityDataAccess";
import { assignNewUserCourse } from "../data/programDataAccess";


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
    
    
    //Check ID
    // const user = await getUserData(value.id);
    const user = await getUserDataByEmail(value.email);
    const userIdExist = await checkUserId(value.studentId);
    
    if(user?.studentId !== value.studentId) {
        if(userIdExist?.message) return res.status(409).json({ error: 'UserID already exist!' });
    }
    if(value.role === 'student') {
        const format = /^\d{4}-\d{5}$/;

        if(!format.test(value.studentId))
            return res.status(409).json({ error: 'Invalid ID format! (eg. 1234-12345)' });
    } else {
        const format = /^\d{4}$/;
        if(!format.test(value.studentId))
            return res.status(409).json({ error: 'Invalid ID format! (eg. 1234)' });
    }

    
    //PASSWORD HASHING
    value.password = await hashPassword(value.password);
    delete value.confirmPassword;


    //DB STORE
    const newUserResult = await createUser(value);
    // console.log(newUserResult)
    if('error' in newUserResult) {
        // return res.status(500).json(newUserResult);
        // console.log(newUserResult)
        return res.status(409).json({ error: 'Email already registered' });
    }

    //Assign Addded Courses
    await assignNewUserCourse(newUserResult.id, value.programId);

    //Set Recent Activity
    // await addAdminRecentActivity(`New user registered with email: ${newUserResult.email}`);
    // await addLoginSession();

    //TOKEN
    const payload = {
        userId: newUserResult.id,
        firstName: newUserResult.firstName,
        role: newUserResult.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //Store refresh token
    await storeRefreshToken(refreshToken);
    
    // if(storeResult.error) {
    //     return res.status(500).json({ error: storeResult.error });
    // }
    
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(201).json(newUserResult);
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

    if(user.email !== 'admin@gmail.com') {
        await addLoginSession();
        await addAdminRecentActivity(`User logged in with email: ${user.email}`);
    }
    
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

    // const refreshToken = req.headers['refresh-token'] as string;
    
    // if(!refreshToken) {
    //     return res.status(400).json({ error: 'Refresh token is required' });
    // }
    
    // const deleteToken = await deleteRefreshToken(refreshToken);
    const deleteSession = await deleteLoginSession();
    if(!deleteSession) {
        return res.status(404).json({ error: 'Already logged out' });
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