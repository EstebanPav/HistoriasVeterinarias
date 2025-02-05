import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/TablaMascota.css'; // Archivo CSS para mejorar el diseño

const MascotasTable = ({ mascotas, onMascotaUpdated }) => {
    const [editingId, setEditingId] = useState(null);
    const [editableData, setEditableData] = useState({});
    const [propietarios, setPropietarios] = useState([]);

    useEffect(() => {
        setEditableData(
            mascotas.reduce((acc, mascota) => {
                acc[mascota.id] = { ...mascota };
                return acc;
            }, {})
        );
    }, [mascotas]);

    useEffect(() => {
        const fetchPropietarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/propietarios');
                setPropietarios(response.data);
            } catch (error) {
                console.error('Error al cargar los propietarios:', error);
            }
        };
        fetchPropietarios();
    }, []);

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleChange = (e, id, field) => {
        setEditableData({
            ...editableData,
            [id]: {
                ...editableData[id],
                [field]: e.target.value,
            },
        });
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/mascotas/${id}`, editableData[id]);
            toast.success('Mascota actualizada correctamente');
            setEditingId(null);
            onMascotaUpdated();
        } catch (error) {
            console.error('Error al actualizar la mascota:', error);
            toast.error('Error al actualizar la mascota');
        }
    };

    return (
        <div className="table-container">
            <h2 className="text-center mt-3">Mascotas</h2>
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
                            <th>Procedencia</th>
                            <th>Chip</th>
                            <th>Propietario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map((mascota) => (
                            <tr key={mascota.id}>
                                <td>{mascota.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editableData[mascota.id]?.nombre || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'nombre')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={editableData[mascota.id]?.especie || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'especie')}
                                        disabled={editingId !== mascota.id}
                                    >
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editableData[mascota.id]?.raza || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'raza')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={editableData[mascota.id]?.sexo || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'sexo')}
                                        disabled={editingId !== mascota.id}
                                    >
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editableData[mascota.id]?.color || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'color')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editableData[mascota.id]?.fecha_nacimiento || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'fecha_nacimiento')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editableData[mascota.id]?.edad || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'edad')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editableData[mascota.id]?.procedencia || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'procedencia')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editableData[mascota.id]?.chip || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'chip')}
                                        disabled={editingId !== mascota.id}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={editableData[mascota.id]?.propietario_id || ''}
                                        onChange={(e) => handleChange(e, mascota.id, 'propietario_id')}
                                        disabled={editingId !== mascota.id}
                                    >
                                        <option value="">Seleccione un propietario</option>
                                        {propietarios.map((prop) => (
                                            <option key={prop.id} value={prop.id}>
                                                {prop.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    {editingId === mascota.id ? (
                                        <button className="btn btn-success btn-sm" onClick={() => handleUpdate(mascota.id)}>
                                            Guardar
                                        </button>
                                    ) : (
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(mascota.id)}>
                                            <FaEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MascotasTable;
