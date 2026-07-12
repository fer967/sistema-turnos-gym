import {
    findScheduleById,
    findReservation,
    countReservations,
    createReservation,
    getReservationsByUser,
    cancelReservation,
    getReservationDetails
} from "../repositories/reservationRepository.js";

import { sendReservationConfirmation }
    from "./whatsappService.js";


export async function reserveSchedule(userId, data) {
    const schedule = await findScheduleById(data.schedule_id);
    if (!schedule) {
        throw new Error("El horario no existe");
    }
    const exists = await findReservation(
        userId,
        data.schedule_id,
        data.reservation_date
    );
    if (exists) {
        throw new Error("Ya tienes una reserva para ese horario");
    }
    const reserved = await countReservations(
        data.schedule_id,
        data.reservation_date
    );
    if (reserved >= schedule.capacity) {
        throw new Error("No quedan cupos disponibles");
    }

    const reservation = await createReservation({
        user_id: userId,
        schedule_id: data.schedule_id,
        reservation_date: data.reservation_date
    });

    const details = await getReservationDetails(
        reservation.id
    );

    if (details?.phone) {
        await sendReservationConfirmation({
            phone: details.phone,
            discipline: details.discipline,
            date: new Date(details.reservation_date)
                .toLocaleDateString("es-AR"),
            start_time: details.start_time.slice(0, 5),
            end_time: details.end_time.slice(0, 5)
        });
    }

    return reservation;

}


export async function getMyReservations(userId) {
    return await getReservationsByUser(userId);
}


export async function cancelMyReservation(reservationId, userId) {
    const reservation = await cancelReservation(
        reservationId,
        userId
    );
    if (!reservation) {
        throw new Error("Reserva no encontrada");
    }
    return reservation;
}