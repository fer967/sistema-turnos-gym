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

    console.log("📄 Log encontrado:");
    console.log(log);

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

        response = await sendReservationTemplate({
            phone: log.payload.phone,
            name: log.payload.name,
            discipline: log.payload.discipline,
            date: log.payload.date,
            schedule: `${log.payload.start_time} - ${log.payload.end_time}`
        });

    }
    else if (
        log.template_name ===
        "reservation_cancelled"
    ) {

        response = await sendCancelTemplate({
            phone: log.payload.phone,
            name: log.payload.name,
            discipline: log.payload.discipline,
            date: log.payload.date,
            schedule: `${log.payload.start_time} - ${log.payload.end_time}`
        });

    }

    console.log("📨 Respuesta plantilla:");
    console.log(response);
    console.log(
        "Nuevo WAMID:",
        response.messages?.[0]?.id
    );

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
            response.messages[0].id,
        retried: true,
        parent_message_id: log.id
    });

    await markAsRetried(log.id);
    console.log(
        "✅ Plantilla enviada correctamente."
    );

}



