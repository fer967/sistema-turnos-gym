import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createReservation, myReservations, cancel } from "../controllers/reservationController.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    createReservation
);

router.get(
    "/my-reservations",
    authMiddleware,
    myReservations
);

router.patch(
    "/cancel/:id",
    authMiddleware,
    cancel
);

export default router;




