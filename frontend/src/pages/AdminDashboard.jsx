import { useState } from "react";
import ReservationsTable from "../components/Admin/ReservationsTable/ReservationsTable";
import ScheduleList from "../components/Admin/ScheduleList/ScheduleList";
import ScheduleForm from "../components/Admin/ScheduleForm/ScheduleForm";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {

    const [tab, setTab] = useState("reservations");

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Panel de Administración
            </h1>
            <div className={styles.tabs}>
                <button
                    className={tab === "reservations" ? styles.active : ""}
                    onClick={() => setTab("reservations")}
                >
                    Reservas
                </button>
                <button
                    className={tab === "schedules" ? styles.active : ""}
                    onClick={() => setTab("schedules")}
                >
                    Horarios
                </button>
                <button
                    className={tab === "create" ? styles.active : ""}
                    onClick={() => setTab("create")}
                >
                    Nuevo horario
                </button>
            </div>
            <div className={styles.content}>
                {tab === "reservations" && <ReservationsTable />}
                {tab === "schedules" && <ScheduleList />}
                {tab === "create" && <ScheduleForm />}
            </div>
        </div>
    );

}