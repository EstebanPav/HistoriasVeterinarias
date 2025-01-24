import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrarPropietario from './pages/RegistrarPropietario';
import RegistrarMascota from './pages/RegistrarMascota';
import RegistrarHistoriaClinica from './pages/RegistrarHistoriaClinica';
import RegistrarExamenClinico from './pages/RegistrarExamenClinicos';
import Navbar from './components/Navbar'; // Asegúrate de tener este archivo creado

const App = () => {
    return (
        <Router>
            {/* Incluimos la Navbar en el Router para que aparezca en todas las páginas */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registrar-propietario" element={<RegistrarPropietario />} />
                <Route path="/registrar-mascota" element={<RegistrarMascota />} />
                <Route path="/registrar-historia/:mascotaId" element={<RegistrarHistoriaClinica />} />
                <Route path="/registrar-examen-clinico" element={<RegistrarExamenClinico/>} />
            </Routes>
        </Router>
    );
};

export default App;
