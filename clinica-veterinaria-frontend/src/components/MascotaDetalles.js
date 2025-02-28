import React from "react";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MascotaDetalles = ({ mascota, onClose, onDelete }) => {
  const navigate = useNavigate();

  if (!mascota || !mascota.id) {
    console.error("❌ Error: Mascota no válida o sin ID", mascota);
    return null;
  }

  
  // 🔹 Función para eliminar una historia clínica
  const handleEliminarMascota = async (mascotaId) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta mascota?");
    if (!confirmacion) return;

    try {
        const response = await axios.delete(`http://localhost:5000/eliminar/mascotas/${mascota.id}`);
        if (response.status === 200) {
            alert("✅ Mascota eliminada correctamente.");
        } else {
            alert("❌ No se pudo eliminar la mascota .");
        }
    } catch (error) {
        console.error("❌ Error al eliminar la mascota", error);
        alert("❌ No se pudo eliminar la mascota");
    }
};

  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-subtables">
          <div className="subtable">
            <h4>Datos Generales</h4>
            <p><strong>ID:</strong> {mascota.id}</p> {/* 🔍 Muestra el ID en el modal */}
            <p><strong>Nombre:</strong> {mascota.nombre}</p>
            <p><strong>Especie:</strong> {mascota.especie}</p>
            <p><strong>Raza:</strong> {mascota.raza}</p>
            <p><strong>Sexo:</strong> {mascota.sexo}</p>
            <p><strong>Color:</strong> {mascota.color}</p>
          </div>

          <div className="subtable">
            <h4>Información Adicional</h4>
            <p><strong>Fecha de Nacimiento:</strong> {mascota.fecha_nacimiento}</p>
            <p><strong>Edad:</strong> {mascota.edad}</p>
            <p><strong>Propietario:</strong> {mascota.propietario_nombre || "No asignado"}</p>
          </div>
        </div>

        <div className="edit-delete-buttons">
          <button className="edit-button" onClick={() => navigate(`/editar-mascota/${mascota.id}`)}>
            <FaEdit /> Editar
          </button>
          <button className="delete-button" onClick={handleEliminarMascota}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MascotaDetalles;
