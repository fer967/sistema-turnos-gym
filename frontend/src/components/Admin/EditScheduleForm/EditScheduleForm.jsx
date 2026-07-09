import { useEffect, useState } from "react";
import api from "../../../api/api";
import ScheduleFields from "../ScheduleFields/ScheduleFields";
import styles from "./EditScheduleForm.module.css";

export default function EditScheduleForm({
    schedule,
    reloadSchedules,
    onCancel
}) {

    const [disciplines, setDisciplines] = useState([]);

    const [form, setForm] = useState({
        discipline_id: schedule.discipline_id,
        day_of_week: schedule.day_of_week,
        start_time: schedule.start_time.slice(0, 5),
        end_time: schedule.end_time.slice(0, 5),
        capacity: schedule.capacity
    });

    useEffect(() => {
        loadDisciplines();
    }, []);

    async function loadDisciplines() {
        try {
            const response = await api.get("/disciplines");
            setDisciplines(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.put(
                `/admin/schedules/${schedule.id}`,
                form
            );
            alert("✅ Horario actualizado.");
            reloadSchedules();
            onCancel();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error al actualizar el horario."
            );
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h2>Editar horario</h2>
            <ScheduleFields
                form={form}
                disciplines={disciplines}
                handleChange={handleChange}
            />
            <div className={styles.buttons}>
                <button type="submit">
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );

}




