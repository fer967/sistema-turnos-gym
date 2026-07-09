import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Client } = pg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

await client.connect();

client.on("error", (err) => {
    console.error("Error en la conexión PostgreSQL:", err.message);
});

console.log("✅ Cliente PostgreSQL conectado");

export default client;






