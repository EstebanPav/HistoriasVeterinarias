import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Toast from '../components/Toast';


const RegistrarMascota = () => {
    const navigate = useNavigate();
    const [mascota, setMascota] = useState({
        nombre: '',
        especie: 'Perro',
        raza: '',
        sexo: 'Macho',
        color: '',
        fecha_nacimiento: '',
        edad: '',
        procedencia: 'Urbana',
        chip: '',
        propietario_id: '', // ID del propietario seleccionado
    });

    const [propietarios, setPropietarios] = useState([]); // Lista de propietarios obtenidos desde la API
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [mascotaId, setMascotaId] = useState(null);
    const [showToast, setShowToast] = useState(false); // Estado para manejar el Toas

    // Cargar la lista de propietarios desde la API
    useEffect(() => {
        const fetchPropietarios = async () => {
            try {
                const response = await api.get('/propietariosHistorial'); // API para obtener la lista de propietarios
                setPropietarios(response.data);
            } catch (err) {
                console.error('Error al recuperar los propietarios:', err);
                setError('No se pudo recuperar la lista de propietarios.');
            } finally {
                setLoading(false);
            }
        };
        fetchPropietarios();
    }, []);

    const handleChange = (e, field) => {
        setMascota({ ...mascota, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!mascota.nombre || !mascota.especie || !mascota.sexo || !mascota.color || !mascota.propietario_id) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            const response = await api.post('/mascotas', mascota);
            setSuccess(true);
            setError('');
            setMascotaId(response.data.mascotaId); // Guardar el ID de la mascota registrada
            setMascota({
                nombre: '',
                especie: 'Perro',
                raza: '',
                sexo: 'Macho',
                color: '',
                fecha_nacimiento: '',
                edad: '',
                procedencia: 'Urbana',
                chip: '',
                propietario_id: '',
            });
            // Mostrar el Toast
            setShowToast(true);
            // Ocultar el Toast automáticamente después de 3 segundos
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        } catch (err) {
            console.error('Error al registrar la mascota:', err.response?.data || err.message);
            setError('Hubo un error al registrar la mascota.');
        }
    };

    

    const handleHistoriaClick = () => {
        if (mascotaId) {
            navigate(`/registrar-historia/${mascotaId}`);
        } else {
            setError('No se encontró el ID de la mascota registrada.');
        }
    };
    
    <button 
    type="button" 
    className="btn btn-secondary w-100 mt-3" 
    onClick={handleHistoriaClick}
>
    Registrar Historia Clínica
</button>


    if (loading) return <p>Cargando...</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h1 className="text-center mb-4">Registrar Mascota</h1>
                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={mascota.nombre}
                            onChange={(e) => handleChange(e, 'nombre')}
                            required
                        />
                    </div>
                     {/* Propietario */}
                     <div className="mb-3">
                        <label htmlFor="propietario_id" className="form-label">Propietario:</label>
                        <select
                            className="form-control"
                            id="propietario_id"
                            value={mascota.propietario_id}
                            onChange={(e) => handleChange(e, 'propietario_id')}
                            required
                        >
                            <option value="">Seleccione un propietario</option>
                            {propietarios.map((propietario) => (
                                <option key={propietario.id} value={propietario.id}>
                                    {propietario.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Especie y Sexo */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="especie" className="form-label">Especie:</label>
                            <select
                                className="form-control"
                                id="especie"
                                value={mascota.especie}
                                onChange={(e) => handleChange(e, 'especie')}
                            >
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="sexo" className="form-label">Sexo:</label>
                            <select
                                className="form-control"
                                id="sexo"
                                value={mascota.sexo}
                                onChange={(e) => handleChange(e, 'sexo')}
                            >
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                    </div>

                    {/* Raza y Color */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="raza" className="form-label">Raza:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="raza"
                                value={mascota.raza}
                                onChange={(e) => handleChange(e, 'raza')}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="color" className="form-label">Color:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="color"
                                value={mascota.color}
                                onChange={(e) => handleChange(e, 'color')}
                                required
                            />
                        </div>
                    </div>

                    {/* Fecha de Nacimiento y Edad */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha_nacimiento"
                                value={mascota.fecha_nacimiento}
                                onChange={(e) => handleChange(e, 'fecha_nacimiento')}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="edad" className="form-label">Edad:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="edad"
                                value={mascota.edad}
                                onChange={(e) => handleChange(e, 'edad')}
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Procedencia y Chip */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="procedencia" className="form-label">Procedencia:</label>
                            <select
                                className="form-control"
                                id="procedencia"
                                value={mascota.procedencia}
                                onChange={(e) => handleChange(e, 'procedencia')}
                            >
                                <option value="Urbana">Urbana</option>
                                <option value="Rural">Rural</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="chip" className="form-label">Chip:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="chip"
                                value={mascota.chip}
                                onChange={(e) => handleChange(e, 'chip')}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">Registrar Mascota</button>
                </form>

                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">Mascota registrada con éxito.</p>}
            </div>
            {/* Toast flotante */}
            {showToast && <Toast mensaje="Registro de mascota exitoso" />}
        </div>
    );
};

export default RegistrarMascota;
