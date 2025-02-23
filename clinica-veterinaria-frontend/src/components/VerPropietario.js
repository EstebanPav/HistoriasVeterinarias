import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaw, FaClinicMedical, FaCalendarAlt } from 'react-icons/fa';

const VerPropietario = () => {
  const { id } = useParams(); // 🔹 ID de la mascota desde la URL
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(id || "");
  const [propietario, setPropietario] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // 🔹 Función para navegar entre pestañas
  const goToHome = (tab) => {
    navigate(`/?tab=${tab}&forceTab=true`);
};

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mascotas_citas");
        setMascotas(response.data);

        if (id) {
          const mascotaSeleccionada = response.data.find(mascota => mascota.id.toString() === id);
          if (mascotaSeleccionada) {
            setSelectedMascota(mascotaSeleccionada.id);
            fetchPropietario(mascotaSeleccionada.propietario_id);
          }
        }
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
        setError("❌ No se pudieron cargar las mascotas.");
      }
    };

    fetchMascotas();
  }, [id]);

  const fetchPropietario = async (propietarioId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/propietarios/${propietarioId}`);
      setPropietario(response.data);
      setEditedData(response.data);
    } catch (error) {
      console.error("Error al obtener el propietario:", error);
      setError("❌ No se pudo cargar la información del propietario.");
    }
  };

  const handleMascotaChange = (e) => {
    const mascotaId = e.target.value;
    setSelectedMascota(mascotaId);

    const mascotaSeleccionada = mascotas.find(mascota => mascota.id.toString() === mascotaId);
    if (mascotaSeleccionada) {
      fetchPropietario(mascotaSeleccionada.propietario_id);
    }
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/editar_propietario/${propietario.id}`, editedData);
      alert("✅ Propietario actualizado correctamente.");
      setEditMode(false);
      fetchPropietario(propietario.id);
    } catch (error) {
      console.error("Error al actualizar propietario:", error);
      alert("❌ Error al actualizar el propietario.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("⚠️ ¿Estás seguro de que deseas eliminar este propietario? Esta acción no se puede deshacer.")) {
      try {
        await axios.delete(`http://localhost:5000/api/eliminar_propietario/${propietario.id}`);
        alert("✅ Propietario eliminado correctamente.");
        navigate("/"); // 🔹 Redirigir a la página principal después de eliminar
      } catch (error) {
        console.error("Error al eliminar propietario:", error);
        alert("❌ Error al eliminar el propietario.");
      }
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

    <div className="ver-propietario-container">
      <h2>🏠 Ver Propietario</h2>

      <label htmlFor="mascotaSelect">Selecciona una mascota:</label>
      <select id="mascotaSelect" value={selectedMascota} onChange={handleMascotaChange}>
        <option value="">Seleccione una mascota</option>
        {mascotas.map((mascota) => (
          <option key={mascota.id} value={mascota.id}>
            {mascota.nombre}
          </option>
        ))}
      </select>

      {error && <p className="error-message">{error}</p>}

      {propietario && (
        <div className="propietario-form">
          <h3>📌 Detalles del Propietario</h3>

          {editMode ? (
            <>
              <label>📛 Nombre:</label>
              <input type="text" name="nombre" value={editedData.nombre} onChange={handleEditChange} />

              <label>📍 Dirección:</label>
              <input type="text" name="direccion" value={editedData.direccion || ""} onChange={handleEditChange} />

              <label>🏙 Ciudad:</label>
              <input type="text" name="ciudad" value={editedData.ciudad || ""} onChange={handleEditChange} />

              <label>🌍 Provincia:</label>
              <input type="text" name="provincia" value={editedData.provincia || ""} onChange={handleEditChange} />

              <label>📜 Cédula:</label>
              <input type="text" name="cedula" value={editedData.cedula || ""} onChange={handleEditChange} />

              <label>📞 Celular:</label>
              <input type="text" name="celular" value={editedData.celular || ""} onChange={handleEditChange} />

              <button className="save-btn" onClick={handleSaveEdit}>💾 Guardar</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>❌ Cancelar</button>
            </>
          ) : (
            <>
              <p><strong>📛 Nombre:</strong> {propietario.nombre}</p>
              <p><strong>📍 Dirección:</strong> {propietario.direccion || "No disponible"}</p>
              <p><strong>🏙 Ciudad:</strong> {propietario.ciudad || "No disponible"}</p>
              <p><strong>🌍 Provincia:</strong> {propietario.provincia || "No disponible"}</p>
              <p><strong>📜 Cédula:</strong> {propietario.cedula || "No disponible"}</p>
              <p><strong>📞 Celular:</strong> {propietario.celular || "No disponible"}</p>

              <div className="action-buttons">
                <button className="edit-btn" onClick={() => setEditMode(true)}>✏️ Editar</button>
                <button className="delete-btn" onClick={handleDelete}>🗑 Eliminar</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default VerPropietario;
