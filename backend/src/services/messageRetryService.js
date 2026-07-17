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

    console.log("📄 Log encontrado:");               //  agrego
    console.log(log);

    if (log.retried) {
        console.log(
            "ℹ️ El mensaje ya fue reenviado anteriormente."
        );
        return;
    }

    let response;  // respuesta de plantilla
    if (
        log.template_name ===
        "reservation_confirmation"
    ) {
        response =
            await sendReservationTemplate(log.payload);      /////////
    }
    else if (
        log.template_name ===
        "reservation_cancelled"
    ) {
        response =
            await sendCancelTemplate(log.payload);
    }

    console.log("📨 Respuesta plantilla:");              //  agrego
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
            response.messages[0].id,         //  .data (elimine)
        retried: true,
        parent_message_id: log.id
    });

    await markAsRetried(log.id);
    console.log(
        "✅ Plantilla enviada correctamente."
    );

}



