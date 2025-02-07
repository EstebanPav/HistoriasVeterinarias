-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-02-2025 a las 01:22:32
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
(3, '2025-01-25', 'Alterado', 'Normal', 'Normal', 'El animal parece estar en buen estado general.', 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Normal', NULL, 'Anormal', NULL, 'Normal', 'Sin irregularidades al caminar.', 'Normal', 'Músculos en buen estado.', 'Normal', 'Sin reflejos anormales.', 'Normal', 'Latidos regulares.', 'Anormal', 'Sibilancias detectadas.', 'Normal', 'Sin signos de dolor abdominal.', 'Normal', 'Sin problemas visibles.', 11),
(7, '2025-01-09', 'Alterado', 'Delgado', 'D. 6-7%', 'YAAA', 'Anormal', 'YAAA', 'Normal', 'YAAA', 'Normal', 'YAAA', 'Normal', 'YAAA', 'Normal', 'YAAA', 'Anormal', 'YAAA', 'Normal', 'YAAA', 'Anormal', 'YAAA', 'Normal', 'YAAA', 'Normal', 'YAAA', 'Anormal', 'YAAA', 'Anormal', 'YAAA', 'Normal', 'YAAA', 'Anormal', 'YAAA', 'Anormal', 'YAAA', 11);

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
(13, 10, '2025-01-25', 'DatoPrueba', '2024-05-01', 'Dexpar2', '2024-06-15', 'Castrado', 'Balanceada', 'Casa', 'DatoPrueba', 'DatoPrueba', 'DatoPrueba', 'DatoPrueba', 'DatoPrueba', 1),
(14, 10, '2025-01-17', 'DATOPRUEBA2', '2025-01-16', 'DATOPRUEBA2', '2025-01-17', 'Castrado', 'Balanceada', 'Casa', 'DATOPRUEBA2', 'DATOPRUEBA2', 'DATOPRUEBA2', 'DATOPRUEBA2', 'DATOPRUEBA2', 2),
(18, 14, '2025-01-11', 'GENERAL', '2025-01-05', NULL, NULL, 'Entero', 'Balanceada', 'Taller', 'dfhg', 'sdgf', NULL, 'sdf', 'dfgh', 3),
(24, 11, '2025-01-15', 'V2REGISTRO', NULL, 'V2REGISTRO', '2025-01-26', 'Castrado', 'Balanceada', 'Finca', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 'V2REGISTRO', 3),
(27, 11, '2025-02-23', 'Paracetamol', '2025-02-11', 'Paracetamol', '2025-02-11', 'Castrado', 'Balanceada', 'Lote', 'Sin alergias', 'Sin cirugias', 'Sin antecedentes', 'Sin enfermadades anteriores', 'Nada', 3);

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
(11, 'Peluche', 'Gato', 'wert', 'Hembra', 'Blanco', '2025-01-09', 2, 'Urbana', '234', 13),
(13, 'Eliminar', 'Perro', 'tyui', 'Macho', 'dfg', '2025-01-09', 2, 'Urbana', NULL, 13),
(14, 'PruebaRegistro', 'Perro', 'dfgh', 'Macho', 'sdfg', '2025-01-25', 13, 'Rural', NULL, 13),
(15, 'LeoArdilla', 'Perro', 'tyui', 'Hembra', 'xcfgh', '2025-01-24', 43, 'Urbana', '23', 12),
(19, 'NULLTEXT', 'Perro', 'NULLTEXT', 'Macho', 'NULLTEXT', '2025-01-19', 3, 'Urbana', '', 24),
(22, 'VitaLife', 'Perro', 'Golden Retriver', 'Macho', 'Rojo', '2025-02-19', 123, 'Urbana', '', 11);

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
(11, 'Rick', 'Alexandria', 'California', 'Albanyj', '0927323', '2322451'),
(12, 'Carlos', 'dsds', 'hmh', 'hjhj', '12345', '54321'),
(13, 'Martino', 'dfdf', 'hgre', 'ghmhgfe', '12345', '87654'),
(24, 'MISSINGNULL', 'MISSINGNULL', 'MISSINGNULL', 'MISSINGNULLMISSINGNULL', '345', '2345');

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
(3, 'Dr. Carlos Pérez', 'carlos.perez@vetclinic.com', 'securepassword2', NULL, 'veterinario'),
(4, 'Dra. Laura Gómez', 'laura.gomez@vetclinic.com', 'securepassword3', NULL, 'veterinario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunaciones`
--

CREATE TABLE `vacunaciones` (
  `id` int(11) NOT NULL,
  `mascota_id` int(11) NOT NULL,
  `tipo_vacuna` enum('CPV','Triple','Múltiple','Rabia','Otros') NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mascota_id` (`mascota_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `examenes_clinicos`
--
ALTER TABLE `examenes_clinicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

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

--
-- Filtros para la tabla `vacunaciones`
--
ALTER TABLE `vacunaciones`
  ADD CONSTRAINT `vacunaciones_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
