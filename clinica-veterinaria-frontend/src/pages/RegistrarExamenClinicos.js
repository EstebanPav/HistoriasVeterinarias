import React, { useState} from "react";
import axios from "axios";
import "../Styles/ExamenClinico.css"; // CSS específico para el formulario
import Sidebar from "../components/Sidebar"; // 🔹 Importamos Sidebar
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate} from "react-router-dom"; // 📌 Importamos useParams


const RegistrarExamenClinico = () => {
  const { mascotaId } = useParams(); // 📌 Obtener el ID de la mascota desde la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mascota_id: "",
    fecha: "",
    actitud: "",
    condicion_corporal: "",
    hidratacion: "",
    observaciones: "",
    mucosa_conjuntiva: "",
    mucosa_conjuntiva_observaciones: "",
    mucosa_oral: "",
    mucosa_oral_observaciones: "",
    mucosa_vulvar_prepu: "",
    mucosa_vulvar_prepu_observaciones: "",
    mucosa_rectal: "",
    mucosa_rectal_observaciones: "",
    mucosa_ojos: "",
    mucosa_ojos_observaciones: "",
    mucosa_oidos: "",
    mucosa_oidos_observaciones: "",
    mucosa_nodulos: "",
    mucosa_nodulos_observaciones: "",
    mucosa_piel_anexos: "",
    mucosa_piel_anexos_observaciones: "",
    locomocion_estado: "",
    locomocion_observaciones: "",
    musculo_estado: "",
    musculo_observaciones: "",
    nervioso_estado: "",
    nervioso_observaciones: "",
    cardiovascular_estado: "",
    cardiovascular_observaciones: "",
    respiratorio_estado: "",
    respiratorio_observaciones: "",
    digestivo_estado: "",
    digestivo_observaciones: "",
    genitourinario_estado: "",
    genitourinario_observaciones: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/examenes_clinicos/${mascotaId}`, formData);
      setSuccess("Examen clínico registrado con éxito.");
      setFormData({
        mascota_id: "",
        fecha: "",
        actitud: "",
        condicion_corporal: "",
        hidratacion: "",
        observaciones: "",
        mucosa_conjuntiva: "",
        mucosa_conjuntiva_observaciones: "",
        mucosa_oral: "",
        mucosa_oral_observaciones: "",
        mucosa_vulvar_prepu: "",
        mucosa_vulvar_prepu_observaciones: "",
        mucosa_rectal: "",
        mucosa_rectal_observaciones: "",
        mucosa_ojos: "",
        mucosa_ojos_observaciones: "",
        mucosa_oidos: "",
        mucosa_oidos_observaciones: "",
        mucosa_nodulos: "",
        mucosa_nodulos_observaciones: "",
        mucosa_piel_anexos: "",
        mucosa_piel_anexos_observaciones: "",
        locomocion_estado: "",
        locomocion_observaciones: "",
        musculo_estado: "",
        musculo_observaciones: "",
        nervioso_estado: "",
        nervioso_observaciones: "",
        cardiovascular_estado: "",
        cardiovascular_observaciones: "",
        respiratorio_estado: "",
        respiratorio_observaciones: "",
        digestivo_estado: "",
        digestivo_observaciones: "",
        genitourinario_estado: "",
        genitourinario_observaciones: "",
      });
    } catch (error) {
      console.error("Error al registrar el examen clínico:", error);
      setError("Hubo un error al registrar el examen clínico.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* 📌 Usamos el nuevo Sidebar */}
      <div className="form-container">
        <button className="back-button" onClick={() => navigate(-1)}>
                                            <FaArrowLeft /> Volver
                                          </button>
      <h2 className="form-title">Registro de Examen Clínico</h2> {/* 🔹 Nuevo título centrado */}
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {/* 📌 ID de mascota ya preseleccionado (oculto) */}
          <input type="hidden" name="mascota_id" value={mascotaId} />

          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />

          <label>Actitud:</label>
          <select
            name="actitud"
            value={formData.actitud}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione actitud</option>
            <option value="Alterado">Alterado</option>
            <option value="Nervioso">Nervioso</option>
            <option value="Tranquilo">Tranquilo</option>
          </select>

          <label>Condición Corporal:</label>
          <select
            name="condicion_corporal"
            value={formData.condicion_corporal}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione condición</option>
            <option value="Caquéctico">Caquéctico</option>
            <option value="Delgado">Delgado</option>
            <option value="Normal">Normal</option>
            <option value="Obeso">Obeso</option>
            <option value="Sobrepeso">Sobrepeso</option>
          </select>

          <label>Hidratación:</label>
          <select
            name="hidratacion"
            value={formData.hidratacion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione hidratación</option>
            <option value="Normal">Normal</option>
            <option value="D. 0-5%">D. 0-5%</option>
            <option value="D. 6-7%">D. 6-7%</option>
            <option value="D. 8-9%">D. 8-9%</option>
            <option value="D. +10%">D. +10%</option>
          </select>

          <label>Observaciones Generales:</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
          ></textarea>

          {/* Campos Mucosas */}
          <fieldset>
            <legend>Mucosas</legend>
            {[
              "conjuntiva",
              "oral",
              "vulvar_prepu",
              "rectal",
              "ojos",
              "oidos",
              "nodulos",
              "piel_anexos",
            ].map((campo) => (
              <div key={campo}>
                <label>{campo.replace("_", " ").toUpperCase()}:</label>
                <select
                  name={`mucosa_${campo}`}
                  value={formData[`mucosa_${campo}`]}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Normal">Normal</option>
                  <option value="Anormal">Anormal</option>
                </select>
                <textarea
                  placeholder={`Observaciones para ${campo}`}
                  name={`mucosa_${campo}_observaciones`}
                  value={formData[`mucosa_${campo}_observaciones`]}
                  onChange={handleChange}
                ></textarea>
              </div>
            ))}
          </fieldset>

          {/* Campos de Sistemas */}
          {[
            "locomocion",
            "musculo",
            "nervioso",
            "cardiovascular",
            "respiratorio",
            "digestivo",
            "genitourinario",
          ].map((sistema) => (
            <fieldset key={sistema}>
              <legend>{sistema.replace("_", " ").toUpperCase()}</legend>
              <label>Estado:</label>
              <select
                name={`${sistema}_estado`}
                value={formData[`${sistema}_estado`]}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Normal">Normal</option>
                <option value="Anormal">Anormal</option>
              </select>
              <textarea
                name={`${sistema}_observaciones`}
                value={formData[`${sistema}_observaciones`]}
                onChange={handleChange}
                placeholder={`Observaciones para ${sistema}`}
              ></textarea>
            </fieldset>
          ))}

          <button type="submit">Registrar Examen Clínico</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarExamenClinico;
