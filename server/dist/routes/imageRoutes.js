"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageContoller_1 = require("../controllers/imageContoller");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post('/add-image', upload.single('image'), imageContoller_1.addProfilePic);
router.put('/update-image', upload.single('image'), imageContoller_1.updateProfilePic);
router.post('/get-image', imageContoller_1.getProfilePic);
exports.default = router;
