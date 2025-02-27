import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/VerHistoriasClinicas.css";
import { FaPaw, FaClinicMedical, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const VerHistoriaClinica = () => {
    const [mascotas, setMascotas] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState("");
    const [historiasClinicas, setHistoriasClinicas] = useState([]);
    const [filteredHistorias, setFilteredHistorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 🔹 Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 🔹 Número de registros por página

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
            setFilteredHistorias(response.data);
            setCurrentPage(1); // 🔹 Reiniciar a la primera página al cambiar de mascota
        } catch (error) {
            console.error("Error al obtener las historias clínicas:", error);
            setHistoriasClinicas([]);
            setFilteredHistorias([]);
        }
    };

    // 🔹 Función para filtrar historias clínicas según el término de búsqueda
    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = historiasClinicas.filter((historia) =>
            Object.values(historia).some(
                (value) => value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
            )
        );
        setFilteredHistorias(results);
        setCurrentPage(1); // 🔹 Reiniciar a la primera página al buscar
    }, [searchTerm, historiasClinicas]);

    // 🔹 Función para eliminar una historia clínica
    const handleEliminarHistoria = async (historiaId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta historia clínica?");
        if (!confirmacion) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/historia_clinica/${historiaId}`);
            if (response.status === 200) {
                alert("✅ Historia clínica eliminada correctamente.");
                setHistoriasClinicas(historiasClinicas.filter(historia => historia.historia_id !== historiaId));
                setFilteredHistorias(filteredHistorias.filter(historia => historia.historia_id !== historiaId));
            } else {
                alert("❌ No se pudo eliminar la historia clínica.");
            }
        } catch (error) {
            console.error("❌ Error al eliminar la historia clínica:", error);
            alert("❌ No se pudo eliminar la historia clínica.");
        }
    };

    // 🔹 Calcular qué elementos mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistorias.slice(indexOfFirstItem, indexOfLastItem);

    // 🔹 Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredHistorias.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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

                {/* 🔍 Barra de búsqueda */}
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="🔍 Buscar en cualquier campo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredHistorias.length > 0 && (
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
                                {currentItems.map((historia) => (
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

                        {/* 📌 Controles de paginación */}
                        <div className="pagination">
                            <button onClick={prevPage} disabled={currentPage === 1}>⬅️ Anterior</button>
                            <span>Página {currentPage} de {Math.ceil(filteredHistorias.length / itemsPerPage)}</span>
                            <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredHistorias.length / itemsPerPage)}>Siguiente ➡️</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerHistoriaClinica;
