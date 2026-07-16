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
    const apiError = error.response?.data?.error;
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

        await createMessageLog({
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "confirmation",
            channel: "text",
            status: "sent",
            provider_message_id: response.data?.messages?.[0]?.id
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
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "confirmation",
                    channel: "template",
                    status: "template_sent",
                    provider_message_id:
                        response.data?.messages?.[0]?.id
                });

                return response;

            } catch (templateError) {

                await createMessageLog({
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "confirmation",
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
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "confirmation",
            channel: "text",
            status: "failed",
            error_code: error.response?.data?.error?.code,
            error_message: error.response?.data?.error?.message
        });

        throw error;
    }

}



export async function notifyCancellation(data) {
    const message = `
🏋️ Gym Booking System
✅ Reserva cancelada
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
            reservation_id: data.reservation_id,
            phone: data.phone,
            type: "cancellation",
            channel: "text",
            status: "sent",
            provider_message_id: response.data?.messages?.[0]?.id
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
                    reservation_id: data.reservation_id,
                    phone: data.phone,
                    type: "cancellation",
                    channel: "template",
                    status: "template_sent",
                    provider_message_id:
                        response.data?.messages?.[0]?.id
                });

                return response;

            } catch (templateError) {

                await createMessageLog({
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



