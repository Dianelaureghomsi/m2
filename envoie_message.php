<?php
session_start();
require_once 'db_connect.php';

// Vérifier si l'utilisateur est connecté en tant qu'enseignant
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'teacher') {
    header('HTTP/1.1 403 Forbidden');
    exit("Accès interdit");
}

// Vérifier si la requête est une méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    exit("Méthode non autorisée");
}

// Récupérer les données du formulaire
$teacher_id = $_SESSION['user_id'];
$recipient_type = $_POST['recipient_type'] ?? '';
$subject = trim($_POST['subject'] ?? '');
$content = trim($_POST['content'] ?? '');

// Validation des données
if (empty($subject) || empty($content)) {
    echo json_encode(['success' => false, 'message' => 'Le sujet et le contenu sont obligatoires']);
    exit;
}

try {
    // Démarrer une transaction
    $pdo->beginTransaction();
    
    // Gérer les différents types de destinataires
    if ($recipient_type === 'parent') {
        // Envoyer à un parent spécifique
        $parent_id = $_POST['parent_id'] ?? 0;
        
        // Vérifier que le parent existe
        $stmt = $pdo->prepare("SELECT id FROM parents WHERE id = ?");
        $stmt->execute([$parent_id]);
        
        if ($stmt->rowCount() === 0) {
            throw new Exception("Parent introuvable");
        }
        
        // Insérer le message
        $stmt = $pdo->prepare("
            INSERT INTO messages (sender_id, sender_type, recipient_id, recipient_type, subject, content, sent_at)
            VALUES (?, 'teacher', ?, 'parent', ?, ?, NOW())
        ");
        $stmt->execute([$teacher_id, $parent_id, $subject, $content]);
        
    } elseif ($recipient_type === 'class') {
        // Envoyer à tous les parents d'une classe
        $class = $_POST['class_id'] ?? '';
        
        // Récupérer tous les parents de la classe
        $stmt = $pdo->prepare("
            SELECT p.id FROM parents p
            JOIN students s ON p.id = s.parent_id
            WHERE s.class = ?
        ");
        $stmt->execute([$class]);
        $parents = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Insérer un message pour chaque parent
        $stmt = $pdo->prepare("
            INSERT INTO messages (sender_id, sender_type, recipient_id, recipient_type, subject, content, sent_at)
            VALUES (?, 'teacher', ?, 'parent', ?, ?, NOW())
        ");
        
        foreach ($parents as $parent_id) {
            $stmt->execute([$teacher_id, $parent_id, $subject, $content]);
        }
        
    } elseif ($recipient_type === 'all') {
        // Envoyer à tous les parents
        $stmt = $pdo->prepare("SELECT id FROM parents");
        $stmt->execute();
        $parents = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        $stmt = $pdo->prepare("
            INSERT INTO messages (sender_id, sender_type, recipient_id, recipient_type, subject, content, sent_at)
            VALUES (?, 'teacher', ?, 'parent', ?, ?, NOW())
        ");
        
        foreach ($parents as $parent_id) {
            $stmt->execute([$teacher_id, $parent_id, $subject, $content]);
        }
    } else {
        throw new Exception("Type de destinataire invalide");
    }
    
    // Valider la transaction
    $pdo->commit();
    
    echo json_encode(['success' => true, 'message' => 'Message(s) envoyé(s) avec succès']);
    
} catch (Exception $e) {
    // Annuler la transaction en cas d'erreur
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
}
?>