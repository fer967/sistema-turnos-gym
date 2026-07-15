import { useState } from "react";
import ReservationsTable from "../components/Admin/ReservationsTable/ReservationsTable";
import ScheduleList from "../components/Admin/ScheduleList/ScheduleList";
import ScheduleForm from "../components/Admin/ScheduleForm/ScheduleForm";
import styles from "./AdminDashboard.module.css";
import {
    FaCalendarAlt,
    FaClipboardList,
    FaPlusCircle
} from "react-icons/fa";

export default function AdminDashboard() {

    const [tab, setTab] = useState("reservations");

    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Administra horarios, reservas y el funcionamiento del gimnasio.
                    </p>
                </div>
            </header>


            <div className={styles.stats}>
                <div
                    className={`${styles.card} ${tab === "reservations" ? styles.selected : ""
                        }`}
                    onClick={() => setTab("reservations")}
                >
                    <FaClipboardList className={styles.icon} />
                    <h2>Reservas</h2>
                    <span>Gestionar reservas</span>
                </div>
                <div
                    className={`${styles.card} ${tab === "schedules" ? styles.selected : ""
                        }`}
                    onClick={() => setTab("schedules")}
                >
                    <FaCalendarAlt className={styles.icon} />
                    <h2>Horarios</h2>
                    <span>Administrar horarios</span>
                </div>
                <div
                    className={`${styles.card} ${tab === "create" ? styles.selected : ""
                        }`}
                    onClick={() => setTab("create")}
                >
                    <FaPlusCircle className={styles.icon} />
                    <h2>Nuevo horario</h2>
                    <span>Crear una clase</span>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>
                {
                    tab === "reservations"
                        ? "📋 Gestión de Reservas"
                        : tab === "schedules"
                            ? "📅 Gestión de Horarios"
                            : "➕ Crear Nuevo Horario"
                }
            </h2>


            <div className={styles.content}>
                {tab === "reservations" && <ReservationsTable />}
                {tab === "schedules" && <ScheduleList />}
                {tab === "create" && <ScheduleForm />}
            </div>

        </div>
    );

}