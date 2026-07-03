import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🏋️ Gym Booking API");
    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("=================================");
});