import api from "../../api/api";
import styles from "./ReservationCard.module.css";

const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

export default function ReservationCard({
    reservation,
    onRefresh
}) {

    async function cancelReservation() {
        const confirmCancel = window.confirm(
            "¿Deseas cancelar esta reserva?"
        );
        if (!confirmCancel) return;
        try {
            await api.patch(
                `/reservations/cancel/${reservation.id}`
            );
            alert("Reserva cancelada correctamente.");
            onRefresh();
        } catch (error) {
            console.error(error);
            alert("No fue posible cancelar la reserva.");
        }
    }

    return (
        <div className={styles.card}>
            <h2>
                {reservation.discipline}
            </h2>
            <p>
                {days[reservation.day_of_week]}
            </p>
            <p>
                {reservation.start_time.slice(0, 5)}
                {" - "}
                {reservation.end_time.slice(0, 5)}
            </p>
            <p>
                <strong>Fecha:</strong>
                {" "}
                {new Date(reservation.reservation_date).toLocaleDateString("es-AR")}
            </p>
            <p>
                <strong>Estado:</strong>
                {" "}
                <span
                    className={
                        reservation.status === "reserved"
                            ? styles.reserved
                            : styles.cancelled
                    }
                >
                    {
                        reservation.status === "reserved"
                            ? "Reservada"
                            : "Cancelada"
                    }
                </span>
            </p>
            {
                reservation.status === "reserved" && (
                    <button
                        onClick={cancelReservation}
                    >
                        Cancelar reserva
                    </button>
                )
            }
        </div>
    );
}


