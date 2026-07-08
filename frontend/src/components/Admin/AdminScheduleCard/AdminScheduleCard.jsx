import styles from "./AdminScheduleCard.module.css";

import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminScheduleCard({ schedule }) {

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

            <h3>

                {schedule.discipline}

            </h3>

            <p>

                Día: {days[schedule.day_of_week]}

            </p>

            <p>

                {schedule.start_time.slice(0,5)}

                {" - "}

                {schedule.end_time.slice(0,5)}

            </p>

            <p>

                Cupos: {schedule.capacity}

            </p>

            <div className={styles.actions}>

                <button>

                    <FaEdit />

                </button>

                <button>

                    <FaTrash />

                </button>

            </div>

        </div>

    );

}