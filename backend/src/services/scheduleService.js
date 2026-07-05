import { getSchedules } from "../repositories/scheduleRepository.js";

export async function getAllSchedules() {
    return await getSchedules();
}