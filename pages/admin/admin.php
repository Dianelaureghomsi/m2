<?php
require_once '../includes/check_auth.php';
if ($_SESSION['role'] != 'admin') {
    header("Location: ../index.php");
    exit();
}

// Gestion des actions
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'delete':
            $id = $_GET['id'];
            $table = $_GET['type'];
            $query = "DELETE FROM $table WHERE id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $_SESSION['success'] = "Compte supprimé avec succès";
            break;
    }
}

// Récupérer tous les comptes
$parents = $conn->query("SELECT * FROM parents");
$enseignants = $conn->query("SELECT * FROM enseignants");
$eleves = $conn->query("SELECT e.*, p.nom_p as parent_name FROM eleves e JOIN parents p ON e.parent_id = p.id_parent");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Gestion des Comptes</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header>
        <h1>Gestion des Comptes</h1>
        <nav>
            <a href="dashboard.php">Tableau de Bord</a>
            <a href="../logout.php">Déconnexion</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Parents</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($parent = $parents->fetch_assoc()): ?>
                    <tr>
                        <td><?= htmlspecialchars($parent['nom_p']) ?></td>
                        <td><?= htmlspecialchars($parent['email_p']) ?></td>
                        <td><?= htmlspecialchars($parent['tel_p']) ?></td>
                        <td>
                            <a href="edit_account.php?type=parents&id=<?= $parent['id_parent'] ?>">Modifier</a>
                            <a href="?action=delete&type=parents&id=<?= $parent['id_parent'] ?>" onclick="return confirm('Êtes-vous sûr?')">Supprimer</a>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
            <a href="add_account.php?type=parent">Ajouter un Parent</a>
        </section>

        <!-- Sections similaires pour enseignants et élèves -->
    </main>
</body>
</html>
