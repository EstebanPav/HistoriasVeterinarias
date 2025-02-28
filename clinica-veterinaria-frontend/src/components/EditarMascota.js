import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar integrado
import "../Styles/EditarMascota.css"; // 🔹 Importamos el CSS mejorado

const EditarMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [propietarios, setPropietarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Obteniendo datos de la mascota con ID:", id);

        if (!id || isNaN(Number(id))) {
          console.error("ID de mascota no válido:", id);
          return;
        }

        const resMascota = await axios.get(
          `http://localhost:5000/api/mascotas/${id}`
        );
        const resMascotasLista = await axios.get(
          "http://localhost:5000/api/lista-mascotas"
        );
        const resPropietarios = await axios.get(
          "http://localhost:5000/api/propietarios"
        );

        setMascota(resMascota.data);
        setMascotas(resMascotasLista.data);
        setPropietarios(resPropietarios.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setMascota({ ...mascota, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/mascotas/${id}`, mascota);
      alert("Mascota actualizada correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  if (!mascota) return <p>Cargando...</p>;

  return (
    <div className="dashboard-container">
      {/* 📌 Sidebar correctamente integrado */}
      <Sidebar />
      {/* 📌 Contenedor de edición */}
      <div className="edit-container">
        <h2 className="edit-title">Editar Mascota</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          {/* 🔹 Seleccionar mascota */}
          <div className="form-group">
            <label>Mascota:</label>
            <select
              name="id"
              value={mascota.id}
              onChange={handleChange}
              required
            >
              {mascotas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Especie:</label>
            <input
              type="text"
              name="especie"
              value={mascota.especie}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Raza:</label>
            <input
              type="text"
              name="raza"
              value={mascota.raza}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Sexo:</label>
            <select
              name="sexo"
              value={mascota.sexo}
              onChange={handleChange}
              required
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div className="form-group">
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={mascota.color}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🔹 Seleccionar propietario */}
          <div className="form-group">
            <label>Propietario:</label>
            <select
              name="propietario_id"
              value={mascota.propietario_id}
              onChange={handleChange}
              required
            >
              {propietarios.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* 📌 Botones alineados lateralmente */}
          <div className="button-group">
            <button type="submit" className="save-button">
              Guardar Cambios
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMascota;
