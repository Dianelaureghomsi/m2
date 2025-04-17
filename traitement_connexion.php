<?php
session_start();
require_once 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    switch ($role) {
        case 'parent':
            $stmt = $conn->prepare("SELECT * FROM parents WHERE email_p = ?");
            break;
        case 'enseignant':
            $stmt = $conn->prepare("SELECT * FROM enseignants WHERE email_e = ?");
            break;
        case 'admin':
            $stmt = $conn->prepare("SELECT * FROM admins WHERE email_a = ?");
            break;
        default:
            die("Rôle invalide.");
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['mot_de_passe'])) {
        $_SESSION['user_id'] = $user['id_parent'] ?? $user['id_enseignant'] ?? $user['id_admin'];
        $_SESSION['role'] = $role;
        $_SESSION['nom'] = $user['nom_p'] ?? $user['nom_e'] ?? $user['nom_a'];

        header("Location: {$role}s/indexe_{$role}.php");
        exit();
    } else {
        echo "Identifiants invalides.";
    }
}
?>
