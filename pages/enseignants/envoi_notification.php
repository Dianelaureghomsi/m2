<?php
require_once '../includes/check_auth.php';
if ($_SESSION['role'] != 'teacher') {
    header("Location: ../index.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $eleve_id = $_POST['eleve_id'];
    $titre = $_POST['titre'];
    $contenu = $_POST['contenu'];
    $urgence = $_POST['urgence'];
    
    // Enregistrement en base
    $query = "INSERT INTO notifications (eleve_id, enseignant_id, titre, contenu, urgence, date_creation) 
              VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iissi", $eleve_id, $_SESSION['user_id'], $titre, $contenu, $urgence);
    $stmt->execute();
    
    // Envoi par email (simplifié)
    $parent_email = get_parent_email($eleve_id);
    $subject = "Notification scolaire: $titre";
    $message = "Bonjour,\n\n$contenu\n\nCordialement,\nL'équipe pédagogique";
    mail($parent_email, $subject, $message);
    
    // Envoi SMS (implémentation réelle nécessiterait une API SMS)
    $parent_phone = get_parent_phone($eleve_id);
    // send_sms($parent_phone, $message);
    
    $_SESSION['success'] = "Notification envoyée avec succès";
    header("Location: dashboard.php");
    exit();
}

// Récupérer la liste des élèves
$query = "SELECT mat_el, nom_el FROM eleves WHERE classe_id IN 
          (SELECT classe_id FROM enseignants_classes WHERE enseignant_id = ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$eleves = $stmt->get_result();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Envoyer une Notification</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header>
        <h1>Envoyer une Notification</h1>
        <nav>
            <a href="dashboard.php">Tableau de Bord</a>
            <a href="../logout.php">Déconnexion</a>
        </nav>
    </header>

    <main>
        <form method="post">
            <label for="eleve_id">Élève:</label>
            <select name="eleve_id" id="eleve_id" required>
                <?php while ($eleve = $eleves->fetch_assoc()): ?>
                <option value="<?= $eleve['mat_el'] ?>"><?= htmlspecialchars($eleve['nom_el']) ?></option>
                <?php endwhile; ?>
            </select>
            
            <label for="titre">Titre:</label>
            <input type="text" name="titre" id="titre" required>
            
            <label for="contenu">Contenu:</label>
            <textarea name="contenu" id="contenu" required></textarea>
            
            <label for="urgence">Niveau d'urgence:</label>
            <select name="urgence" id="urgence">
                <option value="1">Normal</option>
                <option value="2">Important</option>
                <option value="3">Urgent</option>
            </select>
            
            <button type="submit">Envoyer</button>
        </form>
    </main>
</body>
</html>