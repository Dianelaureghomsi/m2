<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'parent') {
    header("Location: ../connexion.php");
    exit();
}
?>
<h1>Bienvenue <?= htmlspecialchars($_SESSION['nom']) ?> !</h1>
<a href="../logout.php">Se déconnecter</a>
