import { useEffect, useState } from "react";
import api from "../api/api";
import styles from "./MyReservation.module.css";
import ReservationCard from "../components/ReservationCard/ReservationCard";

export default function MyReservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReservations();
    }, []);

    async function loadReservations() {
        try {
            const response = await api.get("/reservations/my-reservations");
            setReservations(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1>Mis Reservaciones</h1>
                <p>
                    Aquí puedes consultar y administrar todas tus reservaciones.
                </p>
            </div>
            {
                loading
                ? <p>Cargando...</p>
                :
                <div className={styles.grid}>
                    {
                        reservations.map(reservation => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onRefresh={loadReservations}
                            />
                        ))
                    }
                </div>
            }
        </div>
    );

}