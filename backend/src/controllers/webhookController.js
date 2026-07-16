import { updateMessageStatus } from "../repositories/messageRepository";
import { retryFailedMessage } from "../services/messageRetryService";


export function verifyWebhook(req, res) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (
        mode === "subscribe" &&
        token === process.env.WHATSAPP_VERIFY_TOKEN
    ) {
        console.log("✅ Webhook verificado por Meta.");
        return res.status(200).send(challenge);
    }
    console.log("❌ Verificación de webhook fallida.");
    return res.sendStatus(403);
}


export async function receiveWebhook(req, res) {
    console.log("====================================");
    console.log("WEBHOOK RECIBIDO");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("====================================");
    try {
        const statuses =
            req.body.entry?.[0]
                ?.changes?.[0]
                ?.value?.statuses || [];
        for (const status of statuses) {
            await updateMessageStatus(
                status.id,
                status.status,
                status.errors?.[0]?.code,
                status.errors?.[0]?.message
            );
            await retryFailedMessage(status);
        }
    } catch (error) {
        console.error(error);
    }
    res.sendStatus(200);
}

