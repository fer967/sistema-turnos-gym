import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const result = await db.query("SELECT NOW()");
        console.log("Hora PostgreSQL:", result.rows[0].now);

        app.listen(PORT, () => {
            console.log(`Servidor en puerto ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();



//  prueba de conexion a la base de datos Neon
// import dotenv from "dotenv";
// dotenv.config();

// import pg from "pg";
// import app from "./app.js";

// const { Client } = pg;

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
// });

// const PORT = process.env.PORT || 3000;

// async function startServer() {
//     try {
//         console.log("Conectando...");
//         await client.connect();
//         const result = await client.query("SELECT NOW()");
//         console.log("Hora del servidor PostgreSQL:", result.rows[0].now);
//         console.log("✅ Conectado a PostgreSQL");
//         app.listen(PORT, () => {
//             console.log(`Servidor en puerto ${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// startServer();








