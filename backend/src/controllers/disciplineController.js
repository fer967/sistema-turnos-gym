import { getAllDisciplines } from "../services/disciplineService.js";

export async function getAllDisciplinesController(req, res, next) {
    try {
        const disciplines = await getAllDisciplines();
        res.json({
            success: true,
            data: disciplines
        });
    } catch (error) {
        next(error);
    }
}


