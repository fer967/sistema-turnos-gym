import db from "../config/db.js";

export async function getSchedules() {

    const query = `
        SELECT
            s.id,
            d.name AS discipline,
            s.discipline_id,
            s.day_of_week,

            CASE s.day_of_week
                WHEN 0 THEN 'Domingo'
                WHEN 1 THEN 'Lunes'
                WHEN 2 THEN 'Martes'
                WHEN 3 THEN 'Miércoles'
                WHEN 4 THEN 'Jueves'
                WHEN 5 THEN 'Viernes'
                WHEN 6 THEN 'Sábado'
            END AS day_name,

            s.start_time,
            s.end_time,

            TO_CHAR(s.start_time, 'HH24:MI')
            ||
            ' - '
            ||
            TO_CHAR(s.end_time, 'HH24:MI')
            AS schedule,

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