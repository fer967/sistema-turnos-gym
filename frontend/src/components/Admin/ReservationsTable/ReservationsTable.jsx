import { useEffect, useState } from "react";
import api from "../../../api/api";
import styles from "./ReservationsTable.module.css";

export default function ReservationsTable() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReservations();
    }, []);

    async function loadReservations() {

        try {
            const response = await api.get("/admin/reservations");
            setReservations(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <p>Cargando reservas...</p>;
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Disciplina</th>
                        <th>Día</th>
                        <th>Horario</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>

                </thead>

                <tbody>

                    {

                        reservations.map((reservation) => (

                            <tr key={reservation.id}>

                                <td>{reservation.name}</td>
                                <td>{reservation.discipline}</td>
                                <td>{reservation.day_name}</td>

                                <td>{reservation.schedule}</td>

                                <td>
                                    {new Date(
                                        reservation.reservation_date
                                    ).toLocaleDateString("es-AR")}
                                </td>

                                <td>
                                    {reservation.status}
                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}