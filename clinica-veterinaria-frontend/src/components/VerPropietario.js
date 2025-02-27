import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaPaw,
  FaClinicMedical,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
//import "../Styles/VerPropietarios.css"; // Enlazar el CSS

const VerPropietario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(id || "");
  const [propietarios, setPropietarios] = useState([]);
  const [filteredPropietarios, setFilteredPropietarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mascotas_citas"
        );
        setMascotas(response.data);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
        setError("❌ No se pudieron cargar las mascotas.");
      }
    };

    fetchMascotas();
  }, []);

  const fetchPropietarios = async (propietarioId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/propietarios/${propietarioId}`
      );
      setPropietarios([response.data]); // Guardar como array para la tabla
      setFilteredPropietarios([response.data]);
    } catch (error) {
      console.error("Error al obtener el propietario:", error);
      setError("❌ No se pudo cargar la información del propietario.");
    }
  };

  const handleMascotaChange = (e) => {
    const mascotaId = e.target.value;
    setSelectedMascota(mascotaId);

    const mascotaSeleccionada = mascotas.find(
      (mascota) => mascota.id.toString() === mascotaId
    );
    if (mascotaSeleccionada) {
      fetchPropietarios(mascotaSeleccionada.propietario_id);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredPropietarios(propietarios);
    } else {
      const filtered = propietarios.filter((propietario) =>
        Object.values(propietario).some(
          (field) => field && field.toString().toLowerCase().includes(value)
        )
      );
      setFilteredPropietarios(filtered);
    }
  };

  return (
    <div className="propietario-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
          <li onClick={() => navigate("/?tab=clinica")}>
            <FaClinicMedical /> Información Clínica
          </li>
          <li onClick={() => navigate("/?tab=mascotas")}>
            <FaPaw /> Mascotas
          </li>
          <li onClick={() => navigate("/?tab=calendario")}>
            <FaCalendarAlt /> Calendario
          </li>
        </ul>
      </nav>

      <div className="ver-propietario-content">
        <h2>🏠 Ver Propietario</h2>

        <label htmlFor="mascotaSelect">Selecciona una mascota:</label>
        <select
          id="mascotaSelect"
          value={selectedMascota}
          onChange={handleMascotaChange}
        >
          <option value="">Seleccione una mascota</option>
          {mascotas.map((mascota) => (
            <option key={mascota.id} value={mascota.id}>
              {mascota.nombre}
            </option>
          ))}
        </select>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="🔍 Buscar propietario..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        {filteredPropietarios.length > 0 && (
          <div className="tabla-container">
            <h3>📌 Detalles del Dueño de Mascota</h3>
            <table className="propietario-table">
              <thead>
                <tr>
                  <th>📛 Nombre</th>
                  <th>📍 Dirección</th>
                  <th>🏙 Ciudad</th>
                  <th>🌍 Provincia</th>
                  <th>📜 Cédula</th>
                  <th>📞 Celular</th>
                  <th>⚙️ Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPropietarios.map((propietario) => (
                  <tr key={propietario.id}>
                    <td>{propietario.nombre}</td>
                    <td>{propietario.direccion || "No disponible"}</td>
                    <td>{propietario.ciudad || "No disponible"}</td>
                    <td>{propietario.provincia || "No disponible"}</td>
                    <td>{propietario.cedula || "No disponible"}</td>
                    <td>{propietario.celular || "No disponible"}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate(`/editar-propietario/${propietario.id}`)
                        }
                      >
                        ✏️ Editar
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

export default VerPropietario;
