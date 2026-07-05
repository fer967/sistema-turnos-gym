import db from "../config/db.js";

export async function getSchedules() {

    const query = `
        SELECT
            s.id,
            d.name AS discipline,
            s.day_of_week,
            s.start_time,
            s.end_time,
            s.capacity
        FROM schedules s
        INNER JOIN disciplines d
            ON d.id = s.discipline_id
        ORDER BY
            s.day_of_week,
            s.start_time;
    `;

    const result = await db.query(query);

    return result.rows;
}