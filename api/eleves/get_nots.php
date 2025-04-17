<?php
require_once '../includes/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $eleve_id = $_GET['eleve_id'];

    $stmt = $conn->prepare("SELECT matiere, note FROM notes WHERE eleve_id = ?");
    $stmt->bind_param("i", $eleve_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }

    echo json_encode($notes);
}
?>
