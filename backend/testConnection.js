import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Client } = pg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

try {
    console.log("Conectando...");
    await client.connect();

    console.log("✅ Conectado");

    const result = await client.query("SELECT version()");
    console.log(result.rows);

    await client.end();

} catch (err) {
    console.error(err);
}