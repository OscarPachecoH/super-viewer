-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2025 a las 20:16:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `superviewer`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expenses_machines`
--

CREATE TABLE `expenses_machines` (
  `id` int(11) NOT NULL,
  `idProjects` int(11) NOT NULL,
  `machine` varchar(50) NOT NULL,
  `amount` double NOT NULL,
  `totalCost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `expenses_machines`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expenses_materials`
--

CREATE TABLE `expenses_materials` (
  `id` int(11) NOT NULL,
  `idProjects` int(11) NOT NULL,
  `material` varchar(20) NOT NULL,
  `amount` double NOT NULL,
  `totalCost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `expenses_materials`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expenses_tramits`
--

CREATE TABLE `expenses_tramits` (
  `id` int(11) NOT NULL,
  `idProjects` int(11) NOT NULL,
  `tramite` varchar(50) NOT NULL,
  `totalCost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `expenses_tramits`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `floors_advance`
--

CREATE TABLE `floors_advance` (
  `id` int(11) NOT NULL,
  `idPiso` int(11) NOT NULL,
  `totalAdvance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `floors_projects`
--

CREATE TABLE `floors_projects` (
  `id` int(11) NOT NULL,
  `idProject` int(11) NOT NULL,
  `numPiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `project` varchar(100) NOT NULL,
  `location` varchar(50) NOT NULL,
  `resident` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `projects`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surnamePaternal` varchar(20) NOT NULL,
  `surnameMaternal` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `expenses_machines`
--
ALTER TABLE `expenses_machines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProjects` (`idProjects`);

--
-- Indices de la tabla `expenses_materials`
--
ALTER TABLE `expenses_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProjects` (`idProjects`);

--
-- Indices de la tabla `expenses_tramits`
--
ALTER TABLE `expenses_tramits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProjects` (`idProjects`);

--
-- Indices de la tabla `floors_advance`
--
ALTER TABLE `floors_advance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPiso` (`idPiso`);

--
-- Indices de la tabla `floors_projects`
--
ALTER TABLE `floors_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProject` (`idProject`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `expenses_machines`
--
ALTER TABLE `expenses_machines`
  ADD CONSTRAINT `expenses_machines_ibfk_1` FOREIGN KEY (`idProjects`) REFERENCES `projects` (`id`);

--
-- Filtros para la tabla `expenses_materials`
--
ALTER TABLE `expenses_materials`
  ADD CONSTRAINT `expenses_materials_ibfk_1` FOREIGN KEY (`idProjects`) REFERENCES `projects` (`id`);

--
-- Filtros para la tabla `expenses_tramits`
--
ALTER TABLE `expenses_tramits`
  ADD CONSTRAINT `expenses_tramits_ibfk_1` FOREIGN KEY (`idProjects`) REFERENCES `projects` (`id`);

--
-- Filtros para la tabla `floors_advance`
--
ALTER TABLE `floors_advance`
  ADD CONSTRAINT `floors_advance_ibfk_1` FOREIGN KEY (`idPiso`) REFERENCES `floors_projects` (`id`);

--
-- Filtros para la tabla `floors_projects`
--
ALTER TABLE `floors_projects`
  ADD CONSTRAINT `floors_projects_ibfk_1` FOREIGN KEY (`idProject`) REFERENCES `projects` (`id`);

--
-- Filtros para la tabla `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
