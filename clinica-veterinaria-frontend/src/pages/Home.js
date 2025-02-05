import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaPaw, FaFileMedical, FaClipboardList } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Dashboard.css';

// Importamos las tablas específicas
import PropietariosTable from './PropietariosTable';
import MascotasTable from './MascotasTable';
import HistoriasClinicasTable from './HistoriasClinicasTable'; 
import ExamenesClinicosTable from './ExamenesClinicosTable'; 

const Home = () => {
    const [activeTab, setActiveTab] = useState('propietarios'); // Pestaña activa
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (tab) => {
        let endpoint = '';
        switch (tab) {
            case 'propietarios': endpoint = '/api/propietarios'; break;
            case 'mascotas': endpoint = '/api/mascotas'; break;
            case 'historias': endpoint = '/api/historias_clinicas'; break;
            case 'examenes': endpoint = '/api/examenes_clinicos'; break;
            default: return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000${endpoint}`);
            setData(response.data);
            setError('');
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            setError('No se pudieron cargar los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* 📌 Sidebar de navegación */}
            <nav className="sidebar">
                <h2 className="sidebar-title">Dashboard</h2>
                <ul>
                    <li onClick={() => setActiveTab('propietarios')} className={activeTab === 'propietarios' ? 'active' : ''}>
                        <FaUsers /> Propietarios
                    </li>
                    <li onClick={() => setActiveTab('mascotas')} className={activeTab === 'mascotas' ? 'active' : ''}>
                        <FaPaw /> Mascotas
                    </li>
                    <li onClick={() => setActiveTab('historias')} className={activeTab === 'historias' ? 'active' : ''}>
                        <FaFileMedical /> Historias Clínicas
                    </li>
                    <li onClick={() => setActiveTab('examenes')} className={activeTab === 'examenes' ? 'active' : ''}>
                        <FaClipboardList /> Exámenes Clínicos
                    </li>
                </ul>
            </nav>

            {/* 📌 Contenido Principal */}
            <div className="content">
                <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                
                {/* Estado de carga */}
                {loading && <p className="loading-message">Cargando datos...</p>}

                <div className="table-container">
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        activeTab === 'propietarios' ? (
                            <PropietariosTable propietarios={data} onPropietarioUpdated={() => fetchData('propietarios')} />
                        ) : activeTab === 'mascotas' ? (
                            <MascotasTable mascotas={data} onMascotaUpdated={() => fetchData('mascotas')} />
                        ) : activeTab === 'historias' ? (
                            <HistoriasClinicasTable historias={data} onHistoriaUpdated={() => fetchData('historias')} />
                        ) : activeTab === 'examenes' ? (
                            <ExamenesClinicosTable examenes={data} onExamenUpdated={() => fetchData('examenes')} />
                        ) : (
                            <p>Falta implementar para {activeTab}</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
