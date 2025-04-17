-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 17 avr. 2025 à 04:53
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `suivi_scolaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `absences`
--

CREATE TABLE `absences` (
  `absence_id` int(11) NOT NULL,
  `eleve_id` int(11) NOT NULL,
  `date_absence` date NOT NULL,
  `raison` enum('maladie','familiale','autre') NOT NULL,
  `justification` text DEFAULT NULL,
  `declare_par` int(11) NOT NULL,
  `statut` enum('en_attente','approuvee','rejetee') DEFAULT 'en_attente',
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `nom_a` varchar(100) NOT NULL,
  `email_a` varchar(100) NOT NULL,
  `tel_a` varchar(20) DEFAULT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id_admin`, `nom_a`, `email_a`, `tel_a`, `mot_de_passe`) VALUES
(1, 'Diane Laure', 'laure.ghomsi@facsciences-uy1.cm', '696713923', 'Dianelaure2');

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `classe_id` int(11) NOT NULL,
  `nom_classe` varchar(50) NOT NULL,
  `niveau` varchar(20) NOT NULL,
  `annee_scolaire` varchar(20) NOT NULL,
  `professeur_principal_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`classe_id`, `nom_classe`, `niveau`, `annee_scolaire`, `professeur_principal_id`) VALUES
(1, '6e ', '', '', NULL),
(2, '5e ', '', '', NULL),
(3, '4e ', '', '', NULL),
(4, '3e', '', '', NULL),
(5, '2nde', '', '', NULL),
(6, '1ere', '', '', NULL),
(7, 'tle', '', '', NULL),
(8, '1ereBil', '', '', NULL),
(9, 'Tlebil', '', '', NULL),
(10, '6e ', '', '', NULL),
(11, '5e ', '', '', NULL),
(12, '4e ', '', '', NULL),
(13, '3e', '', '', NULL),
(14, '2nde', '', '', NULL),
(15, '1ere', '', '', NULL),
(16, 'tle', '', '', NULL),
(17, '1ereBil', '', '', NULL),
(18, 'Tlebil', '', '', NULL),
(19, '6e ', '', '', NULL),
(20, '5e ', '', '', NULL),
(21, '4e ', '', '', NULL),
(22, '3e', '', '', NULL),
(23, '2nde', '', '', NULL),
(24, '1ere', '', '', NULL),
(25, 'tle', '', '', NULL),
(26, '1ereBil', '', '', NULL),
(27, 'Tlebil', '', '', NULL),
(28, '6e ', '', '', NULL),
(29, '5e ', '', '', NULL),
(30, '4e ', '', '', NULL),
(31, '3e', '', '', NULL),
(32, '2nde', '', '', NULL),
(33, '1ere', '', '', NULL),
(34, 'tle', '', '', NULL),
(35, '1ereBil', '', '', NULL),
(36, 'Tlebil', '', '', NULL),
(37, '6e ', '', '', NULL),
(38, '5e ', '', '', NULL),
(39, '4e ', '', '', NULL),
(40, '3e', '', '', NULL),
(41, '2nde', '', '', NULL),
(42, '1ere', '', '', NULL),
(43, 'tle', '', '', NULL),
(44, '1ereBil', '', '', NULL),
(45, 'Tlebil', '', '', NULL),
(46, '6e ', '', '', NULL),
(47, '5e ', '', '', NULL),
(48, '4e ', '', '', NULL),
(49, '3e', '', '', NULL),
(50, '2nde', '', '', NULL),
(51, '1ere', '', '', NULL),
(52, 'tle', '', '', NULL),
(53, '1ereBil', '', '', NULL),
(54, 'Tlebil', '', '', NULL),
(55, '6e ', '', '', NULL),
(56, '5e ', '', '', NULL),
(57, '4e ', '', '', NULL),
(58, '3e', '', '', NULL),
(59, '2nde', '', '', NULL),
(60, '1ere', '', '', NULL),
(61, 'tle', '', '', NULL),
(62, '1ereBil', '', '', NULL),
(63, 'Tlebil', '', '', NULL),
(64, '6e ', '', '', NULL),
(65, '5e ', '', '', NULL),
(66, '4e ', '', '', NULL),
(67, '3e', '', '', NULL),
(68, '2nde', '', '', NULL),
(69, '1ere', '', '', NULL),
(70, 'tle', '', '', NULL),
(71, '1ereBil', '', '', NULL),
(72, 'Tlebil', '', '', NULL),
(73, '6e ', '', '', NULL),
(74, '5e ', '', '', NULL),
(75, '4e ', '', '', NULL),
(76, '3e', '', '', NULL),
(77, '2nde', '', '', NULL),
(78, '1ere', '', '', NULL),
(79, 'tle', '', '', NULL),
(80, '1ereBil', '', '', NULL),
(81, 'Tlebil', '', '', NULL),
(82, '6e ', '', '', NULL),
(83, '5e ', '', '', NULL),
(84, '4e ', '', '', NULL),
(85, '3e', '', '', NULL),
(86, '2nde', '', '', NULL),
(87, '1ere', '', '', NULL),
(88, 'tle', '', '', NULL),
(89, '1ereBil', '', '', NULL),
(90, 'Tlebil', '', '', NULL),
(91, '6e ', '', '', NULL),
(92, '5e ', '', '', NULL),
(93, '4e ', '', '', NULL),
(94, '3e', '', '', NULL),
(95, '2nde', '', '', NULL),
(96, '1ere', '', '', NULL),
(97, 'tle', '', '', NULL),
(98, '1ereBil', '', '', NULL),
(99, 'Tlebil', '', '', NULL),
(100, '6e ', '', '', NULL),
(101, '5e ', '', '', NULL),
(102, '4e ', '', '', NULL),
(103, '3e', '', '', NULL),
(104, '2nde', '', '', NULL),
(105, '1ere', '', '', NULL),
(106, 'tle', '', '', NULL),
(107, '1ereBil', '', '', NULL),
(108, 'Tlebil', '', '', NULL),
(109, '6e ', '', '', NULL),
(110, '5e ', '', '', NULL),
(111, '4e ', '', '', NULL),
(112, '3e', '', '', NULL),
(113, '2nde', '', '', NULL),
(114, '1ere', '', '', NULL),
(115, 'tle', '', '', NULL),
(116, '1ereBil', '', '', NULL),
(117, 'Tlebil', '', '', NULL),
(118, '6e ', '', '', NULL),
(119, '5e ', '', '', NULL),
(120, '4e ', '', '', NULL),
(121, '3e', '', '', NULL),
(122, '2nde', '', '', NULL),
(123, '1ere', '', '', NULL),
(124, 'tle', '', '', NULL),
(125, '1ereBil', '', '', NULL),
(126, 'Tlebil', '', '', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `eleve_id` int(11) NOT NULL,
  `matricule` varchar(20) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `sexe` enum('M','F','Autre') DEFAULT NULL,
  `classe_id` int(11) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `enseignants`
--

CREATE TABLE `enseignants` (
  `id_enseignant` int(11) NOT NULL,
  `nom_e` varchar(100) NOT NULL,
  `email_e` varchar(100) NOT NULL,
  `tel_e` varchar(20) DEFAULT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enseignants`
