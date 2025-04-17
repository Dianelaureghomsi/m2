<?php
session_start();
require_once 'db_connect.php';

// Vérifier si l'utilisateur est connecté en tant qu'enseignant
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'teacher') {
    header('HTTP/1.1 403 Forbidden');
    exit("Accès interdit");
}

$teacher_id = $_SESSION['user_id'];
$type = $_GET['type'] ?? 'received'; // 'received' ou 'sent'
$filter = $_GET['filter'] ?? 'all';

try {
    if ($type === 'received') {
        // Récupérer les messages reçus
        $sql = "
            SELECT m.*, p.first_name, p.last_name 
            FROM messages m
            JOIN parents p ON m.sender_id = p.id
            WHERE m.recipient_id = ? AND m.recipient_type = 'teacher'
        ";
        
        if ($filter === 'unread') {
            $sql .= " AND m.read_at IS NULL";
        } elseif ($filter === 'read') {
            $sql .= " AND m.read_at IS NOT NULL";
        }
        
        $sql .= " ORDER BY m.sent_at DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$teacher_id]);
        
    } else {
        // Récupérer les messages envoyés
        $sql = "
            SELECT m.*, 
                   CASE 
                     WHEN m.recipient_type = 'parent' THEN CONCAT(p.first_name, ' ', p.last_name)
                     WHEN m.recipient_type = 'class' THEN CONCAT('Classe ', m.recipient_id)
                     ELSE 'Tous les parents'
                   END as recipient_name
            FROM messages m
            LEFT JOIN parents p ON m.recipient_id = p.id AND m.recipient_type = 'parent'
            WHERE m.sender_id = ? AND m.sender_type = 'teacher'
        ";
        
        if ($filter === 'class') {
            $sql .= " AND m.recipient_type = 'class'";
        } elseif ($filter === 'parent') {
            $sql .= " AND m.recipient_type = 'parent'";
        }
        
        $sql .= " ORDER BY m.sent_at DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$teacher_id]);
    }
    
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'messages' => $messages]);
    
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>