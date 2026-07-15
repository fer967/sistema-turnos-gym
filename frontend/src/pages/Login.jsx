import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });
            login(response.data.data);
            navigate("/");
        }
        catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Email o contraseña incorrectos"
            );
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h1>Iniciar sesión</h1>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    disabled={loading}
                >
                    {
                        loading
                            ? "Ingresando..."
                            : "Ingresar"
                    }
                </button>
                <p>
                    ¿No tienes una cuenta?
                    <Link to="/register">
                        Regístrate
                    </Link>
                </p>
            </form>
        </div>
    );

}