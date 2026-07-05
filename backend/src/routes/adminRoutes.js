import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {
    createSchedule, listReservations, listSchedules, 
    editSchedule, removeSchedule
} from "../controllers/adminController.js";

const router = Router();

router.post(
    "/schedules",
    authMiddleware,
    adminMiddleware,
    createSchedule
);

router.get(
    "/reservations",
    authMiddleware,
    adminMiddleware,
    listReservations
);

router.get(
    "/schedules",
    authMiddleware,
    adminMiddleware,
    listSchedules
);

router.put(
    "/schedules/:id",
    authMiddleware,
    adminMiddleware,
    editSchedule
);

router.delete(
    "/schedules/:id",
    authMiddleware,
    adminMiddleware,
    removeSchedule
);

export default router;

