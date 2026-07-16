import db from "../config/db.js";


export async function createMessageLog(data) {
    const query = `
        INSERT INTO message_logs
        (
            user_id,
            reservation_id,
            phone,
            type,
            channel,
            status,
            whatsapp_message_id,
            error_code,
            error_message
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *;
    `;
    const values = [
        data.user_id,
        data.reservation_id,
        data.phone,
        data.type,
        data.channel,
        data.status,
        data.whatsapp_message_id,
        data.error_code,
        data.error_message
    ];
    const result = await db.query(query, values);
    return result.rows[0];
}


export async function updateMessageStatus(
    whatsappMessageId,
    status,
    errorCode = null,
    errorMessage = null
) {
    const query = `
        UPDATE message_logs
        SET
            status=$2,
            error_code=$3,
            error_message=$4,
            updated_at = NOW()
        WHERE whatsapp_message_id=$1;
    `;
    await db.query(query,[
        whatsappMessageId,
        status,
        errorCode,
        errorMessage
    ]);
}