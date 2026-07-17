import axios from "axios";
import { normalizePhoneNumber }
    from "../utils/phoneUtils.js";
import {
    sendReservationTemplate,
    sendCancelTemplate
} from "./whatsappTemplateService.js";

const BASE_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}`;

async function sendWithFallback({
    phone,
    message,
    templateFunction,
    templateData
}) {
    try {
        return await sendWhatsAppMessage(
            phone,
            message
        );
    } catch (error) {
        const code =
            error.response?.data?.error?.code;
        if (code === 131047) {
            console.log(
                "⚠ Ventana de conversación cerrada."
            );
            console.log(
                "📨 Enviando plantilla..."
            );
            return await templateFunction(
                templateData
            );
        }
        throw error;
    }
}

export async function sendWhatsAppMessage(to, message) {
    const normalizedPhone = normalizePhoneNumber(to);
    if (!normalizedPhone) {
        throw new Error("Número de teléfono inválido.");
    }
    try {
        const response = await axios.post(
            `${BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: normalizedPhone,
                type: "text",
                text: {
                    body: message
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;   // devuelve objeto axios


    } catch (error) {
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", JSON.stringify(error.response?.data, null, 2));
        console.error("REQUEST DATA:", {
            messaging_product: "whatsapp",
            to: normalizedPhone,
            type: "text",
            text: {
                body: message
            }
        });
        throw error;
    }
}


export async function sendReservationConfirmation(data) {
    const message = `
🏋️ Gym Booking System
✅ Reserva confirmada
Disciplina: ${data.discipline}
Fecha: ${data.date}
Horario: ${data.start_time} - ${data.end_time}
¡Te esperamos! 💪
`;
    return sendWithFallback({
        phone: data.phone,
        message: message.trim(),
        templateFunction: sendReservationTemplate,
        templateData: {
            phone: data.phone,
            name: data.name,
            discipline: data.discipline,
            date: data.date,
            schedule:
                `${data.start_time} - ${data.end_time}`
        }
    });
}


export async function sendReservationCancellation(data) {
    const message = `
🏋️ Gym Booking System
❌ Reserva cancelada
Disciplina: ${data.discipline}
Fecha: ${data.date}
Horario: ${data.start_time} - ${data.end_time}
Esperamos verte pronto. 💪
`;
    return sendWithFallback({
        phone: data.phone,
        message: message.trim(),
        templateFunction: sendCancelTemplate,
        templateData: {
            phone: data.phone,
            name: data.name,
            discipline: data.discipline,
            date: data.date,
            schedule:
                `${data.start_time} - ${data.end_time}`
        }
    });
}















