import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/VerExamenClinico.css";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado

const VerExamenClinico = () => {
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState("");
  const [examenesClinicos, setExamenesClinicos] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Para la barra de búsqueda
  const [filteredExamenes, setFilteredExamenes] = useState([]); // Para almacenar los exámenes filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de elementos por página

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
      const response = await axios.get(
        `http://localhost:5000/api/examen_clinico/${mascotaId}`
      );
      setExamenesClinicos(response.data);
      setFilteredExamenes(response.data); // Actualiza la lista filtrada
      setCurrentPage(1); // 🔹 Reinicia a la primera página cuando cambia de mascota
    } catch (error) {
      console.error("Error al obtener los exámenes clínicos:", error);
      setExamenesClinicos([]);
      setFilteredExamenes([]);
    }
  };

  // 🔹 Función para eliminar un examen clinico
  const handleEliminarExamenClinico = async (examenId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este examen clínico?"
    );
    if (!confirmacion) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/examen_clinico/${examenId}`
      );
      if (response.status === 200) {
        alert("✅ Examen clínico eliminado correctamente.");

        // ⬇️ Aquí corregimos el filtro con `examen.id`
        setExamenesClinicos(
          examenesClinicos.filter((examen) => examen.id !== examenId)
        );
      } else {
        alert("❌ No se pudo eliminar el examen clínico.");
      }
    } catch (error) {
      console.error("❌ Error al eliminar el examen clínico:", error);
      alert("❌ No se pudo eliminar el examen clínico.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExamenes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredExamenes.length / itemsPerPage)) {
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
      {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />

      <div className="historia-container">
        <h2>🩺 Exámenes Clínicos</h2>

        <label>Selecciona una mascota:</label>
        <select value={selectedMascota} onChange={handleMascotaChange}>
          <option value="">Seleccione una mascota</option>
          {mascotas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Buscar en cualquier campo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {examenesClinicos.length > 0 && (
          <div className="tabla-container">
            <table className="historia-table">
              <thead>
                <tr>
                  <th>📅 Fecha</th>
                  <th>🩺 Actitud</th>
                  <th>🏋️‍♂️ Condición Corporal</th>
                  <th>💧 Hidratación</th>
                  <th>📝 Observaciones</th>
                  <th>👀 Mucosa Conjuntiva</th>
                  <th>👀 Mucosa Conjuntiva - Observaciones</th>
                  <th>🦷 Mucosa Oral</th>
                  <th>🦷 Mucosa Oral - Observaciones </th>
                  <th>⚕️ Mucosa Vulvar/Prepucio</th>
                  <th>⚕️ Mucosa Vulvar/Prepucio - Observaciones</th>
                  <th>📌 Mucosa Rectal</th>
                  <th>📌 Mucosa Rectal - Observaciones</th>
                  <th>👀 Mucosa Ojos</th>
                  <th>👀 Mucosa Ojos - Observaciones</th>
                  <th>👂 Mucosa Oídos</th>
                  <th>👂 Mucosa Oídos - Observaciones</th>
                  <th>🔬 Mucosa Nódulos</th>
                  <th>🔬 Mucosa Nódulos Observaciones</th>
                  <th>🩹 Piel y Anexos</th>
                  <th>🩹 Piel y Anexos Observaciones</th>
                  <th>🏃 Estado de Locomoción</th>
                  <th>🏃 Estado de Locomoción Observaciones</th>
                  <th>💪 Sist Muscular</th>
                  <th>💪 Sist Muscular Observaciones</th>
                  <th>🧠 Sist Nervioso</th>
                  <th>🧠 Sist Nervioso Observaciones</th>
                  <th>❤️ Sist Cardiovascular</th>
                  <th>❤️ Sist Cardiovascular Observaciones</th>
                  <th> Sist Respiratorio</th>
                  <th> Sist Respiratorio Observaciones</th>
                  <th>🍽️ Sist Digestivo</th>
                  <th>🍽️ Sist Digestivo Observaciones</th>
                  <th>🚻 Siste Genitourinario</th>
                  <th>🚻 Siste Genitourinario Observaciones</th>
                  <th>⚙️ Acciones</th>
                  <th>⚙️ Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((examen) => (
                  <tr key={examen.id}>
                    <td>{examen.fecha}</td>
                    <td>{examen.actitud}</td>
                    <td>{examen.condicion_corporal}</td>
                    <td>{examen.hidratacion}</td>
                    <td>{examen.observaciones}</td>
                    <td>{examen.mucosa_conjuntiva}</td>
                    <td>{examen.mucosa_conjuntiva_observaciones}</td>
                    <td>{examen.mucosa_oral}</td>
                    <td>{examen.mucosa_oral_observaciones}</td>
                    <td>{examen.mucosa_vulvar_prepu}</td>
                    <td>{examen.mucosa_vulvar_prepu_observaciones}</td>
                    <td>{examen.mucosa_rectal}</td>
                    <td>{examen.mucosa_rectal_observaciones}</td>
                    <td>{examen.mucosa_ojos}</td>
                    <td>{examen.mucosa_ojos_observaciones}</td>
                    <td>{examen.mucosa_oidos}</td>
                    <td>{examen.mucosa_oidos_observaciones}</td>
                    <td>{examen.mucosa_nodulos}</td>
                    <td>{examen.mucosa_nodulos_observaciones}</td>
                    <td>{examen.mucosa_piel_anexos}</td>
                    <td>{examen.mucosa_piel_anexos_observaciones}</td>
                    <td>{examen.locomocion_estado}</td>
                    <td>{examen.locomocion_observaciones}</td>
                    <td>{examen.musculo_estado}</td>
                    <td>{examen.musculo_observaciones}</td>
                    <td>{examen.nervioso_estado}</td>
                    <td>{examen.nervioso_observaciones}</td>
                    <td>{examen.cardiovascular_estado}</td>
                    <td>{examen.cardiovascular_observaciones}</td>
                    <td>{examen.respiratorio_estado}</td>
                    <td>{examen.respiratorio_observaciones}</td>
                    <td>{examen.digestivo_estado}</td>
                    <td>{examen.digestivo_observaciones}</td>
                    <td>{examen.genitourinario_estado}</td>
                    <td>{examen.genitourinario_observaciones}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          console.log("Navegando a editar:", examen.id); // 🛠️ Depuración
                          navigate(`/editar-examen-clinico/${examen.id}`);
                        }}
                      >
                        ✏️ Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleEliminarExamenClinico(examen.id)}
                      >
                        🗑 Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ⬅️ Anterior
              </button>
              <span>
                Página {currentPage} de{" "}
                {Math.ceil(filteredExamenes.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage >=
                  Math.ceil(filteredExamenes.length / itemsPerPage)
                }
                className="pagination-btn"
              >
                Siguiente ➡️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerExamenClinico;
