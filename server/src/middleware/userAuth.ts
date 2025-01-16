import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/tokenService";

const userAuth = (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    
    if(!token) {
        return res.status(403).json({ error: 'Access Denied' });
    }
    
    const verified = verifyAccessToken(token);
    console.log(verified?.firstName);
    if(!verified) {
        return res.status(401).json({ error: 'Token Expired' });
    }

    req.user = verified;
    next();
};

export default userAuth;