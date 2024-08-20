import { Router, Request, Response } from 'express';
import Joi from 'joi';
import { validateSignup } from '../validators/authValidator';

const router = Router();


router.post('/signup', (req: Request, res: Response) => {

    const { error, value } = validateSignup(req.body);

    if(error) {
        return res.json({ error: error })
    }
    res.json(value);
});


export default router;