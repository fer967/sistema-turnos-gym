import {
    sendWhatsAppMessage
} from "./whatsappService.js";

import {
    sendReservationTemplate,
    sendCancelTemplate
} from "./whatsappTemplateService.js";

import {
    createMessageLog
} from "../repositories/messageRepository.js";


function isConversationClosed(error) {
    const apiError = error.response?.error;
    // const apiError = error.response?.data?.error;
    return (
        apiError &&
        (
            apiError.code === 131047 ||
            apiError.error_subcode === 131047
        )
    );
}


export async function notifyReservation(data) {
    const message = `
🏋️ Gym Booking System
✅ Reserva confirmada
Hola ${data.name}.
Disciplina: ${data.discipline}
Fecha: ${data.date}
Horario: ${data.start_time} - ${data.end_time}
¡Te esperamos! 💪
`;

    try {
        const response = await sendWhatsAppMessage(
            data.phone,
            message.trim()
        );

        console.log(                                        // prueba  44 - 58
            "RESPUESTA WHATSAPP:",
            JSON.stringify(response, null, 2)               // .data
        );
        console.log(
            "MESSAGE ID:",
            response.messages?.[0]?.id                   // .data
        );
        console.log(
            "LOG A GUARDAR:",
            {
                whatsapp_message_id:
                    response.messages?.[0]?.id                // .data
            }
        );                                                    ////////////

        await createMessageLog({
            user_id: data.user_id,
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "confirmation",
            channel: "text",
            status: "sent",
            template_name: "reservation_confirmation",
            payload: data,
            whatsapp_message_id: response.messages?.[0]?.id      // .data  y los demas que estan mas abajo
        });

        return response;

    } catch (error) {

        if (isConversationClosed(error)) {

            try {

                const response = await sendReservationTemplate({
                    phone: data.phone,
                    name: data.name,
                    discipline: data.discipline,
                    date: data.date,
                    schedule: `${data.start_time} - ${data.end_time}`
                });

                await createMessageLog({
                    user_id: data.user_id,
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "confirmation",
                    channel: "template",
                    status: "template_sent",
                    template_name: "reservation_confirmation",
                    payload: data,
                    whatsapp_message_id:
                        response.messages?.[0]?.id
                });

                return response;

            } catch (templateError) {

                await createMessageLog({
                    user_id: data.user_id,
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "confirmation",
                    channel: "template",
                    status: "failed",
                    template_name: "reservation_confirmation",
                    payload: data,
                    error_code:
                        templateError.response?.data?.error?.code,
                    error_message:
                        templateError.response?.data?.error?.message
                });

                throw templateError;
            }
        }

        await createMessageLog({
            user_id: data.user_id,
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "confirmation",
            channel: "text",
            status: "failed",
            template_name: "reservation_confirmation",
            payload: data,
            error_code: error.response?.data?.error?.code,
            error_message: error.response?.data?.error?.message
        });

        throw error;
    }

}



export async function notifyCancellation(data) {
    const message = `
🏋️ Gym Booking System
❌ Reserva cancelada
Hola ${data.name}.
Disciplina: ${data.discipline}
Fecha: ${data.date}
Horario: ${data.start_time} - ${data.end_time}
¡Esperamos verte pronto! 💪
`;

    try {
        const response = await sendWhatsAppMessage(
            data.phone,
            message.trim()
        );

        await createMessageLog({
            user_id: data.user_id,
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "cancellation",
            channel: "text",
            status: "sent",
            template_name: "reservation_cancelled",
            payload: data,
            whatsapp_message_id: response.messages?.[0]?.id
        });

        return response;

    } catch (error) {

        if (isConversationClosed(error)) {

            try {

                const response = await sendCancelTemplate({
                    phone: data.phone,
                    name: data.name,
                    discipline: data.discipline,
                    date: data.date,
                    schedule: `${data.start_time} - ${data.end_time}`
                });

                await createMessageLog({
                    user_id: data.user_id,
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "cancellation",
                    channel: "template",
                    status: "template_sent",
                    template_name: "reservation_cancelled",
                    payload: data,
                    whatsapp_message_id:
                        response.messages?.[0]?.id
                });

                return response;

            } catch (templateError) {

                await createMessageLog({
                    user_id: data.user_id,
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "cancellation",
                    channel: "template",
                    status: "failed",
                    error_code:
                        templateError.response?.data?.error?.code,
                    error_message:
                        templateError.response?.data?.error?.message
                });

                throw templateError;
            }
        }

        await createMessageLog({
            user_id: data.user_id,
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "cancellation",
            channel: "text",
            status: "failed",
            error_code: error.response?.data?.error?.code,
            error_message: error.response?.data?.error?.message
        });

        throw error;
    }

}



