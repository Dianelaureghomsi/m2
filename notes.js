document.addEventListener('DOMContentLoaded', function() {
    const rechercherBtn = document.getElementById('rechercherNotesBtn');
    const resultatsDiv = document.getElementById('resultatsNotes');

    rechercherBtn.addEventListener('click', function() {
        const nom = document.getElementById('nomEleve').value.trim();
        const classe = document.getElementById('classeEleve').value;
        
        rechercherNotesEleve(nom, classe);
    });

    function rechercherNotesEleve(nom, classe) {
        // Afficher un indicateur de chargement
        resultatsDiv.innerHTML = '<p>Recherche en cours...</p>';
        
        // Paramètres de la requête
        const params = new URLSearchParams();
        if (nom) params.append('nom', nom);
        if (classe) params.append('classe', classe);
        
        // Requête AJAX
        fetch(`api/notes/rechercher.php?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    afficherResultats(data.eleves);
                } else {
                    resultatsDiv.innerHTML = `<p class="error">${data.message}</p>`;
                }
            })
            .catch(error => {
                resultatsDiv.innerHTML = `<p class="error">Erreur de connexion</p>`;
                console.error('Error:', error);
            });
    }

    function afficherResultats(eleves) {
        if (eleves.length === 0) {
            resultatsDiv.innerHTML = '<p>Aucun élève trouvé</p>';
            return;
        }
        
        let html = '<div class="table-responsive"><table class="notes-table">';
        html += `
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Classe</th>
                    <th>Matière</th>
                    <th>Note</th>
                    <th>Appréciation</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        eleves.forEach(eleve => {
            html += `
                <tr>
                    <td>${eleve.nom}</td>
                    <td>${eleve.prenom}</td>
                    <td>${eleve.classe}</td>
                    <td>${eleve.matiere}</td>
                    <td>${eleve.note}/20</td>
                    <td>${eleve.appreciation}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        resultatsDiv.innerHTML = html;
    }
});