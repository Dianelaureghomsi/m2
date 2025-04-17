<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface Enseignant - E_SchoolConnect</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <!-- Barre de navigation -->
    <nav class="teacher-nav">
        <div class="nav-left">
            <img src="../assets/images/logo.png" alt="Logo" class="nav-logo">
        </div>
        <div class="nav-right">
            <ul class="nav-menu">
                <li><a href="index.php">Accueil</a></li>
                <li>
                    <a href="#">Notes des élèves <i class="fas fa-caret-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="ajouter-note.php">Ajouter une note</a></li>
                        <li><a href="consulter-notes.php">Consulter les notes</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Messages <i class="fas fa-caret-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="messages-recus.php">Messages reçus</a></li>
                        <li><a href="envoyer-message.php">Envoyer un message</a></li>
                    </ul>
                </li>
            </ul>
            <div class="teacher-account">
                <a href="logout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
            </div>
        </div>
    </nav>

    <!-- Contenu principal-->
    <main class="teacher-dashboard">
    </main>

<script src="../assets/js/script.js"></script>
</body>
</html>