import pool from "../config/db.js";

export async function findUserByEmail(email) {
    const query = `
        SELECT *
        FROM gym_users
        WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

export async function createUser(user) {
    const query = `
        INSERT INTO gym_users
        (name, email, password_hash, phone, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, role, created_at
    `;
    const values = [
        user.name,
        user.email,
        user.password_hash,
        user.phone,
        user.role
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
}



// import pool from "../config/db.js";

// export async function findUserByEmail(email) {
//     const query = `
//         SELECT *
//         FROM gym_users
//         WHERE email = $1
//     `;
//     const result = await pool.query(query, [email]);     //  error en consola
//     return result.rows[0];
// }

// export async function createUser(user) {
//     const query = `
//         INSERT INTO gym_users
//         (first_name, last_name, email, password_hash, role)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING id, first_name, last_name, email, role
//     `;
//     const values = [
//         user.first_name,
//         user.last_name,
//         user.email,
//         user.password_hash,
//         user.role
//     ];
//     const result = await pool.query(query, values);
//     return result.rows[0];
// }