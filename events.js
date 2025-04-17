document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const eventsContainer = document.getElementById('events-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Données des événements (en production, ces données viendraient d'une API)
    const events = [
        {
            id: 1,
            title: "Réunion parents-professeurs",
            date: "2023-11-15",
            description: "Réunion trimestrielle pour discuter des progrès des élèves.",
            teacher: "M. Dupont",
            type: "meeting"
        },
        {
            id: 2,
            title: "Examen de mathématiques",
            date: "2023-11-20",
            description: "Examen sur les chapitres 3 et 4 du manuel.",
            teacher: "Mme. Martin",
            type: "exam"
        },
        {
            id: 3,
            title: "Sortie scolaire",
            date: "2023-12-05",
            description: "Visite du musée des sciences. Prévoir un pique-nique.",
            teacher: "M. Leroy",
            type: "activity"
        },
        {
            id: 4,
            title: "Conseil de classe",
            date: "2023-09-10",
            description: "Conseil de classe pour le premier trimestre.",
            teacher: "M. Dupont",
            type: "meeting"
        }
    ];
    
    // Fonction pour afficher les événements
    function displayEvents(filter = 'all') {
        eventsContainer.innerHTML = '';
        
        let filteredEvents = events;
        
        // Filtrage des événements
        if (filter === 'upcoming') {
            const today = new Date().toISOString().split('T')[0];
            filteredEvents = events.filter(event => event.date >= today);
        } else if (filter === 'past') {
            const today = new Date().toISOString().split('T')[0];
            filteredEvents = events.filter(event => event.date < today);
        }
        
        // Affichage des événements
        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events">Aucun événement trouvé</div>';
            return;
        }
        
        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const typeClass = event.type === 'meeting' ? 'meeting' : 
                             event.type === 'exam' ? 'exam' : 'activity';
            
            eventCard.innerHTML = `
                <div class="event-type ${typeClass}">${getTypeLabel(event.type)}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-date">
                    <i class="far fa-calendar-alt"></i>
                    ${formatDate(event.date)}
                </div>
                <p class="event-description">${event.description}</p>
                <p class="event-teacher">Envoyé par: ${event.teacher}</p>
            `;
            
            eventsContainer.appendChild(eventCard);
        });
    }
    
    // Fonction pour formater la date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    // Fonction pour obtenir le libellé du type
    function getTypeLabel(type) {
        const labels = {
            'meeting': 'Réunion',
            'exam': 'Examen',
            'activity': 'Activité'
        };
        return labels[type] || type;
    }
    
    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displayEvents(this.dataset.filter);
        });
    });
    
    // Affichage initial
    displayEvents();
});