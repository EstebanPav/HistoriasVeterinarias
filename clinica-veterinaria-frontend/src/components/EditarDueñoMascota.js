import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
//import "../Styles/EditarDueñoMascota.css"; // Asegúrate de enlazar el CSS
import {FaPaw,FaClinicMedical,FaCalendarAlt} from "react-icons/fa";
const EditarDueñoMascota = () => {
  const { id } = useParams(); // Capturar el ID del propietario
  const navigate = useNavigate();
  const [propietario, setPropietario] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    cedula: "",
    celular: "",
  });

  const goToHome = (tab) => {
    navigate(`/?tab=${tab}&forceTab=true`); // 🔹 Agrega el parámetro "forceTab"
  };

  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar datos del propietario seleccionado
    const fetchPropietario = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/propietarios/${id}`);
        setPropietario(response.data);
      } catch (error) {
        console.error("Error al obtener propietario:", error);
        setError("❌ No se pudo cargar la información del propietario.");
      }
    };

    fetchPropietario();
  }, [id]);

  const handleChange = (e) => {
    setPropietario({ ...propietario, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/editar_propietario/${id}`, propietario);
      alert("✅ Propietario actualizado correctamente.");
      navigate("/ver-propietario"); // Redirigir a la lista de propietarios después de guardar
    } catch (error) {
      console.error("Error al actualizar propietario:", error);
      setError("❌ Error al actualizar el propietario.");
    }
  };

  return (

    <div className="dashboard-container">
          {/* 📌 Sidebar con Mascotas y Clínica */}
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

    <div className="editar-container">
      <h2>✏️ Editar Propietario</h2>
      
      {error && <p className="error-message">{error}</p>}

      <label>📛 Nombre:</label>
      <input type="text" name="nombre" value={propietario.nombre} onChange={handleChange} />

      <label>📍 Dirección:</label>
      <input type="text" name="direccion" value={propietario.direccion} onChange={handleChange} />

      <label>🏙 Ciudad:</label>
      <input type="text" name="ciudad" value={propietario.ciudad} onChange={handleChange} />

      <label>🌍 Provincia:</label>
      <input type="text" name="provincia" value={propietario.provincia} onChange={handleChange} />

      <label>📜 Cédula:</label>
      <input type="text" name="cedula" value={propietario.cedula} onChange={handleChange} />

      <label>📞 Celular:</label>
      <input type="text" name="celular" value={propietario.celular} onChange={handleChange} />

      <button className="btn btn-save" onClick={handleSave}>💾 Guardar Cambios</button>
      <button className="btn btn-cancel" onClick={() => navigate("/ver-propietario")}>❌ Cancelar</button>
    </div>
    </div>
  );
};

export default EditarDueñoMascota;
