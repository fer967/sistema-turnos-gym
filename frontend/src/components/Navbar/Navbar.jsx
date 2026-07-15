import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    FaBars,
    FaTimes
} from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const firstName = user?.name?.split(" ")[0];

    function handleLogout() {
        logout();
        setMenuOpen(false);
        navigate("/");
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav className={styles.navbar}>

            <Link
                to="/"
                className={styles.logo}
                onClick={closeMenu}
            >
                <span className={styles.logoIcon}>🏋️</span>
                <div>
                    <h2>Gym Booking</h2>
                    <small>Reserva de clases</small>
                </div>
            </Link>

            <button
                className={styles.menuButton}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {
                    menuOpen
                        ? <FaTimes />
                        : <FaBars />
                }
            </button>
            <div
                className={`${styles.links} ${menuOpen ? styles.active : ""}`}
            >
                <NavLink to="/" onClick={closeMenu}>
                    Inicio
                </NavLink>
                <NavLink to="/schedules" onClick={closeMenu}>
                    Horarios
                </NavLink>

                {
                    user?.role === "client" && (
                        <NavLink
                            to="/my-reservations"
                            onClick={closeMenu}
                        >
                            Mis Reservas
                        </NavLink>
                    )
                }

                {
                    user?.role === "admin" && (
                        <NavLink
                            to="/admin"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </NavLink>
                    )
                }
                {
                    !user && (
                        <>
                            <NavLink
                                to="/login"
                                onClick={closeMenu}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                onClick={closeMenu}
                            >
                                Registro
                            </NavLink>
                        </>
                    )
                }
                {
                    user && (
                        <div>

                            <div className={styles.userInfo}>
                                <span className={styles.avatar}>
                                    {user.role === "admin" ? "🛡️" : "👤"}
                                </span>
                                <div>
                                    <small>
                                        {
                                            user.role === "admin"
                                                ? "Administrador"
                                                : "Bienvenido"
                                        }
                                    </small>
                                    <strong>{firstName}</strong>
                                </div>
                            </div>

                            <button
                                className={styles.logout}
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}







