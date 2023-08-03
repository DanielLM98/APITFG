-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-08-2023 a las 11:15:55
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `ID` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDCentro` int(11) DEFAULT NULL,
  `IDEmpresa` int(11) DEFAULT NULL,
  `IDTutorPracticas` int(11) DEFAULT NULL,
  `IDTutorClase` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camposformularios`
--

CREATE TABLE `camposformularios` (
  `ID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `FormularioID` int(11) NOT NULL,
  `nombre_alumno` varchar(255) DEFAULT NULL,
  `centro_docente` varchar(255) DEFAULT NULL,
  `nombre_ciclo` varchar(255) DEFAULT NULL,
  `grado` varchar(255) DEFAULT NULL,
  `centro_trabajo` varchar(255) DEFAULT NULL,
  `horas_realizadas` int(11) DEFAULT NULL,
  `nombre_tutor_trabajo` varchar(255) DEFAULT NULL,
  `nombre_tutor_centro` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros`
--

CREATE TABLE `centros` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `CorreoElectronico` varchar(100) NOT NULL,
  `Telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centros`
--

INSERT INTO `centros` (`ID`, `Nombre`, `Direccion`, `CorreoElectronico`, `Telefono`) VALUES
(2, 'Poligono Sur2', 'C. Esclava del Señor, 2, 41013 Sevilla', 'iespsur@gmail.com', '955622844'),
(3, 'Poligono Sur2', 'C. Esclava del Señor, 2, 41013 Sevilla', 'iespsur@gmail.com', '955622844'),
(4, 'Testereasd', 'Avda. La Paz 12', 'test@test.com', '647876022'),
(5, 'Teste23asd', 'asdsadsadsadsadsadsa', 'terst@test.com', '123456789'),
(6, 'sadsadasdsadsada', 'asdsadsadsadsadasd', 'daniel.luna@asfdsadsad.com', '123456798');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `CorreoElectronico` varchar(100) NOT NULL,
  `Telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`ID`, `Nombre`, `Direccion`, `CorreoElectronico`, `Telefono`) VALUES
(1, 'daniellunamoreno@gmail.com', 'asdf123456*', 'test@tes.com', '12345798'),
(2, 'Test de nuevo', 'test de nuevo 2', 'tst@ge2.com', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formularios`
--

CREATE TABLE `formularios` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Campos` text NOT NULL,
  `Rol` text NOT NULL,
  `Archivo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `formularios`
--

INSERT INTO `formularios` (`ID`, `Nombre`, `Descripcion`, `Campos`, `Rol`, `Archivo`) VALUES
(10, 'asadsadsadsadsad', 'sadsadsadsadsadsa', '                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"mb-3\">\r\n                                    <label class=\"form-label\">Nombre</label>\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"Nombre\" formControlName=\"nombre\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"mb-3\">\r\n                                    <label class=\"form-label\">Descripción</label>\r\n                                    <input class=\"form-control\" type=\"textarea\" placeholder=\"Nombre\"\r\n                                        formControlName=\"descripcion\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"mb-3\">\r\n                                    <p><small>Introduzca el formulario en html siguiendo la siguiente <a\r\n                                                href=\"../../../../assets/example.html\" download>plantilla</a></small>\r\n                                    </p>\r\n                                    <p><small>Tenga en cuenta la siguente <a>guía</a> para adaptar el pdf en el que será\r\n                                            plasmada la información del formulario relleno</small></p>\r\n                                    <textarea class=\"form-control\" type=\"textarea\" height=\"100px\"\r\n                                        placeholder=\"HTML Formulario\" formControlName=\"campos\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col\">\r\n                                <div class=\"mb-3\">\r\n                                    <label class=\"form-label\">Rol del formulario</label>\r\n                                    <select class=\"form-control\" formControlName=\"rol\">\r\n                                        <option value=\"Profesor\">Profesor</option>\r\n                                        <option value=\"Alumno\">Alumno</option>\r\n                                        <option value=\"TutorEmpresa\">Tutor Empresa</option>\r\n                                        <option value=\"TutorCentro\">Tutor Centro</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        \r\n                        ', 'Alumno', 'public\\FCT_Val_Alum_r.pdf-1690947732808.pdf'),
(11, 'sdsadsadsadsadsa', 'asdsadsadsadsa', 'asdsadsadsadsadsadsadsadsadsa', 'Profesor', 'public\\FCT_Val_Alum_r.pdf-1690948146629.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `ID` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `IDFormulario` int(11) NOT NULL,
  `Respuestas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`ID`, `IDUsuario`, `IDFormulario`, `Respuestas`) VALUES
(2, 8, 10, '{\"nombre\":\"asdsadsadsa\",\"descripcion\":\"dsadsadsdsad\",\"campos\":\"sadsadsadsad\",\"rol\":\"Profesor\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutoresclase`
--

CREATE TABLE `tutoresclase` (
  `ID` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `CentroID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutorestrabajo`
--

CREATE TABLE `tutorestrabajo` (
  `ID` int(11) NOT NULL,
  `IDUsuario` int(11) NOT NULL,
  `EmpresaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `CorreoElectronico` varchar(100) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `TipoUsuario` varchar(50) NOT NULL,
  `Estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `CorreoElectronico`, `Contrasena`, `TipoUsuario`, `Estado`) VALUES
(8, 'Daniel', 'Luna Moreno', 'daniellunamoreno@gmail.com', '$2a$12$nTaAtUuKkhmpAxSdbjRUVuafIRNAkfgd3WYlFOI3aO/2UyT//vxBy', 'Administrador', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDCentro` (`IDCentro`),
  ADD KEY `IDEmpresa` (`IDEmpresa`),
  ADD KEY `IDTutorPracticas` (`IDTutorPracticas`),
  ADD KEY `IDTutorClase` (`IDTutorClase`),
  ADD KEY `IDUsuario` (`IDUsuario`);

--
-- Indices de la tabla `camposformularios`
--
ALTER TABLE `camposformularios`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `FormularioID` (`FormularioID`);

--
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `formularios`
--
ALTER TABLE `formularios`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDFORMULARIO` (`IDFormulario`),
  ADD KEY `IDUSUARIO` (`IDUsuario`);

--
-- Indices de la tabla `tutoresclase`
--
ALTER TABLE `tutoresclase`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CentroID` (`CentroID`),
  ADD KEY `IDUsuario` (`ID`),
  ADD KEY `tutoresclase_ibfk_3` (`IDUsuario`);

--
-- Indices de la tabla `tutorestrabajo`
--
ALTER TABLE `tutorestrabajo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EmpresaID` (`EmpresaID`),
  ADD KEY `IDUsuario` (`ID`),
  ADD KEY `tutorestrabajo_ibfk_3` (`IDUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centros`
--
ALTER TABLE `centros`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `formularios`
--
ALTER TABLE `formularios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`IDCentro`) REFERENCES `centros` (`ID`),
  ADD CONSTRAINT `alumnos_ibfk_3` FOREIGN KEY (`IDEmpresa`) REFERENCES `empresas` (`ID`),
  ADD CONSTRAINT `alumnos_ibfk_4` FOREIGN KEY (`IDTutorPracticas`) REFERENCES `tutorestrabajo` (`ID`),
  ADD CONSTRAINT `alumnos_ibfk_5` FOREIGN KEY (`IDTutorClase`) REFERENCES `tutoresclase` (`ID`),
  ADD CONSTRAINT `alumnos_ibfk_6` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`);

--
-- Filtros para la tabla `camposformularios`
--
ALTER TABLE `camposformularios`
  ADD CONSTRAINT `camposformularios_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `camposformularios_ibfk_2` FOREIGN KEY (`FormularioID`) REFERENCES `formularios` (`ID`);

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `IDFORMULARIO` FOREIGN KEY (`IDFormulario`) REFERENCES `formularios` (`ID`),
  ADD CONSTRAINT `IDUSUARIO` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`);

--
-- Filtros para la tabla `tutoresclase`
--
ALTER TABLE `tutoresclase`
  ADD CONSTRAINT `tutoresclase_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `tutoresclase_ibfk_2` FOREIGN KEY (`CentroID`) REFERENCES `centros` (`ID`),
  ADD CONSTRAINT `tutoresclase_ibfk_3` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`);

--
-- Filtros para la tabla `tutorestrabajo`
--
ALTER TABLE `tutorestrabajo`
  ADD CONSTRAINT `tutorestrabajo_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `tutorestrabajo_ibfk_2` FOREIGN KEY (`EmpresaID`) REFERENCES `empresas` (`ID`),
  ADD CONSTRAINT `tutorestrabajo_ibfk_3` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
