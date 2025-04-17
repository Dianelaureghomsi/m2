<?php
require_once 'includes/db.php';
$enseignants = $conn->query("SELECT * FROM enseignants");
while ($e = $enseignants->fetch_assoc()) {
    echo "<p>{$e['nom_e']} ({$e['email_e']})</p>";
}
?>
