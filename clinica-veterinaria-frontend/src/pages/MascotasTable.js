import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../Styles/TablaMascota.css";
import { useNavigate } from "react-router-dom";
import MascotaDetalles from "../components/MascotaDetalles";

const MascotasTable = () => {
  const [mascotas, setMascotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mascotas");
        setMascotas(response.data);
        setFilteredMascotas(response.data);
      } catch (error) {
        console.error("Error al cargar las mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = mascotas.filter((mascota) =>
      Object.values(mascota).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setFilteredMascotas(results);
  }, [searchTerm, mascotas]);

  const handleRowClick = (mascota) => {
    setSelectedMascota(mascota);
  };

  const handleVerPropietario = () => {
    navigate(`/ver-propietario`); // 🔹 Redirige a la página sin pasar un ID específico
  };

  return (
    <div className="table-container">
      <div className="search-bar">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="🔍 Buscar en cualquier campo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered shadow-sm">
          <thead className="table-custom-header">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Sexo</th>
              <th>Color</th>
              <th>Fecha Nacimiento</th>
              <th>Edad</th>
              <th>Propietario</th>
            </tr>
          </thead>
          <tbody>
            {filteredMascotas.map((mascota) => (
              <tr
                key={mascota.id}
                onClick={() => handleRowClick(mascota)}
                className="clickable-row"
              >
                <td>{mascota.id}</td>
                <td>{mascota.nombre}</td>
                <td>{mascota.especie}</td>
                <td>{mascota.raza}</td>
                <td>{mascota.sexo}</td>
                <td>{mascota.color}</td>
                <td>{mascota.fecha_nacimiento}</td>
                <td>{mascota.edad}</td>
                <td>{mascota.propietario_nombre || "No asignado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Botón "Ver Propietario" debajo de la tabla */}
      <div className="button-container">
        <button onClick={handleVerPropietario} className="view-owner-btn">
          🏠 Ver Dueños de Mascotas
        </button>
      </div>

      {/* Botón para ver historia clínica */}
      <button
        onClick={() => navigate("/ver-historia-clinica")}
        className="btn btn-info"
      >
        📜 Ver Historia Clínica
      </button>
             {/* Botón para ver historia clínica */}
      <button
        onClick={() => navigate("/ver-examen-clinico")}
        className="btn btn-info"
      >
        🩺 Exámenes Clínicos
      </button>

      {/* 📌 Modal para ver detalles de la mascota */}
      {selectedMascota && (
        <MascotaDetalles
          mascota={selectedMascota}
          onClose={() => setSelectedMascota(null)}
        />
      )}
    </div>
  );
};

export default MascotasTable;
