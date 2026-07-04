import bcrypt from "bcrypt";

import {
    findUserByEmail,
    createUser
} from "../repositories/authRepository.js";

export const registerUser = async (userData) => {

    const existingUser =
        await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("El email ya está registrado.");
    }

    const passwordHash =
        await bcrypt.hash(userData.password, 10);

    const newUser =
        await createUser({
            name: userData.name,
            email: userData.email,
            passwordHash,
            phone: userData.phone
        });

    return newUser;
};