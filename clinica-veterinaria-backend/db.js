const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost', // Cambia según tu configuración
  user: 'root',      // Cambia según tu usuario
  password: '', // Cambia según tu contraseña
  database: 'clinica_veterinaria', // Cambia según tu base de datos
});

module.exports = db.promise();
