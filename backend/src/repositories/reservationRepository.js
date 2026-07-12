import db from "../config/db.js";

export async function findScheduleById(scheduleId) {
    const query = `
        SELECT *
        FROM schedules
        WHERE id = $1
    `;
    const result = await db.query(query, [scheduleId]);
    return result.rows[0];
}

export async function findReservation(userId, scheduleId, reservationDate) {
    const query = `
        SELECT *
        FROM reservations
        WHERE user_id = $1
          AND schedule_id = $2
          AND reservation_date = $3
          AND status = 'reserved'
    `;
    const result = await db.query(query, [
        userId,
        scheduleId,
        reservationDate
    ]);
    return result.rows[0];
}

export async function countReservations(scheduleId, reservationDate) {
    const query = `
        SELECT COUNT(*)::INTEGER AS total
        FROM reservations
        WHERE schedule_id = $1
          AND reservation_date = $2
          AND status = 'reserved'
    `;
    const result = await db.query(query, [
        scheduleId,
        reservationDate
    ]);
    return result.rows[0].total;
}

export async function createReservation(data) {
    const query = `
        INSERT INTO reservations
        (
            user_id,
            schedule_id,
            reservation_date,
            status
        )
        VALUES ($1,$2,$3,'reserved')
        RETURNING *
    `;
    const result = await db.query(query, [
        data.user_id,
        data.schedule_id,
        data.reservation_date
    ]);
    return result.rows[0];
}

export async function getReservationsByUser(userId) {
    const query = `
        SELECT
            r.id,
            r.reservation_date,
            r.status,
            s.id AS schedule_id,
            s.day_of_week,
            s.start_time,
            s.end_time,
            s.capacity,
            d.name AS discipline
        FROM reservations r
        INNER JOIN schedules s
            ON s.id = r.schedule_id
        INNER JOIN disciplines d
            ON d.id = s.discipline_id
        WHERE r.user_id = $1
        ORDER BY
            r.reservation_date,
            s.start_time;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
}


export async function cancelReservation(reservationId, userId) {
    const query = `
        UPDATE reservations
        SET status = 'cancelled'
        WHERE id = $1
          AND user_id = $2
          AND status = 'reserved'
        RETURNING *;
    `;
    const result = await db.query(query, [
        reservationId,
        userId
    ]);
    return result.rows[0];
}


export async function getReservationDetails(reservationId) {

    const query = `
        SELECT

            r.id,

            r.reservation_date,

            u.name,

            u.phone,

            d.name AS discipline,

            s.start_time,

            s.end_time

        FROM reservations r

        JOIN gym_users u
            ON r.user_id = u.id

        JOIN schedules s
            ON r.schedule_id = s.id

        JOIN disciplines d
            ON s.discipline_id = d.id

        WHERE r.id = $1;
    `;

    const result = await db.query(query, [reservationId]);

    return result.rows[0];

}