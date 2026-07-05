import bcrypt from "bcrypt";
import {
    findUserByEmail,
    createUser
} from "../repositories/userRepository.js";
import { generateToken } from "../utils/generateToken.js";

export async function registerUser(data) {
    const exists = await findUserByEmail(data.email);        
    if (exists) {
        throw new Error("El email ya está registrado");
    }
    const password_hash = await bcrypt.hash(data.password, 10);
    const user = await createUser({
        name: data.name,
        email: data.email,
        password_hash,
        phone: data.phone || null,
        role: "client"
    });
    return user;
}

export async function loginUser(data) {

    const user = await findUserByEmail(data.email);

    if (!user) {
        throw new Error("Email o contraseña incorrectos");
    }

    const passwordCorrect = await bcrypt.compare(
        data.password,
        user.password_hash
    );

    if (!passwordCorrect) {
        throw new Error("Email o contraseña incorrectos");
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };

}


