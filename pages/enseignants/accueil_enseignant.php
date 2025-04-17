<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'enseignant') {
    header("Location: ../connexion.php");
    exit();
}
?>
<h1>Bienvenue <?= htmlspecialchars($_SESSION['nom']) ?> (Enseignant)</h1>
<a href="../logout.php">Se déconnecter</a>
