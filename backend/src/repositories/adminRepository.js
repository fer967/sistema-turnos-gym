import db from "../config/db.js";

export async function createScheduleRepository(data) {
    const query = `
        INSERT INTO schedules
        (
            discipline_id,
            day_of_week,
            start_time,
            end_time,
            capacity
        )
        VALUES
        (
            $1,$2,$3,$4,$5
        )
        RETURNING *;
    `;
    const result = await db.query(query, [
        data.discipline_id,
        data.day_of_week,
        data.start_time,
        data.end_time,
        data.capacity
    ]);
    return result.rows[0];
}


export async function getAllReservationsRepository() {
    const query = `
        SELECT
            r.id,

            u.name,
            u.email,

            s.id AS schedule_id,

            d.name AS discipline,

            CASE s.day_of_week
                WHEN 0 THEN 'Domingo'
                WHEN 1 THEN 'Lunes'
                WHEN 2 THEN 'Martes'
                WHEN 3 THEN 'Miércoles'
                WHEN 4 THEN 'Jueves'
                WHEN 5 THEN 'Viernes'
                WHEN 6 THEN 'Sábado'
            END AS day_name,

            TO_CHAR(s.start_time, 'HH24:MI')
            ||
            ' - '
            ||
            TO_CHAR(s.end_time, 'HH24:MI')
            AS schedule,

            s.capacity,

            r.reservation_date,

            r.status,

            r.created_at

        FROM reservations r

        JOIN gym_users u
            ON r.user_id = u.id

        JOIN schedules s
            ON r.schedule_id = s.id

        JOIN disciplines d
            ON s.discipline_id = d.id

        ORDER BY
            r.reservation_date,
            s.start_time;
    `;
    const result = await db.query(query);
    return result.rows;
}


export async function getAllSchedulesRepository() {
    const query = `
        SELECT
            s.id,
            d.name AS discipline,
            s.discipline_id,
            s.day_of_week,
            s.start_time,
            s.end_time,
            s.capacity,
            s.created_at
        FROM schedules s
        JOIN disciplines d
            ON s.discipline_id = d.id
        ORDER BY
            s.day_of_week,
            s.start_time;
    `;
    const result = await db.query(query);
    return result.rows;
}


export async function updateScheduleRepository(id, data) {
    const query = `
        UPDATE schedules
        SET
            discipline_id = $1,
            day_of_week = $2,
            start_time = $3,
            end_time = $4,
            capacity = $5
        WHERE id = $6
        RETURNING *;
    `;
    const result = await db.query(query, [
        data.discipline_id,
        data.day_of_week,
        data.start_time,
        data.end_time,
        data.capacity,
        id
    ]);
    return result.rows[0];
}


export async function deleteScheduleRepository(id) {
    const query = `
        DELETE FROM schedules
        WHERE id = $1
        RETURNING *;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

export async function scheduleHasReservations(scheduleId) {
    const query = `
        SELECT COUNT(*) AS total
        FROM reservations
        WHERE schedule_id = $1
            AND status = 'reserved';
    `;
    const result = await db.query(query, [scheduleId]);
    return Number(result.rows[0].total) > 0;
}