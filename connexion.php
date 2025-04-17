<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion - E_SchoolConnect</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Connexion</h1>
    
    <form action="traitement_connexion.php" method="POST">
        <label for="role">Je suis :</label>
        <select name="role" id="role" required>
            <option value="parent">Parent</option>
            <option value="enseignant">Enseignant</option>
            <option value="admin">Administration</option>
        </select>

        <label for="email">Email :</label>
        <input type="email" name="email" required>

        <label for="password">Mot de passe :</label>
        <input type="password" name="password" required>

        <button type="submit">Connexion</button>
    </form>

    <p><a href="choix_inscription.php">S'inscrire</a></p>
</body>
</html>
