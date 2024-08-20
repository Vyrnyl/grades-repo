"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidator_1 = require("../validators/authValidator");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    const { error, value } = (0, authValidator_1.validateSignup)(req.body);
    if (error) {
        return res.json({ error: error });
    }
    res.json(value);
});
exports.default = router;
