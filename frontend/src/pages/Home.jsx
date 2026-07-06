import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import {

    FaDumbbell,
    FaBicycle,
    FaHeartbeat

} from "react-icons/fa";

import { GiMeditation } from "react-icons/gi";
import DisciplineCard from "../components/DisciplineCard/DisciplineCard";
import { useEffect, useState } from "react";
import api from "../api/api";


export default function Home() {
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDisciplines();
    }, []);

    async function loadDisciplines() {
        setLoading(true);
        try {
            const response = await api.get("/disciplines");
            setDisciplines(response.data.data);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1>Entrena cuando quieras</h1>
                <p>
                    Reserva tus clases favoritas de manera rápida,
                    simple y desde cualquier dispositivo.
                </p>
                <div className={styles.buttons}>
                    <Link
                        to="/register"
                        className={styles.primary}
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/schedules"
                        className={styles.secondary}
                    >
                        Ver Horarios
                    </Link>
                </div>
            </section>

            <section className={styles.disciplines}>
                <h2>Nuestras disciplinas</h2>
                <div className={styles.grid}>
                    {
                        loading
                            ? <p>Cargando disciplinas...</p>
                            : disciplines.map((discipline) => (
                                <DisciplineCard
                                    key={discipline.id}
                                    title={discipline.name}
                                    description={discipline.description}
                                />
                            ))
                    }
                </div>
            </section>

        </div>
    );
}


















