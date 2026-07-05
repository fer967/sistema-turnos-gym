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


// temporal para pruebas
// export const getAllDisciplines = (req, res) => {
//     res.json({
//         success: true,
//         message: "Listado de disciplinas",
//         data: []
//     });
// };