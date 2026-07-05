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


// router.patch("/cancel-test", (req, res) => {
//     res.json({
//         success: true,
//         message: "Entró a reservationRoutes"
//     });
// });

// router.patch("/:id/cancel", authMiddleware, (req, res) => {
//     console.log("PATCH recibido:", req.params.id);

//     res.json({
//         success: true
//     });
// });

// router.patch("/:id", authMiddleware, (req, res) => {
//     console.log("PATCH recibido:", req.params.id);
//     res.json({
//         success: true,
//         id: req.params.id
//     });
// });



// router.patch(
//     "/:id/cancel",
//     authMiddleware,
//     cancel
// );



// import { Router } from "express";
// import {
//     getAvailableReservations,
//     createReservation,
//     cancelReservation
// } from "../controllers/reservationController.js";

// const router = Router();

// router.get("/available", getAvailableReservations);

// router.post("/", createReservation);

// router.delete("/:id", cancelReservation);

// export default router;