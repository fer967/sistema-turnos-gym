import db from "../config/db.js";

export async function getDisciplines() {

    const query = `
        SELECT
            id,
            name,
            description
        FROM disciplines
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
}