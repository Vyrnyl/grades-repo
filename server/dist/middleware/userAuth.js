"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = require("../services/tokenService");
const userAuth = (req, res, next) => {
    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access Denied' });
    }
    const verified = (0, tokenService_1.verifyAccessToken)(token);
    console.log(verified?.firstName);
    if (!verified) {
        return res.status(401).json({ error: 'Token Expired' });
    }
    req.user = verified;
    next();
};
exports.default = userAuth;
