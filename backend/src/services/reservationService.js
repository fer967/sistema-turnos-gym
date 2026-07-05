import {
    findScheduleById,
    findReservation,
    countReservations,
    createReservation,
    getReservationsByUser,
    cancelReservation
} from "../repositories/reservationRepository.js";



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

    return await createReservation({
        user_id: userId,
        schedule_id: data.schedule_id,
        reservation_date: data.reservation_date
    });
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