import styles from "./ScheduleCard.module.css";

export default function ScheduleCard({ schedule, onReserve }) {

    const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    return (
        <div className={styles.card}>
            <h3>{schedule.discipline}</h3>
            <p>Día: {days[schedule.day_of_week]}</p>
            <p>
                {schedule.start_time.slice(0, 5)}
                {" - "}
                {schedule.end_time.slice(0, 5)}
            </p>
            <p>
                Cupos:
                {" "}
                {schedule.capacity}
            </p>
            <button className={styles.reserveButton} onClick={() => onReserve(schedule.id)}>
                Reservar
            </button>
        </div>
    );
}