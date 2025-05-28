-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 01:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devs_choice`
--
CREATE DATABASE IF NOT EXISTS `devs_choice` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `devs_choice`;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `estrelas` int(11) DEFAULT NULL CHECK (`estrelas` between 1 and 5),
  `data_envio` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opcoes`
--

CREATE TABLE `opcoes` (
  `id` int(11) NOT NULL,
  `pergunta_id` int(11) DEFAULT NULL,
  `texto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opcoes`
--

INSERT INTO `opcoes` (`id`, `pergunta_id`, `texto`) VALUES
(1, 2, 'Site ou sistema web'),
(2, 2, 'Aplicativo mobile'),
(3, 2, 'Programa para desktop'),
(4, 2, 'Projeto com hardware / IoT'),
(5, 2, 'Jogo digital'),
(6, 2, 'Análise de dados / IA'),
(7, 2, 'Outros'),
(8, 3, 'Iniciante'),
(9, 3, 'Intermediário'),
(10, 3, 'Avançado');

-- --------------------------------------------------------

--
-- Table structure for table `perguntas`
--

CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `tipo` enum('texto','multipla_escolha','unica_escolha') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perguntas`
--

INSERT INTO `perguntas` (`id`, `texto`, `tipo`) VALUES
(1, 'Qual é o nome do seu projeto?', 'texto'),
(2, 'Qual o tipo do seu projeto?', 'unica_escolha'),
(3, 'Qual seu nível de experiência?', 'unica_escolha'),
(4, 'O que você quer que esse projeto faça?', 'texto');

-- --------------------------------------------------------

--
-- Stand-in structure for view `perguntas_com_opcoes`
-- (See below for the actual view)
--
CREATE TABLE `perguntas_com_opcoes` (
`pergunta_id` int(11)
,`pergunta_texto` varchar(255)
,`opcao_id` int(11)
,`opcao_texto` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','moderator','admin') NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `role`, `email`) VALUES
(1, 'Adm01', '$2y$10$3W08gg4VM6Nd1abkzcp1UeXLn4IH44HbuAQXgcL0xJuX6JeyxtIhm', 'admin', 'shinigami@devschoice.com'),
(2, 'Adm02', '$2y$10$PG9U6ftvTtPcnfie.cF/1evSrmX6x17G6AdHgNbIyjLFztBZbRl66', 'admin', 'batatao@devschoice.com'),
(3, 'Adm03', '$2y$10$tdkyV6cDZpMfQ/MW3FNBFuG89Dqh4tJsm.fKgLk.2fI5cAkRpoy8q', 'admin', 'fantasmaretro@devschoice.com'),
(6, 'Mason Greenwood', '', 'user', NULL),
(7, 'João Vitor de Moraes Bringmann', '', 'user', NULL),
(8, 'Lucas Salomão Boschiroli', '', 'user', NULL),
(9, 'Matheus Becchi Arruda', '', 'user', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `users_view`
-- (See below for the actual view)
--
CREATE TABLE `users_view` (
`id` int(11)
,`name` varchar(100)
,`role` enum('user','moderator','admin')
,`email` varchar(255)
,`password` varchar(255)
);

-- --------------------------------------------------------

--
-- Structure for view `perguntas_com_opcoes`
--
DROP TABLE IF EXISTS `perguntas_com_opcoes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `perguntas_com_opcoes`  AS SELECT `p`.`id` AS `pergunta_id`, `p`.`texto` AS `pergunta_texto`, `o`.`id` AS `opcao_id`, `o`.`texto` AS `opcao_texto` FROM (`perguntas` `p` left join `opcoes` `o` on(`p`.`id` = `o`.`pergunta_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `users_view`
--
DROP TABLE IF EXISTS `users_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `users_view`  AS SELECT `users`.`id` AS `id`, `users`.`name` AS `name`, `users`.`role` AS `role`, CASE WHEN `users`.`role` = 'moderator' THEN `users`.`email` ELSE NULL END AS `email`, CASE WHEN `users`.`role` = 'moderator' THEN `users`.`password` ELSE NULL END AS `password` FROM `users` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `opcoes`
--
ALTER TABLE `opcoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pergunta_id` (`pergunta_id`);

--
-- Indexes for table `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opcoes`
--
ALTER TABLE `opcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `opcoes`
--
ALTER TABLE `opcoes`
  ADD CONSTRAINT `opcoes_ibfk_1` FOREIGN KEY (`pergunta_id`) REFERENCES `perguntas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
