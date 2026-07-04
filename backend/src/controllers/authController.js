import { registerUser } from "../services/authService.js";

import {
    successResponse,
    errorResponse
} from "../utils/apiResponse.js";

export const register = async (req, res) => {
    try {
        const user =
            await registerUser(req.body);
        return successResponse(
            res,
            201,
            "Usuario registrado correctamente.",
            user
        );
    } catch (error) {
        return errorResponse(
            res,
            400,
            error.message
        );
    }
};