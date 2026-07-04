export const getAllDisciplines = (req, res) => {
    res.json({
        success: true,
        message: "Listado de disciplinas",
        data: []
    });
};