import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { normalizePhoneNumber } from "../utils/phoneUtils.js";
import { ROLES } from "../constants/roles.js";

async function createAdmin() {
    try {
        const email = "admin@gymbooking.com";
        const exists = await pool.query(
            `
            SELECT id
            FROM gym_users
            WHERE email = $1
            `,
            [email]
        );
        if (exists.rows.length > 0) {
            console.log("⚠️ El administrador ya existe.");
            process.exit(0);
        }
        const passwordHash = await bcrypt.hash(
            "Admin1234*",
            10
        );
        const phone = normalizePhoneNumber(
            "5493516271526"
        );
        await pool.query(
            `
            INSERT INTO gym_users
            (
                name,
                email,
                password_hash,
                phone,
                role
            )
            VALUES
            ($1,$2,$3,$4,$5)
            `,
            [
                "Administrador",
                email,
                passwordHash,
                phone,
                ROLES.ADMIN
            ]
        );
        console.log("✅ Administrador creado correctamente.");
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

createAdmin();