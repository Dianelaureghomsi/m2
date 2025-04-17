<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../includes/config.php';

// Récupérer les paramètres
$nom = $_GET['nom'] ?? '';
$classe = $_GET['classe'] ?? '';

try {
    // Construction de la requête SQL
    $sql = "SELECT e.nom, e.prenom, e.classe, n.matiere, n.note, n.appreciation 
            FROM eleves e
            JOIN notes n ON e.id = n.eleve_id
            WHERE 1=1";
    
    $params = [];
    
    // Filtre par nom
    if (!empty($nom)) {
        $sql .= " AND (e.nom LIKE :nom OR e.prenom LIKE :nom)";
        $params[':nom'] = "%$nom%";
    }
    
    // Filtre par classe
    if (!empty($classe)) {
        $sql .= " AND e.classe = :classe";
        $params[':classe'] = $classe;
    }
    
    // Ajouter le filtre parent (sécurité)
    $sql .= " AND e.parent_id = :parent_id";
    $params[':parent_id'] = $_SESSION['parent_id']; // Adaptez selon votre système d'authentification
    
    // Exécution
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $eleves = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'eleves' => $eleves
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de base de données'
    ]);
}