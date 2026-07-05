import { Router } from "express";
import { getSchedulesController } from "../controllers/scheduleController.js";

const router = Router();

router.get("/", getSchedulesController);

export default router;