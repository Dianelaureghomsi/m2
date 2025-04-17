<?php include 'includes/header.php'; ?>

<!-- Section Interface Parent >
<section class="parent-section">
    <h2>INTERFACE ENSEIGNANT</h2>
    <p>Gestion des notes et communication avec les parents</p>
</section>

< Section Statistiques >
<section class="stats-section">
    <div class="stat-card">
        <h3>NOTES AJOUTÉES</h3>
        <div class="stat-value">42</div>
    </div>
    <div class="stat-card">
        <h3>MESSAGES REÇUS</h3>
        <div class="stat-value">15</div>
    </div>
    <div class="stat-card">
        <h3>ÉLÈVES</h3>
        <div class="stat-value">32</div>
    </div>
</section>

<! ?php include 'includes/footer.php'; ? -->

<!?php
session_start();

// Si l'utilisateur est déjà connecté, redirige-le vers son interface
if (isset($_SESSION['role'])) {
    switch ($_SESSION['role']) {
        case 'parent':
            header("Location: parent.html");
            exit;
        case 'enseignant':
            header("Location: enseignants.html");
            exit;
        case 'admin':
            header("Location: pages/admin/admin.html");
            exit;
    }
}

// Sinon, afficher l'accueil (public)
?>

<!DOCTYPE html>
<html>
<head>
  <title>Accueil</title>
  <!-- Inclure CSS -->
</head>
<body>
  <h1>Bienvenue</h1>
  <a href="choix_connexion.php">Se connecter</a>
</body>
</html>
<?php
header("Location: indexe.html");
exit();
?>
