import { useEffect, useState } from "react";
import api from "../api/api";
import styles from "./Schedules.module.css";
import ScheduleCard from "../components/ScheduleCard/ScheduleCard";

export default function Schedules() {

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);

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
        alert("✅ Reserva realizada correctamente.");
    } catch (error) {
        console.error(error);
        alert(
            error.response?.data?.message ||
            "Error al realizar la reserva."
        );
    }
}

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Horarios disponibles
            </h1>
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
                        schedules.map(schedule => (
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





















