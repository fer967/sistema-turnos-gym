import { useEffect, useState } from "react";
import api from "../../../api/api";
import AdminScheduleCard from "../AdminScheduleCard/AdminScheduleCard";
import styles from "./ScheduleList.module.css";

export default function ScheduleList() {

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

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
    if (loading) {
        return <p>Cargando horarios...</p>;
    }

    return (
        <div className={styles.grid}>
            {
                schedules.map(schedule => (
                    <AdminScheduleCard
                        key={schedule.id}
                        schedule={schedule}
                        reloadSchedules={loadSchedules}
                    />
                ))
            }
        </div>
    );

}