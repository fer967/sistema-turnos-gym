import { Router } from "express";

import { sendTestMessage } from "../controllers/testController.js";

const router = Router();

router.post(
    "/whatsapp",
    sendTestMessage
);

export default router;