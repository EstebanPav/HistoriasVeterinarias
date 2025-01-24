import React from 'react';

const Vacunaciones = ({ formData, setFormData }) => {
    const handleChange = (e, index, field) => {
        const updatedVacunaciones = [...formData.vacunaciones];
        updatedVacunaciones[index][field] = e.target.value;
        setFormData({ ...formData, vacunaciones: updatedVacunaciones });
    };

    const addVacunacion = () => {
        setFormData({
            ...formData,
            vacunaciones: [...formData.vacunaciones, { tipo_vacuna: '', fecha: '' }],
        });
    };

    return (
        <section>
            <h2>Vacunaciones</h2>
            {formData.vacunaciones.map((vacuna, index) => (
                <div key={index} className="form-row">
                    <div className="form-group col-md-6">
                        <label>Tipo de Vacuna:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={vacuna.tipo_vacuna}
                            onChange={(e) => handleChange(e, index, 'tipo_vacuna')}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Fecha:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={vacuna.fecha}
                            onChange={(e) => handleChange(e, index, 'fecha')}
                        />
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addVacunacion}>
                Agregar Vacunación
            </button>
        </section>
    );
};

export default Vacunaciones;
