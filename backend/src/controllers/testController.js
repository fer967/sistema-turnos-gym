import { sendWhatsAppMessage } from "../services/whatsappService.js";

export async function sendTestMessage(req, res, next) {
    try {
        const response = await sendWhatsAppMessage(
            process.env.WHATSAPP_RECIPIENT,
            "👋 Hola Gabriel.\n\nEste es el primer mensaje enviado desde Gym Booking System."
        );
        res.json({
            success: true,
            data: response
        });
    } catch (error) {
        next(error);
    }
}