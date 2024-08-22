import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateSignup } from '../validators/authValidator';
import { checkEmail } from '../data/userUtils';
import validationError from '../utils/validationError';
import bcrypt from 'bcrypt';
import { createUser } from '../data/userDataAccess';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
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
    

    res.status(200).json({ message: 'Registration successful' });
});


export default router;