const express = require('express');
const router = express.Router();
const db = require('./db'); // Ajusta la ruta si el archivo tiene un nombre o ubicación diferente

// ==================== PROPIETARIOS ====================
/**
 * Obtener todos los propietarios
 */
router.get('/api/propietarios', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM propietarios');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los propietarios' });
    }
});

/**
 * Registrar un nuevo propietario
 */
router.post('/api/propietarios', async (req, res) => {
    try {
        const { nombre, direccion, ciudad, provincia, cedula, celular } = req.body;
        if (!nombre || !direccion || !ciudad || !provincia || !cedula || !celular) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const [result] = await db.query(
            'INSERT INTO propietarios (nombre, direccion, ciudad, provincia, cedula, celular) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, direccion, ciudad, provincia, cedula, celular]
        );
        res.status(201).json({ message: 'Propietario registrado exitosamente', propietarioId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el propietario' });
    }
});

// ==================== MASCOTAS ====================
/**
 * Obtener todas las mascotas
 */
router.get('/api/mascotas', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM mascotas');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
});

/**
 * Registrar una nueva mascota
 */
router.post('/api/mascotas', async (req, res) => {
    try {
        const { nombre, especie, raza, sexo, color, fecha_nacimiento, edad, procedencia, chip, propietario_id } = req.body;
        if (!nombre || !especie || !raza || !sexo || !fecha_nacimiento || !edad || !procedencia) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const [result] = await db.query(
            'INSERT INTO mascotas (nombre, especie, raza, sexo, color, fecha_nacimiento, edad, procedencia, chip, propietario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, especie, raza, sexo, color, fecha_nacimiento, edad, procedencia, chip, propietario_id || null]
        );
        res.status(201).json({ message: 'Mascota registrada exitosamente', mascotaId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la mascota' });
    }
});

// ==================== HISTORIAS CLÍNICAS ====================
/**
 * Obtener todas las historias clínicas
 */
router.get('/api/historias_clinicas', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM historias_clinicas');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las historias clínicas' });
    }
});


