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
import MascotasTable from "./pages/MascotasTable";
import EditarMascota from "./components/EditarMascota";
import Calendario from "./components/Calendario";
import VerCitas from "./components/VerCitas";
import EditarCita from "./components/EditarCitas";
import NotificarCita from './components/NotificarCita';
import VerPropietario from "./components/VerPropietario";
import VerHistoriaClinica from "./components/VerHistoriaClinica";
import EditarHistoriaClinica from "./components/EditarHistoriaClinica";
import EditarExamenClinico from './components/EditarExamenClinico';
import VerExamenClinico from "./components/VerExamenClinico";
import EditarDueñoMascota from "./components/EditarDueñoMascota";
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
                <Route path="/" element={<MascotasTable />} />
                <Route path="/editar-mascota/:id" element={<EditarMascota/>} />
                <Route path="/" element={<Calendario />} />
                <Route path="/ver-citas" element={<VerCitas />} />
                <Route path="/editar-cita/:id" element={<EditarCita />} />
                <Route path="/notificar-cita/:id" element={<NotificarCita/>} />
                <Route path="/ver-propietario" element={<VerPropietario />} />
                <Route path="/editar-propietario/:id" element={<EditarDueñoMascota />} />
                <Route path="/ver-historia-clinica" element={<VerHistoriaClinica />} />
                <Route path="/ver-examen-clinico" element={<VerExamenClinico />} />
                <Route path="/editar-historia-clinica/:id" element={<EditarHistoriaClinica />} />
                <Route path="/editar-examen-clinico/:id" element={<EditarExamenClinico />} />
                
                
            </Routes>
        </Router>
    );
};

export default App;
