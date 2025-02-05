import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import RegistrarPropietario from './pages/RegistrarPropietario';
import RegistrarMascota from './pages/RegistrarMascota';
import RegistrarHistoriaClinica from './pages/RegistrarHistoriaClinica';
import RegistrarExamenClinico from './pages/RegistrarExamenClinicos';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            {/* Navbar aparece en todas las páginas */}
            <Navbar />

            {/* ToastContainer para mostrar notificaciones en toda la app */}
            <ToastContainer 
                position="top-right"
                autoClose={3000} // Cierra el toast después de 3 segundos
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registrar-propietario" element={<RegistrarPropietario />} />
                <Route path="/registrar-mascota" element={<RegistrarMascota />} />
                <Route path="/registrar-historia/:mascotaId" element={<RegistrarHistoriaClinica />} />
                <Route path="/registrar-examen-clinico" element={<RegistrarExamenClinico />} />
            </Routes>
        </Router>
    );
};

export default App;
