import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

        console.log(
            "Hora PostgreSQL:",
            result.rows[0].now
        );

        app.listen(PORT, () => {
            console.log(
                `Servidor en puerto ${PORT}`
            );
        });

    } catch (err) {

        console.error(err);

    }
}

startServer();



// import app from "./app.js";
// import db from "./config/db.js";

// const PORT = process.env.PORT || 3000;

// async function startServer() {
//     try {
//         const result = await db.query("SELECT NOW()");
//         console.log("Hora PostgreSQL:", result.rows[0].now);
//         app.listen(PORT, () => {
//             console.log(`Servidor en puerto ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// startServer();












