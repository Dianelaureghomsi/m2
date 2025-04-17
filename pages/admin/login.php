<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];
    
    // Vérification des identifiants
    $table = ($role == 'parent') ? 'parents' : (($role == 'teacher') ? 'enseignants' : 'administration');
    $query = "SELECT * FROM $table WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $role;
            $_SESSION['name'] = $user['nom'];
            
            // Redirection selon le rôle
            header("Location: $role/dashboard.php");
            exit();
        }
    }
    
    $error = "Identifiants incorrects";
}
?>