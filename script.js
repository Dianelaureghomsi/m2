// Données des fonctionnalités avec liens
const featuresData = [
    {
        icon: "fas fa-calendar-alt",
        title: "Planning des cours",
        description: "Consultez l'emploi du temps de votre enfant et soyez informé des changements éventuels.",
        link: "planning.html",
        linkText: "Voir le planning →"
    },
    {
        icon: "fas fa-chalkboard-teacher",
        title: "Nos enseignants",
        description: "Découvrez les enseignants de votre enfant et leurs coordonnées pour une communication facile.",
        link: "enseignants.html",
        linkText: "Voir les enseignants →"
    },
    {
        icon: "fas fa-envelope",
        title: "Messagerie",
        description: "Échangez directement avec les enseignants et l'administration de l'établissement.",
        link: "messagerie.html",
        linkText: "Accéder à la messagerie →"
    },
    {
        icon: "fas fa-calendar-check",
        title: "Événements",
        description: "Ne manquez aucun événement scolaire important grâce à notre calendrier interactif.",
        link: "evenements.html",
        linkText: "Voir les événements →"
    },
    {
        icon: "fas fa-clipboard-list",
        title: "Notes de l'élève",
        description: "Accédez aux résultats scolaires de votre enfant avec des analyses détaillées par matière.",
        link: "notes.html",
        linkText: "Consulter les notes →"
    }
];

// Génération des cartes fonctionnalités avec liens
function generateFeatureCards() {
    const container = document.querySelector('.features-container');
    
    featuresData.forEach(feature => {
        const cardLink = document.createElement('a');
        cardLink.href = feature.link;
        cardLink.className = 'feature-card';
        cardLink.innerHTML = `
            <div class="feature-icon">
                <i class="${feature.icon}"></i>
            </div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            <span class="feature-link">${feature.linkText}</span>
        `;
        container.appendChild(cardLink);
    });
}

// Animation pour le défilement fluide
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Animation pour les cartes fonctionnalités
function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Mise à jour de l'année dans le footer
function updateCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    generateFeatureCards();
    setupSmoothScrolling();
    animateFeatureCards();
    updateCurrentYear();
});

// Dans la fonction de soumission du formulaire de connexion parent
// Dans login-parent.html
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulation de connexion réussie
    sessionStorage.setItem('parentLoggedIn', 'true');
    sessionStorage.setItem('parentName', 'Prénom Parent'); // Remplacer par le nom réel
    
    // Redirection vers le tableau de bord
    window.location.href = 'parent.html';
});

// Vérification de connexion au chargement
/*document.addEventListener('DOMContentLoaded', function() {
    if(window.location.pathname.includes('parent.html') {
        if(sessionStorage.getItem('parentLoggedIn') !== 'true') {
            window.location.href = 'connexion_parent.html';
        } else {
            // Afficher le nom du parent
            document.querySelector('.parent-name').textContent = 
                sessionStorage.getItem('parentName') || 'Parent';
        }
    }
});
*/
// Dans login-parent.html
/*
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulation de connexion réussie
    sessionStorage.setItem('parentLoggedIn', 'true');
    sessionStorage.setItem('parentName', 'Prénom Parent'); // Remplacer par le nom réel
    
    // Redirection vers le tableau de bord
    window.location.href = 'dashboard-parent.html';
});

// Vérification de connexion au chargement
fetch('/api/eleves/rechercher.php?q=' + encodeURIComponent(searchTerm))
*/


document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu déroulant
    const dropdowns = document.querySelectorAll('.nav-menu li');
    dropdowns.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.querySelector('.dropdown-menu')) {
                e.stopPropagation();
            }
        });
    });
    
    // Fermer les menus déroulants quand on clique ailleurs
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
    
    // Gestion de l'envoi de messages
    const sendButtons = document.querySelectorAll('.send-btn');
    sendButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                if (this.classList.contains('sms-btn')) {
                    alert('Message envoyé par SMS!');
                } else if (this.classList.contains('email-btn')) {
                    alert('Message envoyé par email!');
                } else {
                    alert('Message envoyé!');
                }
                form.reset();
            }
        });
    });
    
    // Confirmation avant suppression
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
                e.preventDefault();
            }
        });
    });
});