--

INSERT INTO `enseignants` (`id_enseignant`, `nom_e`, `email_e`, `tel_e`, `mot_de_passe`) VALUES
(1, 'Mme.GHOMSI', 'dianelaureghomsi@gmail.com', '674330584', 'Dianelaure@237');

-- --------------------------------------------------------

--
-- Structure de la table `enseignements`
--

CREATE TABLE `enseignements` (
  `enseignement_id` int(11) NOT NULL,
  `enseignant_id` int(11) NOT NULL,
  `matiere_id` int(11) NOT NULL,
  `classe_id` int(11) NOT NULL,
  `annee_scolaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `evenement_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime DEFAULT NULL,
  `lieu` varchar(100) DEFAULT NULL,
  `type_evenement` enum('reunion','examen','vacances','activite','autre') NOT NULL,
  `cree_par` int(11) NOT NULL,
  `classe_id` int(11) DEFAULT NULL,
  `toute_ecole` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `matiere_id` int(11) NOT NULL,
  `nom_matiere` varchar(50) NOT NULL,
  `code_matiere` varchar(10) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `expediteur_id` int(11) NOT NULL,
  `destinataire_id` int(11) NOT NULL,
  `sujet` varchar(100) NOT NULL,
  `contenu` text NOT NULL,
  `est_lu` tinyint(1) DEFAULT 0,
  `date_envoi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `eleve_id` int(11) NOT NULL,
  `matiere_id` int(11) NOT NULL,
  `enseignant_id` int(11) NOT NULL,
  `valeur_note` decimal(5,2) NOT NULL,
  `type_note` enum('devoir','interro','test','examen','projet') NOT NULL,
  `date_note` date NOT NULL,
  `commentaires` text DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `type_notification` enum('note','absence','evenement','message') NOT NULL,
  `id_lie` int(11) DEFAULT NULL,
  `est_lue` tinyint(1) DEFAULT 0,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `parents`
--

CREATE TABLE `parents` (
  `id_parent` int(11) NOT NULL,
  `nom_p` varchar(100) NOT NULL,
  `email_p` varchar(100) NOT NULL,
  `tel_p` varchar(20) DEFAULT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `parents`
--

INSERT INTO `parents` (`id_parent`, `nom_p`, `email_p`, `tel_p`, `mot_de_passe`) VALUES
(5, 'Nzi', 'nzi@example.com', '696713923', 'Nzi@237'),
(11, 'Mbarga', 'mbarga@example.com', '699123456', 'Mbarga@237'),
(14, 'Mballa', 'mballa@example.com', '699123466', 'Mballa@237'),
(19, 'Mbarga', 'mba@example.com', '699123456', 'Mbarga@237'),
(34, 'Tamo', 'tamo@example.com', '696713124', 'tamo@237');

-- --------------------------------------------------------

--
-- Structure de la table `pieces_jointes`
--

CREATE TABLE `pieces_jointes` (
  `piece_jointe_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `chemin_fichier` varchar(255) NOT NULL,
  `type_fichier` varchar(50) NOT NULL,
  `taille_fichier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `utilisateur_id` int(11) NOT NULL,
  `nom_utilisateur` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe_hash` varchar(255) NOT NULL,
  `type_utilisateur` enum('admin','enseignant','parent') NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `derniere_connexion` timestamp NULL DEFAULT NULL,
  `est_actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `absences`
--
ALTER TABLE `absences`
  ADD PRIMARY KEY (`absence_id`),
  ADD KEY `eleve_id` (`eleve_id`),
  ADD KEY `declare_par` (`declare_par`);

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `email_a` (`email_a`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`classe_id`),
  ADD KEY `professeur_principal_id` (`professeur_principal_id`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`eleve_id`),
  ADD UNIQUE KEY `matricule` (`matricule`),
  ADD KEY `classe_id` (`classe_id`),
  ADD KEY `fk_parent` (`parent_id`);

--
-- Index pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD PRIMARY KEY (`id_enseignant`),
  ADD UNIQUE KEY `email_e` (`email_e`);

--
-- Index pour la table `enseignements`
--
ALTER TABLE `enseignements`
  ADD PRIMARY KEY (`enseignement_id`),
  ADD UNIQUE KEY `enseignant_id` (`enseignant_id`,`matiere_id`,`classe_id`,`annee_scolaire`),
  ADD KEY `matiere_id` (`matiere_id`),
  ADD KEY `classe_id` (`classe_id`);

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`evenement_id`),
  ADD KEY `cree_par` (`cree_par`),
  ADD KEY `classe_id` (`classe_id`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`matiere_id`),
  ADD UNIQUE KEY `code_matiere` (`code_matiere`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `expediteur_id` (`expediteur_id`),
  ADD KEY `destinataire_id` (`destinataire_id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `eleve_id` (`eleve_id`),
  ADD KEY `matiere_id` (`matiere_id`),
  ADD KEY `enseignant_id` (`enseignant_id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id_parent`),
  ADD UNIQUE KEY `email_p` (`email_p`);

--
-- Index pour la table `pieces_jointes`
--
ALTER TABLE `pieces_jointes`
  ADD PRIMARY KEY (`piece_jointe_id`),
  ADD KEY `message_id` (`message_id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`utilisateur_id`),
  ADD UNIQUE KEY `nom_utilisateur` (`nom_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `absences`
--
ALTER TABLE `absences`
  MODIFY `absence_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `classe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `eleve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `enseignants`
--
ALTER TABLE `enseignants`
  MODIFY `id_enseignant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `enseignements`
--
ALTER TABLE `enseignements`
  MODIFY `enseignement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `evenement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `matiere_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parents`
--
ALTER TABLE `parents`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `pieces_jointes`
--
ALTER TABLE `pieces_jointes`
  MODIFY `piece_jointe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `utilisateur_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absences`
--
ALTER TABLE `absences`
  ADD CONSTRAINT `absences_ibfk_1` FOREIGN KEY (`eleve_id`) REFERENCES `eleves` (`eleve_id`),
  ADD CONSTRAINT `absences_ibfk_2` FOREIGN KEY (`declare_par`) REFERENCES `utilisateurs` (`utilisateur_id`);

--
-- Contraintes pour la table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`professeur_principal_id`) REFERENCES `utilisateurs` (`utilisateur_id`);

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`classe_id`),
  ADD CONSTRAINT `fk_parent` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`id_parent`) ON DELETE SET NULL;

--
-- Contraintes pour la table `enseignements`
--
ALTER TABLE `enseignements`
  ADD CONSTRAINT `enseignements_ibfk_1` FOREIGN KEY (`enseignant_id`) REFERENCES `utilisateurs` (`utilisateur_id`),
  ADD CONSTRAINT `enseignements_ibfk_2` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`matiere_id`),
  ADD CONSTRAINT `enseignements_ibfk_3` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`classe_id`);

--
-- Contraintes pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD CONSTRAINT `evenements_ibfk_1` FOREIGN KEY (`cree_par`) REFERENCES `utilisateurs` (`utilisateur_id`),
  ADD CONSTRAINT `evenements_ibfk_2` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`classe_id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`expediteur_id`) REFERENCES `utilisateurs` (`utilisateur_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`destinataire_id`) REFERENCES `utilisateurs` (`utilisateur_id`);

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`eleve_id`) REFERENCES `eleves` (`eleve_id`),
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`matiere_id`),
  ADD CONSTRAINT `notes_ibfk_3` FOREIGN KEY (`enseignant_id`) REFERENCES `utilisateurs` (`utilisateur_id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`utilisateur_id`);

--
-- Contraintes pour la table `pieces_jointes`
--
ALTER TABLE `pieces_jointes`
  ADD CONSTRAINT `pieces_jointes_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
