import { Request, Response, Router } from "express";
import { addProfilePic, getProfilePic, updateProfilePic } from "../controllers/imageContoller";
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/add-image', upload.single('image'), addProfilePic);
router.put('/update-image', upload.single('image'), updateProfilePic);
router.post('/get-image', getProfilePic);

export default router