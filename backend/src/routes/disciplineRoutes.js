import { Router } from "express";
import { getAllDisciplinesController } from "../controllers/disciplineController.js";

const router = Router();

router.get("/", getAllDisciplinesController);

export default router;



