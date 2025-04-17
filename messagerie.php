<?php
include 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinataire_type = $_POST['destinataire_type'];
    $sujet = $_POST['subject'];
    $contenu = $_POST['message'];
    
    // Gestion des différents types de destinataires
    if ($destinataire_type === 'parent') {
        $parent_id = $_POST['parent'];
        // Envoi au parent spécifique
    } elseif ($destinataire_type === 'classe') {
        $classe = $_POST['classe'];
        // Envoi à tous les parents de la classe
    } else {
        // Envoi à tous les parents
    }
    
    try {
        // Insertion du message en base de données
        $stmt = $pdo->prepare("INSERT INTO messages (enseignant_id, type_destinataire, parent_id, classe, sujet, contenu, date_envoi)
                              VALUES (?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$_SESSION['user_id'], $destinataire_type, $parent_id ?? null, $classe ?? null, $sujet, $contenu]);
        
        // Redirection avec message de succès
        header('Location: envoyer-message.php?success=1');
        exit();
    } catch (PDOException $e) {
        die("Erreur lors de l'envoi du message : " . $e->getMessage());
    }
} else {
    header('Location: envoyer-message.php');
    exit();
}
?>