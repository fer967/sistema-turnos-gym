import axios from "axios";
import { normalizePhoneNumber }
    from "../utils/phoneUtils.js";

const BASE_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}`;

async function sendWhatsAppMessage(to, message) {

    const normalizedPhone =
        normalizePhoneNumber(to);

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
    return response.data;
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
    return await sendWhatsAppMessage(
        data.phone,
        message.trim()
    );
}

// sendReservationCancellation()

// sendWelcomeMessage()



// import axios from "axios";

// const BASE_URL = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}`;

// export async function sendWhatsAppMessage(to, message) {

//     try {
//         console.log("API:", BASE_URL);
//         console.log("PHONE ID:", process.env.WHATSAPP_PHONE_NUMBER_ID);
//         console.log("TO:", to);

//         const response = await axios.post(
//             `${BASE_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//             {
//                 messaging_product: "whatsapp",
//                 to,
//                 type: "text",
//                 text: {
//                     body: message
//                 }
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         return response.data;
//     } catch (error) {
//         console.error("STATUS:", error.response?.status);
//         console.error("DATA:", JSON.stringify(error.response?.data, null, 2));
//         throw error;
//     }
// }