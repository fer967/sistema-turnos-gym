import styles from "./DisciplineCard.module.css";
import {
    FaDumbbell,
    FaBicycle,
    FaHeartbeat
} from "react-icons/fa";

import { GiMeditation } from "react-icons/gi";

function getIcon(name) {
    switch (name) {
        case "Fitness":
            return <FaDumbbell />;
        case "CrossFit":
            return <FaHeartbeat />;
        case "Spinning":
            return <FaBicycle />;
        case "Yoga":
            return <GiMeditation />;
        default:
            return <FaDumbbell />;
    }
}

export default function DisciplineCard({

    icon,
    title,
    description

}) {

    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                {getIcon(title)}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}