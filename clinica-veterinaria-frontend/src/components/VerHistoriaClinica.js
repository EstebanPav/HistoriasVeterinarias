import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/VerHistoriasClinicas.css";
import { FaPaw, FaClinicMedical, FaCalendarAlt } from 'react-icons/fa';

const VerHistoriaClinica = () => {
    const [mascotas, setMascotas] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState("");
    const [historiasClinicas, setHistoriasClinicas] = useState([]);
    const navigate = useNavigate();

    // 🔹 Función para navegar entre pestañas
    const goToHome = (tab) => {
        navigate(`/?tab=${tab}&forceTab=true`);
    };

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/mascotas");
                setMascotas(response.data);
            } catch (error) {
                console.error("Error al obtener las mascotas:", error);
            }
        };
        fetchMascotas();
    }, []);

    const handleMascotaChange = async (e) => {
        const mascotaId = e.target.value;
        setSelectedMascota(mascotaId);

        try {
            const response = await axios.get(`http://localhost:5000/api/historia_clinica/${mascotaId}`);
            setHistoriasClinicas(response.data);
        } catch (error) {
            console.error("Error al obtener las historias clínicas:", error);
            setHistoriasClinicas([]);
        }
    };

    // 🔹 Función para eliminar una historia clínica
    const handleEliminarHistoria = async (historiaId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta historia clínica?");
        if (!confirmacion) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/historia_clinica/${historiaId}`);
            if (response.status === 200) {
                alert("✅ Historia clínica eliminada correctamente.");
                setHistoriasClinicas(historiasClinicas.filter(historia => historia.historia_id !== historiaId));
            } else {
                alert("❌ No se pudo eliminar la historia clínica.");
            }
        } catch (error) {
            console.error("❌ Error al eliminar la historia clínica:", error);
            alert("❌ No se pudo eliminar la historia clínica.");
        }
    };

    return (
        <div className="dashboard-container">
            {/* 📌 Sidebar */}
            <nav className="sidebar">
                <ul>
                    <li onClick={() => goToHome("clinica")}>
                        <FaClinicMedical /> Información Clínica
                    </li>
                    <li onClick={() => goToHome("mascotas")}>
                        <FaPaw /> Mascotas
                    </li>
                    <li onClick={() => goToHome("calendario")}>
                        <FaCalendarAlt /> Calendario
                    </li>
                </ul>
            </nav>

            <div className="historia-container">
                <h2>📜 Historial Clínico</h2>

                <label>Selecciona una mascota:</label>
                <select value={selectedMascota} onChange={handleMascotaChange}>
                    <option value="">Seleccione una mascota</option>
                    {mascotas.map((m) => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                </select>

                {historiasClinicas.length > 0 && (
                    <div className="tabla-container">
                        <table className="historia-table">
                            <thead>
                                <tr>
                                    <th>📅 Fecha</th>
                                    <th>💉 Vacuna</th>
                                    <th>📅 Vacuna Fecha</th>
                                    <th>🦠 Desparasitación</th>
                                    <th>📅 Desparasitación Fecha</th>
                                    <th>🔬 Estado</th>
                                    <th>🍖 Alimentación</th>
                                    <th>🏠 Hábitat</th>
                                    <th>⚠️ Alergias</th>
                                    <th>🔪 Cirugías</th>
                                    <th>📋 Antecedentes</th>
                                    <th>🩺 Enfermedades</th>
                                    <th>📝 Observaciones</th>
                                    <th>👨‍⚕️ Veterinario</th>
                                    <th>⚙️ Acciones</th>
                                    <th>⚙️ Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historiasClinicas.map((historia) => (
                                    <tr key={historia.historia_id}>
                                        <td>{historia.fecha}</td>
                                        <td>{historia.vacunacion_tipo}</td>
                                        <td>{historia.vacunacion_fecha}</td>
                                        <td>{historia.desparasitacion_producto}</td>
                                        <td>{historia.desparasitacion_fecha}</td>
                                        <td>{historia.estado_reproductivo}</td>
                                        <td>{historia.alimentacion}</td>
                                        <td>{historia.habitat}</td>
                                        <td>{historia.alergias}</td>
                                        <td>{historia.cirugias}</td>
                                        <td>{historia.antecedentes}</td>
                                        <td>{historia.EnfermedadesAnteriores}</td>
                                        <td>{historia.observaciones}</td>
                                        <td>{historia.veterinario}</td>
                                        <td>
                                            <button 
                                                className="btn btn-warning"
                                                onClick={() => navigate(`/editar-historia-clinica/${historia.historia_id}`)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            </td>
                                            <td>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleEliminarHistoria(historia.historia_id)}
                                            >
                                                🗑 Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerHistoriaClinica;
