import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res, next) {
    try {
        const user = await registerUser(req.body);        
        res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente",
            data: user
        });
    } catch (error) {
        next(error);
    }
}


export async function login(req, res, next) {
    try {
        const result = await loginUser(req.body);
        res.json({
            success: true,
            message: "Login exitoso",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

// export async function login(req, res) {
//     res.json({
//         success: true,
//         message: "Login (pendiente)"
//     });
// }

