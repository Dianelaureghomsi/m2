<?php
require_once 'includes/db.php';
$parents = $conn->query("SELECT * FROM parents");
while ($p = $parents->fetch_assoc()) {
    echo "<p>{$p['nom_p']} ({$p['email_p']})</p>";
}
?>
