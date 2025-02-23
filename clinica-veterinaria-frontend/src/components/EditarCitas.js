import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const EditarCita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fechaHora, setFechaHora] = useState(dayjs());
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // 📌 Cargar datos de la cita
    useEffect(() => {
        const fetchCita = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/ver_cita/${id}`);
                const cita = response.data;
                setFechaHora(dayjs(cita.fecha_hora));
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener la cita:", error);
                setMessage("❌ Error al cargar la cita.");
                setLoading(false);
            }
        };

        fetchCita();
    }, [id]);

    // 📌 Guardar cambios de fecha y hora
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        try {
            await axios.put(`http://localhost:5000/api/editar_cita/${id}`, {
                fecha_hora: fechaHora.format("YYYY-MM-DD HH:mm:ss"),
            });
    
            setMessage("✅ Cita actualizada correctamente.");
    
            // 🔹 Esperar 1.5 segundos y redirigir a "ver-citas"
            setTimeout(() => {
                navigate("/ver-citas"); 
                window.location.reload(); // 🔹 Recargar página para mostrar cambios
            }, 1500);
    
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            setMessage("❌ Error al actualizar la cita.");
        }
    };
    

    return (
        <div className="editar-cita-container">
            <h2>📅 Editar Fecha y Hora de la Cita</h2>

            {loading ? (
                <p>Cargando cita...</p>
            ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Selecciona nueva fecha y hora"
                        value={fechaHora}
                        onChange={(newValue) => setFechaHora(newValue)}
                        disablePast
                    />
                </LocalizationProvider>
            )}

            <form onSubmit={handleSubmit}>
                <button type="submit">💾 Guardar Cambios</button>
                <button type="button" onClick={() => navigate("/ver-citas")}>❌ Cancelar</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default EditarCita;
