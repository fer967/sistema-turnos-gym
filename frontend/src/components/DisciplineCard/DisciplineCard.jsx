import styles from "./DisciplineCard.module.css";
import { useNavigate } from "react-router-dom";

export default function DisciplineCard({
    id,
    title,
    description,
    image
}) {
    const navigate = useNavigate();

    return (
        // <div className={styles.card}>
        <div
            className={styles.card}
            onClick={() =>
                navigate(`/schedules?discipline=${id}`)
            }
        >
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={title}
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

