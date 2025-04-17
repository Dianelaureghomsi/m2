<?php
require_once '../includes/check_auth.php';
if ($_SESSION['role'] != 'admin') {
    header("Location: ../index.php");
    exit();
}

// Filtres
$date_debut = $_GET['date_debut'] ?? date('Y-m-01');
$date_fin = $_GET['date_fin'] ?? date('Y-m-d');
$operateur = $_GET['operateur'] ?? '';

$query = "SELECT * FROM sms_logs 
          WHERE date_sent BETWEEN ? AND ? 
          " . ($operateur ? " AND operator = ?" : "") . "
          ORDER BY date_sent DESC";
$stmt = $conn->prepare($query);
if ($operateur) {
    $stmt->bind_param("sss", $date_debut, $date_fin, $operateur);
} else {
    $stmt->bind_param("ss", $date_debut, $date_fin);
}
$stmt->execute();
$logs = $stmt->get_result();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Journal des SMS</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <header>
        <h1>Journal des Notifications SMS</h1>
        <nav>...</nav>
    </header>

    <main>
        <form method="get" class="filters">
            <label>Date début: <input type="date" name="date_debut" value="<?= $date_debut ?>"></label>
            <label>Date fin: <input type="date" name="date_fin" value="<?= $date_fin ?>"></label>
            <label>Opérateur:
                <select name="operateur">
                    <option value="">Tous</option>
                    <option value="MTN" <?= $operateur=='MTN'?'selected':'' ?>>MTN</option>
                    <option value="Orange" <?= $operateur=='Orange'?'selected':'' ?>>Orange</option>
                </select>
            </label>
            <button type="submit">Filtrer</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Numéro</th>
                    <th>Opérateur</th>
                    <th>Message</th>
                    <th>Statut</th>
                    <th>Coût</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($log = $logs->fetch_assoc()): ?>
                <tr>
                    <td><?= date('d/m/Y H:i', strtotime($log['date_sent'])) ?></td>
                    <td><?= htmlspecialchars($log['phone_number']) ?></td>
                    <td><?= htmlspecialchars($log['operator']) ?></td>
                    <td><?= htmlspecialchars(substr($log['message'], 0, 50)) ?>...</td>
                    <td><?= htmlspecialchars($log['status']) ?></td>
                    <td><?= $log['cost'] ?> FCFA</td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </main>
</body>
</html>