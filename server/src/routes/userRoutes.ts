import { Router, Request, Response } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";


const router = Router();

router.get('/get-users', getUsers);
router.get('/get-user', getUser);
router.post('/update-user', updateUser);
router.delete('/delete-user', deleteUser);

export default router;