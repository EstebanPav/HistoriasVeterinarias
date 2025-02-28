import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Sidebar from "../components/Sidebar"; // 📌 Importamos Sidebar
import "../Styles/EditarCita.css"; // 📌 Aseguramos que el CSS esté bien aplicado

const EditarCita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 📌 Estados para los campos de la cita
    const [fechaHora, setFechaHora] = useState(dayjs());
    const [motivo, setMotivo] = useState("");
    const [mascotaId, setMascotaId] = useState("");
    const [propietarioId, setPropietarioId] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");
    const [estado, setEstado] = useState("Pendiente"); // 📌 Estado inicial
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // 📌 Listas para los combobox
    const [mascotas, setMascotas] = useState([]);
    const [propietarios, setPropietarios] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    // 📌 Cargar datos de la cita y opciones de selección
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener detalles de la cita
                const resCita = await axios.get(`http://localhost:5000/api/ver_cita/${id}`);
                const cita = resCita.data;

                setFechaHora(dayjs(cita.fecha_hora));
                setMotivo(cita.motivo);
                setMascotaId(cita.mascota_id);
                setPropietarioId(cita.propietario_id);
                setVeterinarioId(cita.veterinario_id);
                setEstado(cita.estado);

                // Obtener listas de selección
                const [resMascotas, resPropietarios, resVeterinarios] = await Promise.all([
                    axios.get("http://localhost:5000/api/mascotas_citas"),
                    axios.get("http://localhost:5000/api/propietarios_cita"),
                    axios.get("http://localhost:5000/api/veterinarios_cita"),
                ]);

                setMascotas(resMascotas.data);
                setPropietarios(resPropietarios.data);
                setVeterinarios(resVeterinarios.data);

                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setMessage("❌ Error al cargar los datos de la cita.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // 📌 Guardar cambios de la cita
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.put(`http://localhost:5000/api/editar_cita/${id}`, {
                fecha_hora: fechaHora.format("YYYY-MM-DD HH:mm:ss"),
                motivo,
                mascota_id: mascotaId,
                propietario_id: propietarioId,
                veterinario_id: veterinarioId,
                estado
            });

            setMessage("✅ Cita actualizada correctamente.");
            
            // 🔹 Esperar 1.5 segundos y redirigir a "ver-citas"
            setTimeout(() => {
                navigate("/ver-citas");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            setMessage("❌ Error al actualizar la cita.");
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* 📌 Sidebar alineada correctamente al costado */}

            <div className="editar-cita-content">
                <h2 className="editar-cita-title">📅 Editar Cita Clínica</h2>

                {loading ? (
                    <p className="loading-message">Cargando datos...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="editar-cita-form">
                        <label>📅 Fecha y Hora:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Selecciona nueva fecha y hora"
                                value={fechaHora}
                                onChange={(newValue) => setFechaHora(newValue)}
                                disablePast
                            />
                        </LocalizationProvider>

                        <label>📝 Motivo:</label>
                        <textarea 
                            value={motivo} 
                            onChange={(e) => setMotivo(e.target.value)}
                        ></textarea>

                        <label>🐶 Mascota:</label>
                        <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
                            <option value="">Seleccione una mascota</option>
                            {mascotas.map((m) => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>

                        <label>👤 Propietario:</label>
                        <select value={propietarioId} onChange={(e) => setPropietarioId(e.target.value)}>
                            <option value="">Seleccione un propietario</option>
                            {propietarios.map((p) => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>

                        <label>👨‍⚕️ Veterinario:</label>
                        <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)}>
                            <option value="">Seleccione un veterinario</option>
                            {veterinarios.map((v) => (
                                <option key={v.id} value={v.id}>{v.nombre}</option>
                            ))}
                        </select>

                        <label>📌 Estado de la Cita:</label>
                        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmada">Confirmada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>

                        <button type="submit" className="btn-guardar">💾 Guardar Cambios</button>
                        <button type="button" className="btn-cancelar" onClick={() => navigate("/ver-citas")}>❌ Cancelar</button>
                    </form>
                )}

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default EditarCita;
