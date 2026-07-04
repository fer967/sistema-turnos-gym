import pool from "../config/db.js";

export const findUserByEmail = async (email) => {

    const query = `
        SELECT *
        FROM gym_users
        WHERE email = $1
    `;

    const { rows } = await pool.query(query, [email]);

    return rows[0];
};

export const createUser = async ({
    name,
    email,
    passwordHash,
    phone
}) => {

    const query = `
        INSERT INTO gym_users
            (name, email, password_hash, phone)
        VALUES
            ($1,$2,$3,$4)
        RETURNING
            id,
            name,
            email,
            phone,
            role,
            created_at
    `;

    const values = [
        name,
        email,
        passwordHash,
        phone
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
};