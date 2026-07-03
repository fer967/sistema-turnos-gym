import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Gym Booking API funcionando 🚀"
    });
});

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date()
    });
});

export default app;