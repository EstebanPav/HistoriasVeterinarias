import React, { useState } from 'react';
import api from '../api';
import Toast from '../components/Toast';

const RegistrarPropietario = () => {
    const [propietario, setPropietario] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        provincia: '',
        cedula: '',
        celular: '',
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const handleChange = (e, field) => {
        setPropietario({ ...propietario, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/propietarios', propietario);
            setToastMessage('Registro de datos exitoso');
            setShowToast(true);

            // Limpiar formulario
            setPropietario({
                nombre: '',
                direccion: '',
                ciudad: '',
                provincia: '',
                cedula: '',
                celular: '',
            });
        } catch (error) {
            console.error('Error al registrar el propietario:', error);
            setToastMessage('Hubo un error al registrar el propietario.');
            setShowToast(true);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h1 className="text-center mb-4">Registrar Propietario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={propietario.nombre}
                                onChange={(e) => handleChange(e, 'nombre')}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="direccion" className="form-label">Dirección:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="direccion"
                                value={propietario.direccion}
                                onChange={(e) => handleChange(e, 'direccion')}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ciudad"
                                value={propietario.ciudad}
                                onChange={(e) => handleChange(e, 'ciudad')}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="provincia" className="form-label">Provincia:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="provincia"
                                value={propietario.provincia}
                                onChange={(e) => handleChange(e, 'provincia')}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="cedula" className="form-label">Cédula:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cedula"
                                value={propietario.cedula}
                                onChange={(e) => handleChange(e, 'cedula')}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="celular" className="form-label">Celular:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="celular"
                                value={propietario.celular}
                                onChange={(e) => handleChange(e, 'celular')}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Registrar Propietario
                    </button>
                </form>
            </div>

            {/* Toast para mostrar mensajes */}
            <Toast
                show={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default RegistrarPropietario;
