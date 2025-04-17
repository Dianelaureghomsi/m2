document.addEventListener('DOMContentLoaded', function() {
    const nouveauMessageBtn = document.getElementById('nouveauMessageBtn');
    const messageForm = document.getElementById('messageForm');
    const annulerBtn = document.getElementById('annulerBtn');
    const envoiForm = document.getElementById('envoiMessageForm');
    
    // Afficher le formulaire
    nouveauMessageBtn.addEventListener('click', function() {
        messageForm.style.display = 'block';
        window.scrollTo({
            top: messageForm.offsetTop - 20,
            behavior: 'smooth'
        });
    });
    
    // Masquer le formulaire
    annulerBtn.addEventListener('click', function() {
        messageForm.style.display = 'none';
        envoiForm.reset();
    });
    
    // Envoi du message
    envoiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const destinataire = document.getElementById('destinataire');
        const contenu = document.getElementById('contenuMessage');
        
        // Ajouter le message à l'historique (simulation)
        const messagesList = document.querySelector('.messages-list');
        const newMessage = document.createElement('div');
        newMessage.className = 'message-card';
        newMessage.innerHTML = `
            <div class="message-header">
                <span class="enseignant">${destinataire.selectedOptions[0].text}</span>
                <span class="date">${new Date().toLocaleDateString('fr-FR')} - ${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div class="message-content">
                <p>${contenu.value}</p>
            </div>
        `;
        
        messagesList.prepend(newMessage);
        
        // Réinitialiser et masquer le formulaire
        envoiForm.reset();
        messageForm.style.display = 'none';
        
        // Notification (simulation)
        alert('Message envoyé avec succès !');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (votre code existant) ...
    
    // Recherche d'élèves
    const searchEleveBtn = document.getElementById('searchEleveBtn');
    const searchEleveInput = document.getElementById('searchEleveInput');
    const eleveResults = document.getElementById('eleveResults');
    const bulletinsSection = document.getElementById('bulletinsSection');
    const bulletinsList = document.getElementById('bulletinsList');

    searchEleveBtn.addEventListener('click', function() {
        const searchTerm = searchEleveInput.value.trim();
        if (searchTerm) {
            rechercherEleve(searchTerm);
        }
    });

    function rechercherEleve(searchTerm) {
        // Simulation de requête AJAX vers le backend
        // En pratique, vous feriez une requête fetch vers votre API
        console.log(`Recherche de l'élève: ${searchTerm}`);
        
        // Simuler une réponse du serveur
        setTimeout(() => {
            // Ceci est un exemple - vous devrez adapter selon votre structure de données
            const eleves = [
                {
                    id: 1,
                    nom: "NOUBISSI",
                    prenom: "Jean",
                    matricule: "MAT2024001",
                    classe: "6ème 1"
                },
                {
                    id: 2,
                    nom: "ATANGANA",
                    prenom: "Sophie",
                    matricule: "MAT2024002",
                    classe: "4ème Are1"
                }
            ];
            
            afficherResultats(eleves);
        }, 500);
    }

    function afficherResultats(eleves) {
        eleveResults.innerHTML = '';
        
        if (eleves.length === 0) {
            eleveResults.innerHTML = '<p>Aucun élève trouvé.</p>';
            bulletinsSection.style.display = 'none';
            return;
        }
        
        eleves.forEach(eleve => {
            const eleveCard = document.createElement('div');
            eleveCard.className = 'eleve-card';
            eleveCard.innerHTML = `
                <div class="eleve-info">
                    <h3>${eleve.prenom} ${eleve.nom}</h3>
                    <p>Matricule: ${eleve.matricule} | Classe: ${eleve.classe}</p>
                </div>
                <div class="eleve-actions">
                    <button class="voir-bulletins-btn" data-eleve-id="${eleve.id}">
                        Voir les bulletins
                    </button>
                </div>
            `;
            eleveResults.appendChild(eleveCard);
        });
        
        // Ajouter les événements aux boutons
        document.querySelectorAll('.voir-bulletins-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eleveId = this.getAttribute('data-eleve-id');
                chargerBulletins(eleveId);
            });
        });
    }

    function chargerBulletins(eleveId) {
        // Simulation de requête AJAX pour récupérer les bulletins
        console.log(`Chargement des bulletins pour l'élève ID: ${eleveId}`);
        
        // Simuler une réponse du serveur
        setTimeout(() => {
            const bulletins = [
                {
                    id: 1,
                    periode: "Trimestre 1",
                    annee: "2023-2024",
                    date: "15/12/2023",
                    fichier: "bulletin_1_2023_2024.pdf"
                },
                {
                    id: 2,
                    periode: "Trimestre 2",
                    annee: "2023-2024",
                    date: "15/03/2024",
                    fichier: "bulletin_2_2023_2024.pdf"
                }
            ];
            
            afficherBulletins(bulletins);
        }, 500);
    }

    function afficherBulletins(bulletins) {
        bulletinsList.innerHTML = '';
        
        bulletins.forEach(bulletin => {
            const bulletinCard = document.createElement('div');
            bulletinCard.className = 'bulletin-card';
            bulletinCard.innerHTML = `
                <h3>${bulletin.periode}</h3>
                <p>Année scolaire: ${bulletin.annee}</p>
                <p>Date: ${bulletin.date}</p>
                <button class="download-btn" data-file="${bulletin.fichier}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            `;
            bulletinsList.appendChild(bulletinCard);
        });
        
        bulletinsSection.style.display = 'block';
        
        // Ajouter les événements aux boutons de téléchargement
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filename = this.getAttribute('data-file');
                telechargerBulletin(filename);
            });
        });
    }

    function telechargerBulletin(filename) {
        // En pratique, vous feriez une requête au serveur pour générer/télécharger le fichier
        console.log(`Téléchargement du fichier: ${filename}`);
        
        // Simulation de téléchargement
        const link = document.createElement('a');
        link.href = `/bulletins/${filename}`; // L'URL réelle de votre API
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});