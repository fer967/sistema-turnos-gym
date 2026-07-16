import {
    findMessageByWhatsappId,
    markAsRetried, createMessageLog
} from "../repositories/messageRepository.js";

import {
    sendReservationTemplate,
    sendCancelTemplate
} from "./whatsappTemplateService.js";


export async function retryFailedMessage(status) {
    if (
        status.status !== "failed" ||
        status.errors?.[0]?.code !== 131047
    ) {
        return;
    }
    const log = await findMessageByWhatsappId(status.id);
    if (!log) {
        console.warn(
            "⚠️ No existe el mensaje en message_logs."
        );
        return;
    }
    if (log.retried) {
        console.log(
            "ℹ️ El mensaje ya fue reenviado anteriormente."
        );
        return;
    }

    let response;
    if (
        log.template_name ===
        "reservation_confirmation"
    ) {
        response =
            await sendReservationTemplate(log.payload);
    }
    else if (
        log.template_name ===
        "reservation_cancelled"
    ) {
        response =
            await sendCancelTemplate(log.payload);
    }

    await createMessageLog({
        user_id: log.user_id,
        reservation_id: log.reservation_id,
        phone: log.phone,
        type: log.type,
        channel: "template",
        status: "sent",
        template_name: log.template_name,
        payload: log.payload,
        whatsapp_message_id:
            response.data.messages[0].id,
        retried: true,
        parent_message_id: log.id
    });

    await markAsRetried(log.id);
    console.log(
        "✅ Plantilla enviada correctamente."
    );

}



// export async function retryFailedMessage(status) {

//     if (
//         status.status !== "failed" ||
//         status.errors?.[0]?.code !== 131047
//     ) {
//         return;
//     }

//     const log = await findMessageByWhatsappId(status.id);

//     if (!log) {
//         console.warn(
//             "⚠️ No existe el mensaje en message_logs."
//         );
//         return;
//     }

//     if (log.retried) {
//         console.log(
//             "ℹ️ El mensaje ya fue reenviado anteriormente."
//         );
//         return;
//     }

//     try {

//         if (
//             log.template_name ===
//             "reservation_confirmation"
//         ) {

//             await sendReservationTemplate(log.payload);

//         } else if (
//             log.template_name ===
//             "reservation_cancelled"
//         ) {

//             await sendCancelTemplate(log.payload);

//         }

//         await markAsRetried(log.id);

//         console.log(
//             "✅ Plantilla enviada correctamente."
//         );

//     } catch (error) {

//         console.error(
//             "❌ Error reenviando plantilla:",
//             error.response?.data || error.message
//         );

//     }

// }