import {
    createScheduleRepository, getAllReservationsRepository,
    getAllSchedulesRepository, updateScheduleRepository,
    deleteScheduleRepository, scheduleHasReservations
} from "../repositories/adminRepository.js";

export async function createNewSchedule(data) {
    return await createScheduleRepository(data);
}

export async function getAllReservations() {
    return await getAllReservationsRepository();
}


export async function getAllSchedules() {
    return await getAllSchedulesRepository();
}


export async function updateSchedule(id, data) {
    return await updateScheduleRepository(id, data);
}


export async function deleteSchedule(id) {
    const hasReservations = await scheduleHasReservations(id);
    if (hasReservations) {
        throw new Error(
            "No se puede eliminar el horario porque tiene reservas asociadas."
        );
    }
    return await deleteScheduleRepository(id);
}


