import {
    findScheduleById,
    findReservation,
    countReservations,
    createReservation,
    getReservationsByUser,
    cancelReservation,
    getReservationDetails
} from "../repositories/reservationRepository.js";

import {
    notifyReservation,
    notifyCancellation
} from "./notificationService.js";

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
        try {

            await notifyReservation({                
                reservation_id: reservation.id,   
                user_id: userId,                   
                phone: details.phone,
                name: details.name,
                discipline: details.discipline,
                date: new Date(details.reservation_date)
                    .toLocaleDateString("es-AR"),
                start_time: details.start_time.slice(0, 5),
                end_time: details.end_time.slice(0, 5)
            });

            console.log(
                `✅ WhatsApp enviado a ${details.phone}`
            );
        } catch (error) {
            console.error(
                "❌ No se pudo enviar el WhatsApp de confirmación."
            );
            console.error(
                error.response?.data || error.message
            );
        }
    } else {
        console.warn(
            "⚠️ El usuario no tiene teléfono registrado."
        );
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
    const details = await getReservationDetails(
        reservation.id
    );
    if (details?.phone) {
        try {
            await notifyCancellation({
                reservation_id: reservation.id,   
                user_id: userId, 
                phone: details.phone,
                name: details.name,
                discipline: details.discipline,
                date: new Date(details.reservation_date)
                    .toLocaleDateString("es-AR"),
                start_time: details.start_time.slice(0, 5),
                end_time: details.end_time.slice(0, 5)
            });
            console.log(
                `✅ WhatsApp de cancelación enviado a ${details.phone}`
            );
        } catch (error) {
            console.error(
                "❌ No se pudo enviar el WhatsApp de cancelación."
            );
            console.error(
                error.response?.data || error.message
            );
        }
    }
    return reservation;
}

