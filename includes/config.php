<?php
// Configuration SMS
define('SMS_PROVIDER', 'africastalking'); // Utiliser Africa's Talking comme passerelle
define('SMS_API_KEY', 'votre_api_key');
define('SMS_USERNAME', 'votre_username');
define('SMS_SENDER_ID', 'ECOLE'); // ID d'envoyeur approuvé
define('SMS_MTN_PREFIX', '2376'); // Préfixe MTN Cameroun
define('SMS_ORANGE_PREFIX', '2379'); // Préfixe Orange Cameroun

// Configuration Email
define('EMAIL_HOST', 'smtp.votreecole.cm');
define('EMAIL_PORT', 587);
define('EMAIL_USER', 'notifications@votreecole.cm');
define('EMAIL_PASS', 'votre_mot_de_passe');
define('EMAIL_FROM', 'no-reply@votreecole.cm');
define('EMAIL_FROM_NAME', 'Plateforme Scolaire');

// Autres configurations...
?>
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'eschoolconnect');
define('DB_USER', 'votre_utilisateur');
define('DB_PASS', 'votre_mot_de_passe');

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERREUR: Impossible de se connecter. " . $e->getMessage());
}