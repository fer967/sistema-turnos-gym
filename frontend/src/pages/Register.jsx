import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(
                "/auth/register",
                form
            );
            alert("Usuario registrado correctamente.");
            navigate("/login");
        }
        catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "No fue posible registrar el usuario."
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
                <h1>Crear cuenta</h1>
                <input
                    name="name"
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button disabled={loading}>
                    {
                        loading
                            ? "Registrando..."
                            : "Registrarse"
                    }
                </button>
                <p>
                    ¿Ya tienes una cuenta?
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </div>
    );

}