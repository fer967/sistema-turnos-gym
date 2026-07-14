import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (err) => {
    console.error(
        "Error inesperado en PostgreSQL:",
        err.message
    );
});

console.log("✅ Pool PostgreSQL inicializado");

export default pool;


// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config();

// const { Client } = pg;

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
// });

// await client.connect();

// client.on("error", (err) => {
//     console.error("Error en la conexión PostgreSQL:", err.message);
// });

// console.log("✅ Cliente PostgreSQL conectado");

// export default client;






