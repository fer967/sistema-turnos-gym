import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {

    return (

        <header className={styles.header}>

            <h1>Dashboard</h1>

            <p>

                Bienvenido al panel de administración del gimnasio.

            </p>

        </header>

    );

}