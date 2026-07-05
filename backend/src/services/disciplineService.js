import { getDisciplines } from "../repositories/disciplineRepository.js";

export async function getAllDisciplines() {
    return await getDisciplines();
}