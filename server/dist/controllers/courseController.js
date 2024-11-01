"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCourses = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
