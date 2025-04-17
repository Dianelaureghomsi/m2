<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../includes/config.php';

$searchTerm = $_GET['q'] ?? '';

try {
    $stmt = $pdo->prepare("
        SELECT id, nom, prenom, matricule, classe 
        FROM eleves 
        WHERE nom LIKE :search OR prenom LIKE :search OR matricule LIKE :search
        AND parent_id = :parent_id
    ");
    
    $stmt->execute([
        ':search' => "%$searchTerm%",
        ':parent_id' => $_SESSION['parent_id'] // À adapter selon votre système d'authentification
    ]);
    
    $eleves = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'data' => $eleves
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de base de données'
    ]);
}