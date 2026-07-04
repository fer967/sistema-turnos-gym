import { Router } from "express";
import {
    getAvailableReservations,
    createReservation,
    cancelReservation
} from "../controllers/reservationController.js";

const router = Router();

router.get("/available", getAvailableReservations);

router.post("/", createReservation);

router.delete("/:id", cancelReservation);

export default router;