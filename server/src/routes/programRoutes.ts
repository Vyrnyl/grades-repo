import { Router } from "express";
import { getPrograms } from "../controllers/programController";

const router = Router();

router.get('/get-programs', getPrograms);


export default router;