<?php include 'includes/header.php'; ?>

<section class="grades-section">
    <h2>Ajouter une note</h2>
    
    <form action="traitement-note.php" method="post" class="note-form">
        <div class="form-row">
            <div class="form-group">
                <label for="eleve">Élève :</label>
                <select id="eleve" name="eleve" required>
                    <option value="">Sélectionnez un élève</option>
                    <option value="1">Jean Dupont</option>
                    <option value="2">Marie Martin</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="matiere">Matière :</label>
                <select id="matiere" name="matiere" required>
                    <option value="">Sélectionnez une matière</option>
                    <option value="maths">Mathématiques</option>
                    <option value="francais">Français</option>
                </select>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="note">Note :</label>
                <input type="number" id="note" name="note" min="0" max="20" step="0.5" required>
            </div>
            
            <div class="form-group">
                <label for="date">Date :</label>
                <input type="date" id="date" name="date" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="commentaire">Commentaire :</label>
            <textarea id="commentaire" name="commentaire" rows="3"></textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn send-btn">Enregistrer la note</button>
        </div>
    </form>
</section>


/*modifier les <notes></notes>

<?php include 'includes/header.php'; ?>

<section class="grades-section">
    <h2>Modifier une note</h2>
    
    <form action="traitement-note.php" method="post" class="note-form">
        <input type="hidden" name="id_note" value="123">
        
        <div class="form-row">
            <div class="form-group">
                <label>Élève :</label>
                <p>Jean Dupont</p>
            </div>
            
            <div class="form-group">
                <label>Matière :</label>
                <p>Mathématiques</p>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="note">Note :</label>
                <input type="number" id="note" name="note" min="0" max="20" step="0.5" value="15" required>
            </div>
            
            <div class="form-group">
                <label for="date">Date :</label>
                <input type="date" id="date" name="date" value="2023-05-12" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="commentaire">Commentaire :</label>
            <textarea id="commentaire" name="commentaire" rows="3">Bon travail</textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn send-btn">Enregistrer les modifications</button>
            <a href="consulter-notes.php" class="btn">Annuler</a>
        </div>
    </form>
</section>

<?php include 'includes/footer.php'; ?>


/*consulter les <notes></notes>

<?php include 'includes/header.php'; ?>

<section class="grades-section">
    <h2>Consulter les notes</h2>
    <div class="class-selector">
        <select id="class-select">
            <option value="">Sélectionnez une classe</option>
            <option value="6eme">6ème</option>
            <option value="5eme">5ème</option>
            <option value="4eme">4ème</option>
        </select>
    </div>
    
    <table class="grades-table">
        <thead>
            <tr>
                <th>Élève</th>
                <th>Matière</th>
                <th>Note</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Jean Dupont</td>
                <td>Mathématiques</td>
                <td>15/20</td>
                <td>12/05/2023</td>
                <td>
                    <a href="modifier-note.php?id=1" class="btn edit-btn">Modifier</a>
                    <a href="supprimer-note.php?id=1" class="btn delete-btn">Supprimer</a>
                </td>
            </tr>
            <tr>
                <td>Marie Martin</td>
                <td>Français</td>
                <td>18/20</td>
                <td>10/05/2023</td>
                <td>
                    <a href="modifier-note.php?id=2" class="btn edit-btn">Modifier</a>
                    <a href="supprimer-note.php?id=2" class="btn delete-btn">Supprimer</a>
                </td>
            </tr>
        </tbody>
    </table>
</section>
/* traitement de <notes></notes>


<?php
include 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $eleve_id = $_POST['eleve'];
    $matiere = $_POST['matiere'];
    $note = $_POST['note'];
    $date = $_POST['date'];
    $commentaire = $_POST['commentaire'];
    
    try {
        // Insertion en base de données
        $stmt = $pdo->prepare("INSERT INTO notes (eleve_id, matiere, note, date_note, commentaire) 
                              VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$eleve_id, $matiere, $note, $date, $commentaire]);
        
        // Redirection avec message de succès
        header('Location: consulter-notes.php?success=1');
        exit();
    } catch (PDOException $e) {
        die("Erreur lors de l'ajout de la note : " . $e->getMessage());
    }
} else {
    header('Location: ajouter-note.php');
    exit();
}
?>
<?php include 'includes/footer.php'; ?>

<?php include 'includes/footer.php'; ?>

