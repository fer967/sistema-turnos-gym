import { useEffect, useState } from "react";
import api from "../api/api";
import styles from "./Schedules.module.css";
import ScheduleCard from "../components/ScheduleCard/ScheduleCard";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Schedules() {

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [searchParams] = useSearchParams();
    const selectedDiscipline =
        searchParams.get("discipline");

    useEffect(() => {
        loadSchedules();
    }, []);

    async function loadSchedules() {
        try {
            const response = await api.get("/schedules");
            setSchedules(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function reserve(scheduleId) {
        try {
            await api.post("/reservations", {
                schedule_id: scheduleId,
                reservation_date: selectedDate
            });
            toast.success("Reserva realizada correctamente.");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Error al realizar la reserva."
            );
        }
    }

    const filteredSchedules = selectedDiscipline
        ? schedules.filter(
            schedule =>
                String(schedule.discipline_id) ===
                selectedDiscipline
        )
        : schedules;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Horarios disponibles
            </h1>
            {
                selectedDiscipline && (
                    <p className={styles.filterInfo}>
                        Mostrando horarios de la disciplina seleccionada.
                    </p>
                )
            }
            <div className={styles.filters}>
                <label>
                    Fecha de la reserva
                </label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            {
                loading
                    ? <p>Cargando horarios...</p>
                    :
                    <div className={styles.grid}>
                        {
                            filteredSchedules.map(schedule => (
                                <ScheduleCard
                                    key={schedule.id}
                                    schedule={schedule}
                                    onReserve={reserve}
                                />
                            ))
                        }
                    </div>
            }
        </div>
    );
}





















