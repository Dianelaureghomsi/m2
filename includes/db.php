<?php
$host = 'localhost';
$dbname = 'suivi_scolaire';
$user = 'root';
$password = ''; // mot de passe vide si tu es sur XAMPP par défaut

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Erreur de connexion à la base : " . $conn->connect_error);
}
?>
