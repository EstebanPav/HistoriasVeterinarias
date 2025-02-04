import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Solo CSS
import 'bootstrap/dist/js/bootstrap.bundle';  // Importa el JS correctamente

import '../Styles/Formulario..css'; // Asegúrate de que este archivo esté configurado correctamente.

const RegistrarHistoriaClinica = () => {
    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [formData, setFormData] = useState({
        mascota_id: '',
        fecha: '',
        vacunacion_tipo: '',
        vacunacion_fecha: '',
        desparasitacion_producto: '',
        desparasitacion_fecha: '',
        estado_reproductivo: '',
        alimentacion: '',
        habitat: '',
        alergias: '',
        cirugias: '',
        antecedentes: '',
        enfermedadAnterior: '',
        observaciones: '',
        veterinario_id: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cargar datos de mascotas y veterinarios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const mascotasResponse = await axios.get('http://localhost:5000/api/mascotasHistorial');
                const veterinariosResponse = await axios.get('http://localhost:5000/api/veterinarios');
                setMascotas(mascotasResponse.data);
                setVeterinarios(veterinariosResponse.data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('No se pudieron cargar los datos necesarios.');
            }
        };
        fetchData();
    }, []);

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Enviar los datos a la API
            await axios.post('http://localhost:5000/api/historias_clinicas', formData);

            // Respuesta exitosa
            setSuccess('Historia clínica registrada con éxito.');
            setFormData({
                mascota_id: '',
                fecha: '',
                vacunacion_tipo: '',
                vacunacion_fecha: '',
                desparasitacion_producto: '',
                desparasitacion_fecha: '',
                estado_reproductivo: '',
                alimentacion: '',
                habitat: '',
                alergias: '',
                cirugias: '',
                antecedentes: '',
                enfermedadAnterior: '',
                observaciones: '',
                veterinario_id: ''
            });
        } catch (error) {
            console.error('Error al registrar la historia clínica:', error);
            setError('Hubo un error al registrar la historia clínica. Verifique los datos.');
        }
    };

    return (
        <div className="historias-form-container">
            <form className="historias-form" onSubmit={handleSubmit}>
                <h2>Registrar Historia Clínica</h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <label htmlFor="mascota">Seleccione Mascota:</label>
                <select id="mascota" name="mascota_id" value={formData.mascota_id} onChange={handleChange} required>
                    <option value="">Seleccione una mascota</option>
                    {mascotas.map((mascota) => (
                        <option key={mascota.id} value={mascota.id}>
                            {mascota.nombre}
                        </option>
                    ))}
                </select>

                <label htmlFor="fecha">Fecha:</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                />

                <div className="row">
                    <div>
                        <label htmlFor="vacunacion_tipo">Vacunación (Tipo):</label>
                        <input
                            type="text"
                            id="vacunacion_tipo"
                            name="vacunacion_tipo"
                            placeholder="Tipo de vacuna"
                            value={formData.vacunacion_tipo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="vacunacion_fecha">Vacunación (Fecha):</label>
                        <input
                            type="date"
                            id="vacunacion_fecha"
                            name="vacunacion_fecha"
                            value={formData.vacunacion_fecha}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div>
                        <label htmlFor="desparasitacion_producto">Desparasitación (Producto):</label>
                        <input
                            type="text"
                            id="desparasitacion_producto"
                            name="desparasitacion_producto"
                            placeholder="Producto"
                            value={formData.desparasitacion_producto}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="desparasitacion_fecha">Desparasitación (Fecha):</label>
                        <input
                            type="date"
                            id="desparasitacion_fecha"
                            name="desparasitacion_fecha"
                            value={formData.desparasitacion_fecha}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <label htmlFor="estado_reproductivo">Estado Reproductivo:</label>
                <select id="estado_reproductivo" name="estado_reproductivo" value={formData.estado_reproductivo} onChange={handleChange} required>
                    <option value="">Seleccione un estado</option>
                    <option value="Entero">Entero</option>
                    <option value="Castrado">Castrado</option>
                    <option value="Gestación">Gestación</option>
                    <option value="Lactancia">Lactancia</option>
                </select>

                <label htmlFor="alimentacion">Alimentación:</label>
                <select id="alimentacion" name="alimentacion" value={formData.alimentacion} onChange={handleChange} required>
                    <option value="">Seleccione tipo de alimentación</option>
                    <option value="Balanceada">Balanceada</option>
                    <option value="Casera">Casera</option>
                    <option value="Mixta">Mixta</option>
                </select>

                <label htmlFor="habitat">Hábitat:</label>
                <select id="habitat" name="habitat" value={formData.habitat} onChange={handleChange} required>
                    <option value="">Seleccione un hábitat</option>
                    <option value="Casa">Casa</option>
                    <option value="Lote">Lote</option>
                    <option value="Finca">Finca</option>
                    <option value="Taller">Taller</option>
                    <option value="Otro">Otro</option>
                </select>

                <label htmlFor="alergias">Alergias:</label>
                <input
                    type="text"
                    id="alergias"
                    name="alergias"
                    placeholder="Ingrese alergias"
                    value={formData.alergias}
                    onChange={handleChange}
                />

                <label htmlFor="cirugias">Cirugías:</label>
                <input
                    type="text"
                    id="cirugias"
                    name="cirugias"
                    placeholder="Ingrese cirugías"
                    value={formData.cirugias}
                    onChange={handleChange}
                />

                <label htmlFor="antecedentes">Antecedentes:</label>
                <textarea
                    id="antecedentes"
                    name="antecedentes"
                    placeholder="Describa antecedentes"
                    value={formData.antecedentes}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="enfermedadAnterior">Enfermedades Anteriores:</label>
                <textarea
                    id="enfermedadAnterior"
                    name="enfermedadAnterior"
                    placeholder="Describa enfermedades anteriores"
                    value={formData.enfermedadAnterior}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="observaciones">Observaciones:</label>
                <textarea
                    id="observaciones"
                    name="observaciones"
                    placeholder="Ingrese observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="veterinario">Seleccione Veterinario:</label>
                <select id="veterinario" name="veterinario_id" value={formData.veterinario_id} onChange={handleChange} required>
                    <option value="">Seleccione un veterinario</option>
                    {veterinarios.map((vet) => (
                        <option key={vet.id} value={vet.id}>
                            {vet.nombre}
                        </option>
                    ))}
                </select>

                <button type="submit">Registrar Historia Clínica</button>
            </form>
        </div>
    );
};

export default RegistrarHistoriaClinica;
