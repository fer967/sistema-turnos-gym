import { Router } from "express";
import {
    getAllReservations,
    createSchedule
} from "../controllers/adminController.js";

const router = Router();

router.get("/reservations", getAllReservations);

router.post("/schedules", createSchedule);

export default router;