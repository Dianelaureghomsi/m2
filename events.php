<?php
// events.php - Backend pour gérer les événements

// Connexion à la base de données (à adapter avec vos informations)
$db = new PDO('mysql:host=localhost;dbname=eschoolconnect;charset=utf8', 'username', 'password');

// Récupération des événements pour le parent connecté
function getEventsForParent($parentId, $filter = 'all') {
    global $db;
    
    $today = date('Y-m-d');
    $sql = "SELECT e.*, t.nom AS teacher_name 
            FROM events e
            JOIN teachers t ON e.teacher_id = t.id
            JOIN student_parent sp ON e.class_id = sp.class_id
            WHERE sp.parent_id = :parent_id";
    
    // Ajout du filtre
    if ($filter === 'upcoming') {
        $sql .= " AND e.event_date >= :today";
    } elseif ($filter === 'past') {
        $sql .= " AND e.event_date < :today";
    }
    
    $sql .= " ORDER BY e.event_date DESC";
    
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':parent_id', $parentId);
    
    if ($filter === 'upcoming' || $filter === 'past') {
        $stmt->bindParam(':today', $today);
    }
    
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Exemple d'utilisation avec un parent_id fictif (en production, vous auriez une session)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $filter = $_GET['filter'] ?? 'all';
    $parentId = 1; // À remplacer par l'ID du parent connecté
    
    $events = getEventsForParent($parentId, $filter);
    
    header('Content-Type: application/json');
    echo json_encode($events);
    exit;
}
?>