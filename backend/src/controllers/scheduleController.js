import { getAllSchedules } from "../services/scheduleService.js";

export async function getSchedulesController(req, res, next) {

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