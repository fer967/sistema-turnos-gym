import { Router } from "express";
import { getAllDisciplines } from "../controllers/disciplineController.js";

const router = Router();

router.get("/", getAllDisciplines);

export default router;