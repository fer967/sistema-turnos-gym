import styles from "./StatsCard.module.css";

export default function StatsCard({
    icon,
    title,
    value
}){

    return(
        <div className={styles.card}>
            <div className={styles.icon}>
                {icon}
            </div>
            <h2>{value}</h2>
            <p>{title}</p>
        </div>
    );

}