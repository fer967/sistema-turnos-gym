import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../api/api";
import EditScheduleForm from "../EditScheduleForm/EditScheduleForm";
import styles from "./AdminScheduleCard.module.css";

export default function AdminScheduleCard({
    schedule,
    reloadSchedules
}) {

    const [editing, setEditing] = useState(false);

    if (editing) {
        return (
            <EditScheduleForm
                schedule={schedule}
                reloadSchedules={reloadSchedules}
                onCancel={() => setEditing(false)}
            />
        );
    }

    async function deleteSchedule() {
        const confirmDelete = window.confirm(
            "¿Eliminar este horario?"
        );
        if (!confirmDelete) return;
        try {
            await api.delete(
                `/admin/schedules/${schedule.id}`
            );
            alert("Horario eliminado.");
            reloadSchedules();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "No se pudo eliminar."
            );
        }
    }


    return (
        <div className={styles.card}>
            <h3>{schedule.discipline}</h3>
            <p>Día: {schedule.day_name}</p>
            <p>{schedule.schedule}</p>
            <p>Cupos: {schedule.capacity}</p>
            <div className={styles.actions}>
                <button
                    onClick={() => setEditing(true)}
                >
                    <FaEdit />
                </button>
                <button
                    onClick={deleteSchedule}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );

}




