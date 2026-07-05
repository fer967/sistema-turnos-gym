import { reserveSchedule, getMyReservations, cancelMyReservation } from "../services/reservationService.js";

export async function createReservation(req, res, next) {
    try {
        const reservation = await reserveSchedule(
            req.user.id,
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Reserva realizada correctamente",
            data: reservation
        });
    } catch (error) {
        next(error);
    }
}

export async function myReservations(req, res, next) {
    try {
        const reservations = await getMyReservations(req.user.id);
        res.json({
            success: true,
            data: reservations
        });
    } catch (error) {
        next(error);
    }
}


export async function cancel(req, res, next) {
    try {
        const reservationId = req.params.id.trim();
        const reservation = await cancelMyReservation(
            reservationId,
            req.user.id
        );
        res.json({
            success: true,
            message: "Reserva cancelada",
            data: reservation
        });
    } catch (error) {
        next(error);
    }
}







