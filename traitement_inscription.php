<?php
session_start();
require_once 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    if ($role === 'parent') {
        $stmt = $conn->prepare("INSERT INTO parents (nom_p, email_p, tel_p, mot_de_passe) VALUES (?, ?, ?, ?)");
    } elseif ($role === 'enseignant') {
        $stmt = $conn->prepare("INSERT INTO enseignants (nom_e, email_e, tel_e, mot_de_passe) VALUES (?, ?, ?, ?)");
    } else {
        die("Rôle invalide");
    }

    $stmt->bind_param("ssss", $nom, $email, $telephone, $password);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $conn->insert_id;
        $_SESSION['role'] = $role;
        $_SESSION['nom'] = $nom;
        header("Location: {$role}s/accueil_{$role}.php");
        exit();
    } else {
        echo "Erreur : " . $stmt->error;
    }
}
?>
