import axios from "axios";

const BASE_URL = process.env.WHATSAPP_BASE_URL;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;


async function sendTemplate(
    templateName,
    phone,
    parameters
) {

    console.log("================================");
    console.log("ENVIANDO PLANTILLA");
    console.log("Template:", templateName);
    console.log("Phone:", phone);

    try {
        const response = await axios.post(
            `${BASE_URL}/${PHONE_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "template",
                template: {
                    name: templateName,
                    language: {
                        code: "es_AR"
                    },
                    components: [
                        {
                            type: "body",
                            parameters
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("META TEMPLATE RESPONSE:");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("STATUS:", error.response?.status);
        console.error(
            "ERROR TEMPLATE:",
            JSON.stringify(error.response?.data, null, 2)
        );
        throw error;
    }
}


export async function sendReservationTemplate(data) {
    return sendTemplate(
        "reservation_confirmation",
        data.phone,
        [
            { type: "text", text: data.name },
            { type: "text", text: data.discipline },
            { type: "text", text: data.date },
            { type: "text", text: data.schedule }
        ]
    );
}


export async function sendCancelTemplate(data) {
    return sendTemplate(
        "reservation_cancelled",
        data.phone,
        [
            { type: "text", text: data.name },
            { type: "text", text: data.discipline },
            { type: "text", text: data.date },
            { type: "text", text: data.schedule }
        ]
    );
}



// async function sendTemplate(
//     templateName,
//     phone,
//     parameters
// ) {

//     console.log("================================");
//     console.log("ENVIANDO PLANTILLA");
//     console.log("Template:", templateName);
//     console.log("Phone:", phone);

//     const response = await axios.post(
//         `${BASE_URL}/${PHONE_ID}/messages`,
//         {
//             messaging_product: "whatsapp",
//             to: phone,
//             type: "template",
//             template: {
//                 name: templateName,
//                 language: {
//                     code: "es_AR"
//                 },
//                 components: [
//                     {
//                         type: "body",
//                         parameters
//                     }
//                 ]
//             }
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${TOKEN}`,
//                 "Content-Type": "application/json"
//             }
//         }
//     );
//     console.log("META TEMPLATE RESPONSE:");
//     console.log(response.data);
//     return response.data;
// }







