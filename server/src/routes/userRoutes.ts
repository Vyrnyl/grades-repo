import { Router } from "express";
import { deleteUser, getEmail, getUser, getUsers, updateUser } from "../controllers/userController";


const router = Router();

router.get('/get-users', getUsers);
router.get('/get-user', getUser);
router.put('/update-user', updateUser);
router.delete('/delete-user', deleteUser);

// router.post('/check-email', getEmail);

export default router;