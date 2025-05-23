-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2025 at 01:59 PM
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','moderator','admin') NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `role`, `email`) VALUES
(9, 'Mason Greenwood', '', 'user', NULL),
(10, 'Adm02', '$2y$10$PG9U6ftvTtPcnfie.cF/1evSrmX6x17G6AdHgNbIyjLFztBZbRl66', 'admin', 'batatao@devschoice.com'),
(11, 'Adm01', '$2y$10$3W08gg4VM6Nd1abkzcp1UeXLn4IH44HbuAQXgcL0xJuX6JeyxtIhm', 'admin', 'shinigami@devschoice.com'),
(16, 'Adm03', '$2y$10$tdkyV6cDZpMfQ/MW3FNBFuG89Dqh4tJsm.fKgLk.2fI5cAkRpoy8q', 'admin', 'fantasmaretro@devschoice.com'),
(18, 'tra', '', 'user', NULL),
(19, 'Matheus Becchi', '', 'user', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `users_view`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `users_view`;
CREATE TABLE IF NOT EXISTS `users_view` (
`id` int(11)
,`name` varchar(100)
,`role` enum('user','moderator','admin')
,`email` varchar(255)
,`password` varchar(255)
);

-- --------------------------------------------------------

--
-- Structure for view `users_view`
--
DROP TABLE IF EXISTS `users_view`;

DROP VIEW IF EXISTS `users_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `users_view`  AS SELECT `users`.`id` AS `id`, `users`.`name` AS `name`, `users`.`role` AS `role`, CASE WHEN `users`.`role` = 'moderator' THEN `users`.`email` ELSE NULL END AS `email`, CASE WHEN `users`.`role` = 'moderator' THEN `users`.`password` ELSE NULL END AS `password` FROM `users` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


/*-------------SQL para o Questionario-------------*/

CREATE TABLE perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(255) NOT NULL,
    tipo ENUM('texto', 'multipla_escolha', 'unica_escolha') NOT NULL
);


CREATE TABLE opcoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pergunta_id INT,
    texto VARCHAR(255) NOT NULL,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE
);

CREATE VIEW perguntas_com_opcoes AS
SELECT
    p.id AS pergunta_id,
    p.texto AS pergunta_texto,
    o.id AS opcao_id,
    o.texto AS opcao_texto
FROM
    perguntas p
LEFT JOIN
    opcoes o ON p.id = o.pergunta_id;


CREATE TABLE respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    pergunta_id INT,
    resposta TEXT,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE
);

CREATE VIEW respostas_completa AS
SELECT
    r.id AS resposta_id,                 -- ID da resposta
    r.usuario AS usuario_nome,            -- Nome do usuário
    p.texto AS pergunta_texto,           -- Texto da pergunta
    p.tipo AS pergunta_tipo,             -- Tipo da pergunta (texto, múltipla escolha única escolha)
    r.resposta AS resposta_texto         -- Resposta do usuário
FROM
    respostas r
JOIN
    perguntas p ON r.pergunta_id = p.id; -- Fazendo o JOIN entre 'respostas' e 'perguntas'

CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comentario TEXT,
    estrelas INT CHECK (estrelas BETWEEN 1 AND 5),
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
);
