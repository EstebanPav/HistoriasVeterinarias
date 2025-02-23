import React from "react";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MascotaDetalles = ({ mascota, onClose, onDelete }) => {
  const navigate = useNavigate();

  if (!mascota) return null; // No mostrar el modal si no hay una mascota seleccionada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Detalles de la Mascota</h3>

        <div className="modal-subtables">
          <div className="subtable">
            <h4>Datos Generales</h4>
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
          {/* 🔹 Cambiado para redirigir a EditarMascota.js con el ID de la mascota */}
          <button className="edit-button" onClick={() => navigate(`/editar-mascota/${mascota.id}`)}>
            <FaEdit /> Editar
          </button>
          <button className="delete-button" onClick={() => onDelete(mascota.id)}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MascotaDetalles;
