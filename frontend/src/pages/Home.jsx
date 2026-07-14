import styles from "./Home.module.css";
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

    const disciplineImages = {
        Pesas: "pesas.jpg",
        Spinning: "spinning.jpg",
        Pilates: "pilates.jpg",
        Funcional: "funcional.jpg",
        Fitness: "fitness.jpg"
    };

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.overlay}>
                    <h1>Gym Booking System</h1>
                    <p>
                        Reserva tus clases de Pesas, Spinning,
                        Pilates, Funcional y Fitness
                        desde cualquier dispositivo.
                    </p>
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
                                    id={discipline.id}
                                    title={discipline.name}
                                    description={discipline.description}
                                    image={`/images/disciplines/${disciplineImages[discipline.name]}`}
                                />
                            ))
                    }
                </div>
            </section>
        </div>
    );
}


