// Ruta para registrar historias clínicas
router.post("/api/historias_clinicas", async (req, res) => {
    try {
      const {
        mascota_id,
        fecha,
        vacunacion_tipo,
        vacunacion_fecha,
        desparasitacion_producto,
        desparasitacion_fecha,
        estado_reproductivo,
        alimentacion,
        habitat,
        alergias,
        cirugias,
        antecedentes,
        enfermedadAnterior,
        observaciones,
        veterinario_id,
      } = req.body;
  
      // Validar campos obligatorios
      if (!mascota_id || !fecha || !estado_reproductivo || !alimentacion || !habitat || !veterinario_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
      }
  
      // SQL para insertar los datos en la tabla
      const query = `
        INSERT INTO historias_clinicas (
          mascota_id,
          fecha,
          vacunacion_tipo,
          vacunacion_fecha,
          desparasitacion_producto,
          desparasitacion_fecha,
          estado_reproductivo,
          alimentacion,
          habitat,
          alergias,
          cirugias,
          antecedentes,
          enfermedadAnterior,
          observaciones,
          veterinario_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Ejecutar consulta a la base de datos
      const [result] = await db.query(query, [
        mascota_id,
        fecha,
        vacunacion_tipo || null,
        vacunacion_fecha || null,
        desparasitacion_producto || null,
        desparasitacion_fecha || null,
        estado_reproductivo,
        alimentacion,
        habitat,
        alergias || null,
        cirugias || null,
        antecedentes || null,
        enfermedadAnterior || null,
        observaciones || null,
        veterinario_id,
      ]);
  
      // Respuesta en caso de éxito
      res.status(201).json({
        message: "Historia clínica registrada exitosamente.",
        historia_clinica_id: result.insertId,
      });
    } catch (error) {
      console.error("Error al registrar la historia clínica:", error);
      res.status(500).json({ error: "Error al registrar la historia clínica." });
    }
  });
  
  
  
// Endpoint para obtener la lista de veterinarios
router.get("/api/veterinarios", async (req, res) => {
    try {
        const [results] = await db.query(
            "SELECT id, nombre FROM usuarios WHERE rol = 'veterinario'"
        );
        res.json(results);
    } catch (error) {
        console.error("Error al obtener veterinarios:", error);
        res.status(500).json({ error: "Error al obtener veterinarios" });
    }
});

router.get("/api/mascotasHistorial", async (req, res) => {
    try {
        const query = `
            SELECT id, nombre 
            FROM mascotas
        `;

        const [results] = await db.query(query); // Ya no necesitas usar db.promise()
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al obtener las mascotas:", error);
        res.status(500).json({ error: "Error al obtener las mascotas" });
    }
});


router.get('/api/propietariosHistorial', async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, nombre FROM propietarios');
        res.json(results);
    } catch (error) {
        console.error('Error al obtener los propietarios:', error);
        res.status(500).json({ error: 'Error al obtener los propietarios' });
    }
});

/* CONSULTA Y 
REGISTRO DE EXAMENES CLINICOS */
router.get('/api/examenes_clinicos', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM examenes_clinicos');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los examenes clinicos' });
    } 
});

router.post('/api/examenes_clinicos', async (req, res) => {
    try {
        const {
            mascota_id,
            fecha,
            actitud,
            condicion_corporal,
            hidratacion,
            observaciones,
            mucosa_conjuntiva,
            mucosa_conjuntiva_observaciones,
            mucosa_oral,
            mucosa_oral_observaciones,
            mucosa_vulvar_prepu,
            mucosa_vulvar_prepu_observaciones,
            mucosa_rectal,
            mucosa_rectal_observaciones,
            mucosa_ojos,
            mucosa_ojos_observaciones,
            mucosa_oidos,
            mucosa_oidos_observaciones,
            mucosa_nodulos,
            mucosa_nodulos_observaciones,
            mucosa_piel_anexos,
            mucosa_piel_anexos_observaciones,
            locomocion_estado,
            locomocion_observaciones,
            musculo_estado,
            musculo_observaciones,
            nervioso_estado,
            nervioso_observaciones,
            cardiovascular_estado,
            cardiovascular_observaciones,
            respiratorio_estado,
            respiratorio_observaciones,
            digestivo_estado,
            digestivo_observaciones,
            genitourinario_estado,
            genitourinario_observaciones,
        } = req.body;

        // Validación de campos obligatorios
        if (!mascota_id || !fecha || !actitud || !condicion_corporal || !hidratacion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }

        // Consulta SQL para insertar datos
        const query = `
        INSERT INTO examenes_clinicos (
            mascota_id,
            fecha,
            actitud,
            condicion_corporal,
            hidratacion,
            observaciones,
            mucosa_conjuntiva,
            mucosa_conjuntiva_observaciones,
            mucosa_oral,
            mucosa_oral_observaciones,
            mucosa_vulvar_prepu,
            mucosa_vulvar_prepu_observaciones,
            mucosa_rectal,
            mucosa_rectal_observaciones,
            mucosa_ojos,
            mucosa_ojos_observaciones,
            mucosa_oidos,
            mucosa_oidos_observaciones,
            mucosa_nodulos,
            mucosa_nodulos_observaciones,
            mucosa_piel_anexos,
            mucosa_piel_anexos_observaciones,
            locomocion_estado,
            locomocion_observaciones,
            musculo_estado,
            musculo_observaciones,
            nervioso_estado,
            nervioso_observaciones,
            cardiovascular_estado,
            cardiovascular_observaciones,
            respiratorio_estado,
            respiratorio_observaciones,
            digestivo_estado,
            digestivo_observaciones,
            genitourinario_estado,
            genitourinario_observaciones
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const [result] = await db.query(query, [
            mascota_id,
    fecha,
    actitud,
    condicion_corporal,
    hidratacion,
    observaciones || null,
    mucosa_conjuntiva || null,
    mucosa_conjuntiva_observaciones || null,
    mucosa_oral || null,
    mucosa_oral_observaciones || null,
    mucosa_vulvar_prepu || null,
    mucosa_vulvar_prepu_observaciones || null,
    mucosa_rectal || null,
    mucosa_rectal_observaciones || null,
    mucosa_ojos || null,
    mucosa_ojos_observaciones || null,
    mucosa_oidos || null,
    mucosa_oidos_observaciones || null,
    mucosa_nodulos || null,
    mucosa_nodulos_observaciones || null,
    mucosa_piel_anexos || null,
    mucosa_piel_anexos_observaciones || null,
    locomocion_estado || null,
    locomocion_observaciones || null,
    musculo_estado || null,
    musculo_observaciones || null,
    nervioso_estado || null,
    nervioso_observaciones || null,
    cardiovascular_estado || null,
    cardiovascular_observaciones || null,
    respiratorio_estado || null,
    respiratorio_observaciones || null,
    digestivo_estado || null,
    digestivo_observaciones || null,
    genitourinario_estado || null,
    genitourinario_observaciones || null,
        ]);

        res.status(201).json({
            message: 'Examen clínico registrado con éxito.',
            examen_clinico_id: result.insertId,
        });
    } catch (error) {
        console.error('Error al registrar el examen clínico:', error);
        res.status(500).json({ error: 'Error al registrar el examen clínico.' });
    }
});



module.exports = router;
