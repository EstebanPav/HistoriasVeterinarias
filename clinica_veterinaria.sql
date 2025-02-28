-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2025 a las 15:22:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clinica_veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas_veterinarias`
--

CREATE TABLE `citas_veterinarias` (
  `id` int(11) NOT NULL,
  `mascota_id` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `propietario_id` int(11) NOT NULL,
  `veterinario_id` int(11) NOT NULL,
  `estado` enum('Pendiente','Confirmada','Cancelada') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas_veterinarias`
--

INSERT INTO `citas_veterinarias` (`id`, `mascota_id`, `fecha_hora`, `motivo`, `propietario_id`, `veterinario_id`, `estado`) VALUES
(11, 30, '2025-04-02 17:54:33', 'Desparacitación Completa', 32, 4, 'Pendiente'),
(12, 28, '2025-02-28 21:11:58', 'Vacunacion', 30, 4, 'Pendiente'),
(13, 30, '2025-03-11 18:29:02', 'Visita de vacunas y control ', 32, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `id` int(11) NOT NULL,
  `historia_clinica_id` int(11) NOT NULL,
  `tipo_examen` enum('Hemograma','Urianálisis','Coprológico','Citología','Química sanguínea','Rayos X','Cultivo y Antib','Biopsia','Otros') NOT NULL,
  `autorizado` tinyint(1) NOT NULL,
  `fecha` date DEFAULT NULL,
  `laboratorio` varchar(100) DEFAULT NULL,
  `resultados` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_clinicos`
--

CREATE TABLE `examenes_clinicos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `actitud` enum('Alterado','Nervioso','Tranquilo') DEFAULT NULL,
  `condicion_corporal` enum('Caquético','Delgado','Normal','Obeso','Sobrepeso') DEFAULT NULL,
  `hidratacion` enum('Normal','D. 0-5%','D. 6-7%','D. 8-9%','D. +10%') DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `mucosa_conjuntiva` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_conjuntiva_observaciones` text DEFAULT NULL,
  `mucosa_oral` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_oral_observaciones` text DEFAULT NULL,
  `mucosa_vulvar_prepu` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_vulvar_prepu_observaciones` text DEFAULT NULL,
  `mucosa_rectal` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_rectal_observaciones` text DEFAULT NULL,
  `mucosa_ojos` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_ojos_observaciones` text DEFAULT NULL,
  `mucosa_oidos` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_oidos_observaciones` text DEFAULT NULL,
  `mucosa_nodulos` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_nodulos_observaciones` text DEFAULT NULL,
  `mucosa_piel_anexos` enum('Normal','Anormal') DEFAULT NULL,
  `mucosa_piel_anexos_observaciones` text DEFAULT NULL,
  `locomocion_estado` enum('Normal','Anormal') DEFAULT NULL,
  `locomocion_observaciones` text DEFAULT NULL,
  `musculo_estado` enum('Normal','Anormal') DEFAULT NULL,
  `musculo_observaciones` text DEFAULT NULL,
  `nervioso_estado` enum('Normal','Anormal') DEFAULT NULL,
  `nervioso_observaciones` text DEFAULT NULL,
  `cardiovascular_estado` enum('Normal','Anormal') DEFAULT NULL,
  `cardiovascular_observaciones` text DEFAULT NULL,
  `respiratorio_estado` enum('Normal','Anormal') DEFAULT NULL,
  `respiratorio_observaciones` text DEFAULT NULL,
  `digestivo_estado` enum('Normal','Anormal') DEFAULT NULL,
  `digestivo_observaciones` text DEFAULT NULL,
  `genitourinario_estado` enum('Normal','Anormal') DEFAULT NULL,
  `genitourinario_observaciones` text DEFAULT NULL,
  `mascota_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes_clinicos`
--

INSERT INTO `examenes_clinicos` (`id`, `fecha`, `actitud`, `condicion_corporal`, `hidratacion`, `observaciones`, `mucosa_conjuntiva`, `mucosa_conjuntiva_observaciones`, `mucosa_oral`, `mucosa_oral_observaciones`, `mucosa_vulvar_prepu`, `mucosa_vulvar_prepu_observaciones`, `mucosa_rectal`, `mucosa_rectal_observaciones`, `mucosa_ojos`, `mucosa_ojos_observaciones`, `mucosa_oidos`, `mucosa_oidos_observaciones`, `mucosa_nodulos`, `mucosa_nodulos_observaciones`, `mucosa_piel_anexos`, `mucosa_piel_anexos_observaciones`, `locomocion_estado`, `locomocion_observaciones`, `musculo_estado`, `musculo_observaciones`, `nervioso_estado`, `nervioso_observaciones`, `cardiovascular_estado`, `cardiovascular_observaciones`, `respiratorio_estado`, `respiratorio_observaciones`, `digestivo_estado`, `digestivo_observaciones`, `genitourinario_estado`, `genitourinario_observaciones`, `mascota_id`) VALUES
(3, '2025-02-21', 'Tranquilo', 'Normal', 'Normal', 'El animal parece estar en buen estado general.', 'Anormal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Anormal', NULL, 'Normal', 'Sin irregularidades al caminar.', 'Normal', 'Músculos en buen estado.', 'Normal', 'Sin reflejos anormales.', 'Normal', 'Latidos regulares.', 'Anormal', 'Sibilancias detectadas.', 'Normal', 'Sin signos de dolor abdominal.', 'Normal', 'Sin problemas visibles.', 11),
(9, '2025-01-31', 'Tranquilo', 'Sobrepeso', 'D. 0-5%', 'JAUN', 'Normal', 'ESTEBAN', 'Normal', 'ESTEBAN', 'Normal', 'ESTEBAN', 'Normal', 'REVISAR', 'Anormal', 'REVISAR', 'Anormal', 'REVISAR', 'Anormal', 'ESTEBAN', 'Anormal', 'ESTEBAN', 'Normal', 'ESTEBAN', 'Normal', 'ESTEBAN', 'Anormal', 'ESTEBAN', 'Normal', 'ESTEBAN', 'Anormal', 'ESTEBAN', 'Anormal', 'LLEVAR A URGENCIAS YA ', 'Anormal', 'LLEVAR A URGENCIAS YA ', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias_clinicas`
--

CREATE TABLE `historias_clinicas` (
  `id` int(11) NOT NULL,
  `mascota_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `vacunacion_tipo` varchar(255) DEFAULT NULL,
  `vacunacion_fecha` date DEFAULT NULL,
  `desparasitacion_producto` varchar(255) DEFAULT NULL,
  `desparasitacion_fecha` date DEFAULT NULL,
  `estado_reproductivo` varchar(50) DEFAULT NULL,
  `alimentacion` varchar(50) DEFAULT NULL,
  `habitat` varchar(50) DEFAULT NULL,
  `alergias` varchar(255) DEFAULT NULL,
  `cirugias` varchar(255) DEFAULT NULL,
  `antecedentes` varchar(255) DEFAULT NULL,
  `EnfermedadesAnteriores` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `veterinario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historias_clinicas`
--

INSERT INTO `historias_clinicas` (`id`, `mascota_id`, `fecha`, `vacunacion_tipo`, `vacunacion_fecha`, `desparasitacion_producto`, `desparasitacion_fecha`, `estado_reproductivo`, `alimentacion`, `habitat`, `alergias`, `cirugias`, `antecedentes`, `EnfermedadesAnteriores`, `observaciones`, `veterinario_id`) VALUES
(13, 10, '2025-02-12', 'DatoPrueba', '2025-02-20', 'RozzieDesMax', '2025-02-21', 'Lactancia', 'Mixta', 'Rural', 'DatoPrueba', 'SIN CIRUGIA', 'SIN ANTECEDENTES', 'SINPRUEBA', 'SINPRUEBA', 1),
(18, 14, '2025-01-11', 'GENERAL', '2025-01-05', NULL, NULL, 'Entero', 'Balanceada', 'Taller', 'dfhg', 'sdgf', NULL, 'sdf', 'dfgh', 3),
(24, 11, '2025-01-15', 'V2REGISTRO', NULL, 'V2REGISTRO', '2025-01-26', 'Castrado', 'Balanceada', 'Finca', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 3),
(27, 11, '2025-02-23', 'Paracetamol', '2025-02-11', 'Paracetamol', '2025-02-11', 'Castrado', 'Balanceada', 'Lote', 'Sin alergias', 'Sin cirugias', 'Sin antecedentes', 'Sin enfermadades anteriores', 'Nada', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacion_veterinaria`
--

CREATE TABLE `informacion_veterinaria` (
  `id` int(11) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `numeros_contacto` varchar(100) NOT NULL,
  `eslogan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `informacion_veterinaria`
--

INSERT INTO `informacion_veterinaria` (`id`, `logo_url`, `nombre`, `direccion`, `numeros_contacto`, `eslogan`) VALUES
(1, 'https://i.imghippo.com/files/Wc5240mSM.png', 'Veterinaria San Sebastián', 'Av. Siempre Viva 123, Ciudad, País', '+123456789, +987654321', 'Cuidamos a tus mascotas como si fueran nuestras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `especie` enum('Perro','Gato','Otro') NOT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `procedencia` enum('Urbana','Rural') DEFAULT NULL,
  `chip` varchar(50) DEFAULT NULL,
  `propietario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `raza`, `sexo`, `color`, `fecha_nacimiento`, `edad`, `procedencia`, `chip`, `propietario_id`) VALUES
(10, 'Firulais', 'Perro', 'Gato', 'Hembra', 'Rojo', '2025-01-16', 3, 'Urbana', '34512', 11),
(11, 'Peluche', 'Perro', 'wert', 'Hembra', 'Blanco', '2025-01-09', 2, 'Urbana', '234', 13),
(14, 'PruebaRegistro', 'Perro', 'GatoPersaEgipcion', 'Hembra', 'DoradoPrecioso', '2025-01-25', 13, 'Rural', NULL, 32),
(28, 'Thomas', 'Perro', 'Lassie', 'Macho', 'Azul', '2025-02-21', 3, 'Urbana', '', 30),
(29, 'Michi', 'Perro', 'Lassi', 'Macho', 'Azul', '2025-02-20', 3, 'Urbana', '', 30),
(30, 'DragonComodo', 'Perro', 'BullDog', 'Macho', 'Negro', '2025-02-20', 2, 'Rural', '', 32),
(31, 'GatitoCerafin', 'Gato', 'Persa', 'Macho', 'Amarillo ', '2025-02-21', 3, 'Rural', '', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios`
--

CREATE TABLE `propietarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propietarios`
--

INSERT INTO `propietarios` (`id`, `nombre`, `direccion`, `ciudad`, `provincia`, `cedula`, `celular`) VALUES
(11, 'Rick', 'Alexandria', 'California', 'Manhatan', '0927323', '0987452234'),
(12, 'Carlos', 'dsds', 'hmh', 'hjhj', '12345', '54321'),
(13, 'Martino', 'Calle Pujili', 'Quito', 'Pichincha', '12345', '0967875'),
(24, 'MISSINGNULL', 'MISSINGNULL', 'MISSINGNULL', 'MISSINGNULLMISSINGNULL', '345', '2345'),
(30, 'Esteban Enrique Pavón Segovia', 'Pujili', 'Quito', 'Pichincha', '0550076681', '0984879212'),
(32, 'maria', 'maria', 'maria', 'maria', '1234567', '0961165121');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `rol` enum('veterinario','administrativo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasena`, `celular`, `rol`) VALUES
(1, 'Dr. Juan Pérez', 'juan.perez@clinica.com', 'password123', '09456789', 'veterinario'),
(2, 'Dr. Ana López', 'ana.lopez@vetclinic.com', 'securepassword1', NULL, 'veterinario'),
(3, 'Dr. Carlos Pérez', 'carlos.perez@vetclinic.com', 'securepassword2', '0992669531', 'veterinario'),
(4, 'Dra. Laura Gómez', 'laura.gomez@vetclinic.com', 'securepassword3', '0984311147', 'veterinario'),
(5, 'Dr. Mario López', 'mario.lopez@vetclinic.com', '$2b$10$mWW8eI3cqsGRY.A3gSLreepZkwSY.uXPijrkAko2lZplF75AqZxue', '0987654321', 'veterinario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas_veterinarias`
--
ALTER TABLE `citas_veterinarias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propietario_id` (`propietario_id`),
  ADD KEY `veterinario_id` (`veterinario_id`),
  ADD KEY `fk_mascota_cita` (`mascota_id`);

--
-- Indices de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historia_clinica_id` (`historia_clinica_id`);

--
-- Indices de la tabla `examenes_clinicos`
--
ALTER TABLE `examenes_clinicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mascota_id` (`mascota_id`);

--
-- Indices de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mascota` (`mascota_id`),
  ADD KEY `fk_veterinario` (`veterinario_id`);

--
-- Indices de la tabla `informacion_veterinaria`
--
ALTER TABLE `informacion_veterinaria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propietario_id` (`propietario_id`);

--
-- Indices de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas_veterinarias`
--
ALTER TABLE `citas_veterinarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `examenes_clinicos`
--
ALTER TABLE `examenes_clinicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `informacion_veterinaria`
--
ALTER TABLE `informacion_veterinaria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas_veterinarias`
--
ALTER TABLE `citas_veterinarias`
  ADD CONSTRAINT `citas_veterinarias_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `citas_veterinarias_ibfk_2` FOREIGN KEY (`veterinario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_mascota_cita` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD CONSTRAINT `diagnosticos_ibfk_1` FOREIGN KEY (`historia_clinica_id`) REFERENCES `historias_clinicas` (`id`);

--
-- Filtros para la tabla `examenes_clinicos`
--
ALTER TABLE `examenes_clinicos`
  ADD CONSTRAINT `fk_mascota_id` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `fk_mascota` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_veterinario` FOREIGN KEY (`veterinario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historias_clinicas_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`),
  ADD CONSTRAINT `historias_clinicas_ibfk_2` FOREIGN KEY (`veterinario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
