-- Adminer 4.8.1 MySQL 5.5.5-10.6.5-MariaDB-1:10.6.5+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `komis`;
CREATE DATABASE `komis` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `komis`;

DROP TABLE IF EXISTS `AdresKlienta`;
CREATE TABLE `AdresKlienta` (
  `idKlienta` int(11) DEFAULT NULL,
  `kodPocztowy` varchar(5) DEFAULT NULL,
  `miasto` varchar(30) DEFAULT NULL,
  `ulica` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AdresKlienta` (`idKlienta`, `kodPocztowy`, `miasto`, `ulica`) VALUES
(1,	'33300',	'Nowy Sacz',	'Limanowskiego 7'),
(2,	'00001',	'Warszawa',	'Swietokrzyska 31'),
(3,	'30063',	'Krakow',	'Hofmana Vlastimila'),
(4,	'80011',	'Gdansk',	'Katowa'),
(5,	'33300',	'Nowy Sacz',	'Graniczna 15');

DROP TABLE IF EXISTS `klienci`;
CREATE TABLE `klienci` (
  `idKlienta` int(11) NOT NULL AUTO_INCREMENT,
  `Imie` varchar(30) DEFAULT NULL,
  `Nazwisko` varchar(30) DEFAULT NULL,
  `Pesel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idKlienta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

INSERT INTO `klienci` (`idKlienta`, `Imie`, `Nazwisko`, `Pesel`) VALUES
(1,	'Michal',	'Pilecki',	'12345678901'),
(2,	'Joachim',	'Cieślak',	'09876543211'),
(3,	'Emanuel',	'Kucharski',	'57483920145'),
(4,	'Aleksander',	'Zieliński',	NULL),
(5,	'Bartłomiej',	'Walczak',	'76543218902');

DROP TABLE IF EXISTS `Kolory`;
CREATE TABLE `Kolory` (
  `idKoloru` int(11) NOT NULL AUTO_INCREMENT,
  `kolor` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idKoloru`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `Kolory` (`idKoloru`, `kolor`) VALUES
(1,	'Czerwony'),
(2,	'Niebieski'),
(3,	'Bialy');

DROP TABLE IF EXISTS `Marka`;
CREATE TABLE `Marka` (
  `idMarki` int(11) NOT NULL AUTO_INCREMENT,
  `Nazwa` varchar(30) DEFAULT NULL,
  `Model` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idMarki`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

INSERT INTO `Marka` (`idMarki`, `Nazwa`, `Model`) VALUES
(1,	'Audi',	'A53'),
(2,	'Fiat',	'Punto'),
(3,	'BMW',	'I3'),
(4,	'BMW',	'I8'),
(5,	'Citroen',	'C-Zero'),
(6,	'Jaguar',	'E-TYPE');

DROP TABLE IF EXISTS `Pojazdy`;
CREATE TABLE `Pojazdy` (
  `idPojazdu` int(11) NOT NULL AUTO_INCREMENT,
  `Kolor` int(11) DEFAULT NULL,
  `Marka` int(11) DEFAULT NULL,
  `Cena` decimal(10,2) DEFAULT NULL,
  `Stan` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idPojazdu`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

INSERT INTO `Pojazdy` (`idPojazdu`, `Kolor`, `Marka`, `Cena`, `Stan`) VALUES
(1,	1,	3,	2500.00,	'Uzywany'),
(2,	2,	1,	8500.00,	'Nowy'),
(3,	3,	1,	5000.00,	'Uzywany'),
(4,	3,	5,	17000.00,	'Nowy'),
(5,	1,	4,	3000.00,	'Uzywany'),
(6,	3,	2,	4500.00,	'Uzywany'),
(7,	1,	1,	9000.00,	'Nowy');

DROP TABLE IF EXISTS `Transakcje`;
CREATE TABLE `Transakcje` (
  `idTransakcji` int(11) NOT NULL AUTO_INCREMENT,
  `idPojazdu` int(11) DEFAULT NULL,
  `idKlienta` int(11) DEFAULT NULL,
  `dataTransakcji` date DEFAULT NULL,
  PRIMARY KEY (`idTransakcji`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

INSERT INTO `Transakcje` (`idTransakcji`, `idPojazdu`, `idKlienta`, `dataTransakcji`) VALUES
(1,	2,	1,	'2022-03-22'),
(2,	1,	4,	'2022-05-16'),
(3,	3,	3,	'2022-07-20'),
(4,	4,	5,	'2021-09-27'),
(5,	5,	1,	'2021-12-21'),
(6,	7,	2,	'2022-05-26');

-- 2022-05-31 21:29:02