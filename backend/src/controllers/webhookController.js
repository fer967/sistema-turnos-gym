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


export function receiveWebhook(req, res) {
    console.log("====================================");
    console.log("WEBHOOK RECIBIDO");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("====================================");
    res.sendStatus(200);
}


// export function receiveWebhook(req, res) {
//     console.log(
//         "📨 Evento recibido desde Meta:"
//     );
//     console.log(
//         JSON.stringify(req.body, null, 2)
//     );
//     res.sendStatus(200);
// }