import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import axios from "axios";
import "../Styles/Calendario.css";
import Sidebar from "../components/Sidebar"; // 🔹 Importamos Sidebar

const Calendario = () => {
    dayjs.locale("es");
    const today = dayjs();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(today);
    const [motivo, setMotivo] = useState("");
    const [propietarioId, setPropietarioId] = useState("");
    const [veterinarioId, setVeterinarioId] = useState("");
    const [mascotaId, setMascotaId] = useState("");
    const [propietarios, setPropietarios] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propResponse, vetResponse, mascResponse] = await Promise.all([
                    axios.get("http://localhost:5000/api/propietarios_cita"),
                    axios.get("http://localhost:5000/api/veterinarios_cita"),
                    axios.get("http://localhost:5000/api/mascotas_citas"),
                ]);
                setPropietarios(propResponse.data);
                setVeterinarios(vetResponse.data);
                setMascotas(mascResponse.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setMessage("❌ Error al cargar los datos.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!selectedDate || !motivo.trim() || !propietarioId || !veterinarioId || !mascotaId) {
            setMessage("❌ Todos los campos son obligatorios.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/citas", {
                fecha_hora: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
                motivo,
                propietario_id: propietarioId,
                veterinario_id: veterinarioId,
                mascota_id: mascotaId,
            });

            setMessage("✅ Cita registrada correctamente.");
            setMotivo("");
            setPropietarioId("");
            setVeterinarioId("");
            setMascotaId("");
            setSelectedDate(today);
        } catch (error) {
            console.error("Error al registrar la cita:", error);
            setMessage("❌ Error al registrar la cita.");
        }
    };

    return (
        <div className="dashboard-container">
        <Sidebar /> {/* 📌 Usamos el nuevo Sidebar */}
        <div className="calendario-container">
            <h2>📅 Agendar una Cita</h2>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Selecciona fecha y hora"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    disablePast
                    minDateTime={today}
                />
            </LocalizationProvider>

            <form onSubmit={handleSubmit} className="formulario-cita">
                <label>Motivo de la cita:</label>
                <input 
                    type="text"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    required
                    placeholder="Ejemplo: Vacunación, Consulta, etc."
                />

                <label>Selecciona el Propietario:</label>
                <select value={propietarioId} onChange={(e) => setPropietarioId(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {propietarios.map((prop) => (
                        <option key={prop.id} value={prop.id}>
                            {prop.nombre} ({prop.celular || "Sin teléfono"})
                        </option>
                    ))}
                </select>

                <label>Selecciona la Mascota:</label>
                <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {mascotas.filter((m) => m.propietario_id === Number(propietarioId)).map((m) => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                </select>

                <label>Selecciona el Veterinario:</label>
                <select value={veterinarioId} onChange={(e) => setVeterinarioId(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {veterinarios.map((vet) => (
                        <option key={vet.id} value={vet.id}>{vet.nombre} ({vet.celular || "Sin teléfono"})</option>
                    ))}
                </select>

                <button type="submit">Guardar Cita</button>
                <button type="button" onClick={() => navigate("/ver-citas")}>📅 Ver Citas</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
        </div>
    );
};

export default Calendario;
