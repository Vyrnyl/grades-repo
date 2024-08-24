import { Request, Response } from "express";
import { validateLogin, validateSignup } from "../validators/authValidator";
import validationError from "../utils/validationError";
import { checkEmail, storeRefreshToken } from "../data/userUtils";
import bcrypt from 'bcrypt';
import { createUser } from "../data/userDataAccess";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";


//SIGNUP
const signup = async (req: Request, res: Response) => {

    const { error, value } = validateSignup(req.body);
    
    if(error) {
        const err = validationError(error);
        return res.status(422).json(err)
    }

    //CHECK EMAIL
    const emailExist = await checkEmail(value.email);

    if(emailExist) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    
    //PASSWORD HASHING
    value.password = await bcrypt.hash(value.password, 10);;
    delete value.confirmPassword;


    //DB STORE
    const newUserResult = await createUser(value);
    
    if('error' in newUserResult) {
        return res.status(500).json(newUserResult);
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
    
    if(storeResult.error) {
        return res.status(500).json({ error: storeResult.error });
    }
    
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
        const err = validationError(error);
        return res.status(422).json(err);
    }

    //CHECK USER
    const user = await checkEmail(value.email);
    if(!user) {
        return res.status(404).json({ error: 'Invalid email or password' });
    }

    //COMPARE PASSWORD
    const isPasswordMatch = await bcrypt.compare(value.password, user.password);

    if(!isPasswordMatch) {
        return res.status(404).json({ error: 'Invalid email or password' });
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
    
    if(storeResult.error) {
        return res.status(500).json({ error: storeResult.error });
    }
    
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });

    res.status(200).json({ message: 'Login successful' });
} 



//TEST ROUTE
const test = (req: Request, res: Response) =>{
    console.log(req.user);
    res.json({ message: 'Protected'});
}


export { signup, login, test };