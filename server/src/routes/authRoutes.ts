import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateSignup } from '../validators/authValidator';
import { checkEmail } from '../data/userUtils';
import validationError from '../utils/validationError';
import bcrypt from 'bcrypt';
import { createUser, storeRefreshToken } from '../data/userDataAccess';
import { generateAccessToken, generateRefreshToken } from '../services/tokenService';
import dotenv from 'dotenv';
import userAuth from '../middleware/userAuth';
dotenv.config();

const router = Router();
const prisma = new PrismaClient()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post('/signup', async (req: Request, res: Response) => {

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
    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;
    delete value.confirmPassword;


    //DB STORE
    const newUser = await createUser(value);
    
    if('error' in newUser) {
        return res.status(500).json(newUser);
    }

    //TOKEN
    const payload = {
        userId: newUser.id,
        firstName: newUser.firstName,
        role: newUser.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //Store refresh token
    const store = await storeRefreshToken(refreshToken, newUser.id);
    
    if(store.error) {
        return res.status(500).json({ error: 'Storing refresh token error' });
    }
    
    res.set({
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
    });
    res.status(200).json({ message: 'Registration successful' });
});



router.get('/test', userAuth, (req, res) =>{
    
    console.log(req.user);
    res.json({ message: 'Protected'});
});

export default router;