import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation} from "react-router-dom"; // 📌 Para navegación
import { FaPaw, FaClinicMedical, FaCalendarAlt } from 'react-icons/fa'; // 📌 Iconos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Dashboard.css';

import MascotasTable from './MascotasTable';
import ClinicaInfo from '../components/ClinicaInfo';
import Calendario from '../components/Calendario'; // 📌 Importar el Calendario

const Home = () => {
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const forceTab = urlParams.get("forceTab");

    const [activeTab, setActiveTab] = useState(forceTab ? tabFromUrl : "clinica");

    const [mascotas, setMascotas] = useState([]);
    const [clinica, setClinica] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (activeTab === "mascotas") {
            fetchMascotas();
        } else if (activeTab === "clinica") {
            fetchClinicaInfo();
        }
    }, [activeTab]);

    const fetchMascotas = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/mascotas");
            setMascotas(response.data || []);
            setError("");
        } catch (err) {
            console.error("Error al obtener las mascotas:", err);
            setError("No se pudieron cargar los datos.");
            setMascotas([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchClinicaInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/clinica");
            setClinica(response.data);
            setError("");
        } catch (err) {
            console.error("Error al obtener la información de la clínica:", err);
            setError("No se pudo cargar la información de la clínica.");
            setClinica(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* 📌 Sidebar con Mascotas, Clínica y Calendario */}
            <nav className="sidebar">
                <ul>
                    <li onClick={() => setActiveTab('clinica')} className={activeTab === 'clinica' ? 'active' : ''}>
                        <FaClinicMedical /> Información Clínica
                    </li>
                    <li onClick={() => setActiveTab('mascotas')} className={activeTab === 'mascotas' ? 'active' : ''}>
                        <FaPaw /> Mascotas
                    </li>
                    <li onClick={() => setActiveTab('calendario')} className={activeTab === 'calendario' ? 'active' : ''}>
                        <FaCalendarAlt /> Calendario
                    </li>
                </ul>
            </nav>

            {/* 📌 Contenido Principal */}
            <div className="content">
                <h1>
                    {activeTab === "clinica" ? "Información de la Clínica" 
                    : activeTab === "mascotas" ? "Mascotas"
                    : "Calendario"}
                </h1>

                {loading && <p className="loading-message">Cargando datos...</p>}
                {error && <p className="error-message">{error}</p>}

                {activeTab === "clinica" && <ClinicaInfo clinica={clinica} />}
                {activeTab === "mascotas" && <MascotasTable mascotas={mascotas} onMascotaUpdated={fetchMascotas} />}
                {activeTab === "calendario" && <Calendario />}
            </div>
        </div>
    );
};

export default Home;
