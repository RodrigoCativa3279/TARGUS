import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./pagConfig.css";

export default function PagConfig() {
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        modo_oscuro: false,
        musica_activa: true,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUsuario(parsedUser);
        setFormData({
            username: parsedUser.username || "",
            email: parsedUser.email || "",
            password: "",
            modo_oscuro: parsedUser.modo_oscuro || false,
            musica_activa: parsedUser.musica_activa ?? true,
        });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/auth/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Error al actualizar los datos");
                return;
            }

            alert("✅ Cambios guardados correctamente");

            const updatedUser = {
                ...usuario,
                username: formData.username,
                email: formData.email,
                modo_oscuro: formData.modo_oscuro,
                musica_activa: formData.musica_activa,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUsuario(updatedUser);
        } catch (error) {
            console.error("❌ Error al actualizar cuenta:", error);
            alert("Error al conectar con el servidor");
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("¿Seguro que querés eliminar tu cuenta? Esta acción es irreversible.")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/auth/delete", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Error al eliminar la cuenta");
                return;
            }

            alert("Cuenta eliminada correctamente");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("❌ Error al eliminar cuenta:", error);
            alert("Error al conectar con el servidor");
        }
    };

    if (!usuario) return <p>Cargando...</p>;

    return (
        <>
            <Navbar />

            <div className="background">
                <div className="config-container">
                    <h2>Configuración de cuenta</h2>

                    <form onSubmit={handleSave} className="config-form">
                        <label>Nombre de usuario</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />

                        <label>Correo electrónico</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />

                        <label>Nueva contraseña</label>
                        <input type="password" name="password" placeholder="Dejar vacío para no cambiarla" value={formData.password} onChange={handleChange} />

                        <div className="config-opciones">
                            <label>
                                <input type="checkbox" name="modo_oscuro" checked={formData.modo_oscuro} onChange={handleChange} />
                                Modo oscuro
                            </label>

                            <label>
                                <input type="checkbox" name="musica_activa" checked={formData.musica_activa} onChange={handleChange} />
                                Música activada
                            </label>
                        </div>

                        <button type="submit" className="btn-guardar">
                            Guardar cambios
                        </button>
                    </form>

                    <hr />

                    <button className="btn-eliminar" onClick={handleDeleteAccount}>
                        Eliminar cuenta
                    </button>
                </div>
            </div>
        </>
    );
}
