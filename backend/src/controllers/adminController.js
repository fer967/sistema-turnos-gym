import {
    createNewSchedule, getAllReservations, getAllSchedules, 
    updateSchedule, deleteSchedule
} from "../services/adminService.js";

export async function createSchedule(req, res, next) {
    try {
        const schedule = await createNewSchedule(req.body);
        res.status(201).json({
            success: true,
            message: "Horario creado correctamente",
            data: schedule
        });
    } catch (error) {
        next(error);
    }
}


export async function listReservations(req, res, next) {
    try {
        const reservations = await getAllReservations();
        res.json({
            success: true,
            data: reservations
        });
    } catch (error) {
        next(error);
    }
}


export async function listSchedules(req, res, next) {
    try {
        const schedules = await getAllSchedules();
        res.json({
            success: true,
            data: schedules
        });
    } catch (error) {
        next(error);
    }
}


export async function editSchedule(req, res, next) {
    try {
        console.log("BODY:", req.body);
        const schedule = await updateSchedule(
            req.params.id.trim(),
            req.body
        );
        res.json({
            success: true,
            message: "Horario actualizado",
            data: schedule
        });
    } catch (error) {
        next(error);
    }
}


export async function removeSchedule(req, res, next) {
    try {
        const schedule = await deleteSchedule(
            req.params.id.trim()
        );
        res.json({
            success: true,
            message: "Horario eliminado",
            data: schedule
        });
    } catch (error) {
        if (
            error.message ===
            "No se puede eliminar el horario porque tiene reservas asociadas."
        ) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        next(error);
    }
}


