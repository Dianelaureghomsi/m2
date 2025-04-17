document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments du DOM
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Statistiques des messages (à remplacer par des appels AJAX)
    let messagesStats = {
        received: 0,
        sent: 0
    };
    
    // Variables pour stocker les messages reçus et envoyés
    let receivedMessages = [];
    let sentMessages = [];
    
    // Fonction pour charger les statistiques
    function loadStats() {
        // À remplacer par un appel AJAX pour obtenir les vraies données
        fetch('php/get_stats.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('messages-count').textContent = data.received || 0;
                document.getElementById('sent-count').textContent = data.sent || 0;
                document.getElementById('grades-count').textContent = data.grades || 0;
                
                messagesStats.received = data.received || 0;
                messagesStats.sent = data.sent || 0;
            })
            .catch(error => {
                console.error('Erreur lors du chargement des statistiques:', error);
                // Valeurs par défaut en cas d'erreur
                document.getElementById('messages-count').textContent = '0';
                document.getElementById('sent-count').textContent = '0';
            });
    }
    
    // Fonction pour charger les messages reçus
    function loadReceivedMessages() {
        // À remplacer par un appel AJAX pour obtenir les vrais messages
        fetch('php/get_received_messages.php')
            .then(response => response.json())
            .then(data => {
                receivedMessages = data;
                displayReceivedMessages(data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des messages reçus:', error);
                // Afficher un message d'erreur ou des données de test
                displayReceivedMessages([
                    {
                        id: 1,
                        sender: 'Parent de Jean Dupont',
                        subject: 'Question concernant le devoir de mathématiques',
                        content: 'Bonjour, pourriez-vous préciser les attentes pour le devoir de mathématiques?',
                        date: '2025-04-10',
                        read: false
                    },
                    {
                        id: 2,
                        sender: 'Parent de Marie Martin',
                        subject: 'Absence prévue',
                        content: 'Ma fille sera absente lundi prochain pour un rendez-vous médical.',
                        date: '2025-04-09',
                        read: true
                    }
                ]);
            });
    }
    
    // Fonction pour charger les messages envoyés
    function loadSentMessages() {
        // À remplacer par un appel AJAX pour obtenir les vrais messages
        fetch('php/get_sent_messages.php')
            .then(response => response.json())
            .then(data => {
                sentMessages = data;
                displaySentMessages(data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des messages envoyés:', error);
                // Afficher un message d'erreur ou des données de test
                displaySentMessages([
                    {
                        id: 1,
                        recipient: 'Parents de la classe 3ème A',
                        subject: 'Réunion parents-professeurs',
                        content: 'Une réunion parents-professeurs se tiendra le 20 avril à 18h.',
                        date: '2025-04-08'
                    },
                    {
                        id: 2,
                        recipient: 'Parent de Lucas Petit',
                        subject: 'Progrès en français',
                        content: 'Je tenais à vous informer des progrès significatifs de Lucas en français.',
                        date: '2025-04-05'
                    }
                ]);
            });
    }
    
    // Fonction pour afficher les messages reçus
    function displayReceivedMessages(messages) {
        const messagesContainer = document.getElementById('received-messages');
        messagesContainer.innerHTML = '';
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = '<div class="no-messages">Aucun message reçu</div>';
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message-item ${message.read ? 'read' : 'unread'}`;
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">${message.sender}</span>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-subject">${message.read ? '' : '<span class="unread-indicator">•</span>'} ${message.subject}</div>
                <div class="message-preview">${message.content.substring(0, 80)}${message.content.length > 80 ? '...' : ''}</div>
                <div class="message-actions">
                    <button class="message-action view-btn" data-id="${message.id}"><i class="fas fa-eye"></i> Voir</button>
                    <button class="message-action reply-btn" data-id="${message.id}"><i class="fas fa-reply"></i> Répondre</button>
                    <button class="message-action delete-btn" data-id="${message.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Ajouter un gestionnaire d'événements pour afficher le message complet
            const viewBtn = messageElement.querySelector('.view-btn');
            viewBtn.addEventListener('click', function() {
                viewMessage(message.id, 'received');
            });
            
            // Ajouter un gestionnaire d'événements pour répondre au message
            const replyBtn = messageElement.querySelector('.reply-btn');
            replyBtn.addEventListener('click', function() {
                replyToMessage(message);
            });
            
            // Ajouter un gestionnaire d'événements pour supprimer le message
            const deleteBtn = messageElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteMessage(message.id, 'received');
            });
            
            messagesContainer.appendChild(messageElement);
        });
    }
    
    // Fonction pour afficher les messages envoyés
    function displaySentMessages(messages) {
        const messagesContainer = document.getElementById('sent-messages');
        messagesContainer.innerHTML = '';
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = '<div class="no-messages">Aucun message envoyé</div>';
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-recipient">À: ${message.recipient}</span>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-subject">${message.subject}</div>
                <div class="message-preview">${message.content.substring(0, 80)}${message.content.length > 80 ? '...' : ''}</div>
                <div class="message-actions">
                    <button class="message-action view-btn" data-id="${message.id}"><i class="fas fa-eye"></i> Voir</button>
                    <button class="message-action forward-btn" data-id="${message.id}"><i class="fas fa-share"></i> Transférer</button>
                    <button class="message-action delete-btn" data-id="${message.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Ajouter un gestionnaire d'événements pour afficher le message complet
            const viewBtn = messageElement.querySelector('.view-btn');
            viewBtn.addEventListener('click', function() {
                viewMessage(message.id, 'sent');
            });
            
            // Ajouter un gestionnaire d'événements pour transférer le message
            const forwardBtn = messageElement.querySelector('.forward-btn');
            forwardBtn.addEventListener('click', function() {
                forwardMessage(message);
            });
            
            // Ajouter un gestionnaire d'événements pour supprimer le message
            const deleteBtn = messageElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteMessage(message.id, 'sent');
            });
            
            messagesContainer.appendChild(messageElement);
        });
    }
    
    // Fonction pour afficher un message complet
    function viewMessage(messageId, type) {
        const messages = type === 'received' ? receivedMessages : sentMessages;
        const message = messages.find(m => m.id === messageId);
        
        if (!message) return;
        
        // Marquer le message comme lu si c'est un message reçu
        if (type === 'received' && !message.read) {
            markAsRead(messageId);
        }
        
        // Créer une boîte de dialogue modale pour afficher le message complet
        const modal = document.createElement('div');
        modal.className = 'message-modal';
        modal.innerHTML = `
            <div class="message-modal-content">
                <span class="message-modal-close">&times;</span>
                <div class="message-modal-header">
                    <h3>${message.subject}</h3>
                    <p>${type === 'received' ? 'De: ' + message.sender : 'À: ' + message.recipient}</p>
                    <p>Date: ${message.date}</p>
                </div>
                <div class="message-modal-body">
                    <p>${message.content}</p>
                    ${message.attachment ? `<div class="message-attachment">
                        <strong>Pièce jointe:</strong> <a href="${message.attachment}">${message.attachment.split('/').pop()}</a>
                    </div>` : ''}
                </div>
                <div class="message-modal-actions">
                    ${type === 'received' ? `<button class="modal-action reply-btn" data-id="${message.id}">Répondre</button>` : 
                                          `<button class="modal-action forward-btn" data-id="${message.id}">Transférer</button>`}
                    <button class="modal-action close-btn">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Gestionnaire pour fermer la boîte de dialogue
        const closeBtn = modal.querySelector('.message-modal-close');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Gestionnaire pour le bouton Fermer
        const closeBtnAction = modal.querySelector('.close-btn');
        closeBtnAction.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Gestionnaire pour le bouton Répondre/Transférer
        const actionBtn = type === 'received' ? modal.querySelector('.reply-btn') : modal.querySelector('.forward-btn');
        actionBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
            if (type === 'received') {
                replyToMessage(message);
            } else {
                forwardMessage(message);
            }
        });
    }
    
    // Fonction pour marquer un message comme lu
    function markAsRead(messageId) {
        // À remplacer par un appel AJAX pour mettre à jour le statut du message dans la base de données
        fetch('php/mark_as_read.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: messageId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mettre à jour localement
                const message = receivedMessages.find(m => m.id === messageId);
                if (message) {
                    message.read = true;
                    loadReceivedMessages(); // Recharger la liste des messages
                    loadStats(); // Mettre à jour les statistiques
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors du marquage du message comme lu:', error);
            // Fallback: mettre à jour l'interface utilisateur sans attendre la confirmation du serveur
            const message = receivedMessages.find(m => m.id === messageId);
            if (message) {
                message.read = true;
                loadReceivedMessages();
            }
        });
    }
    
    // Fonction pour répondre à un message
    function replyToMessage(message) {
        // Activer l'onglet Composer
        activateTab('compose');
        
        // Préremplir le formulaire
        document.getElementById('recipient-type').value = 'parent';
        // Idéalement, vous auriez un champ pour sélectionner le parent spécifique
        // document.getElementById('recipient-parent').value = message.sender_id;
        
        document.getElementById('message-subject').value = 'RE: ' + message.subject;
        
        const contentArea = document.getElementById('message-content');
        contentArea.value = `\n\n----------\nLe ${message.date}, ${message.sender} a écrit :\n${message.content}`;
        
        // Faire défiler jusqu'au formulaire
        document.getElementById('compose').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fonction pour transférer un message
    function forwardMessage(message) {
        // Activer l'onglet Composer
        activateTab('compose');
        
        // Préremplir le formulaire
        document.getElementById('message-subject').value = 'TR: ' + message.subject;
        
        const contentArea = document.getElementById('message-content');
        contentArea.value = `\n\n----------\nMessage transféré :\nDe: ${message.recipient}\nDate: ${message.date}\nSujet: ${message.subject}\n\n${message.content}`;
        
        // Faire défiler jusqu'au formulaire
        document.getElementById('compose').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fonction pour supprimer un message
    function deleteMessage(messageId, type) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
            return;
        }
        
        // À remplacer par un appel AJAX pour supprimer le message dans la base de données
        fetch('php/delete_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: messageId, type: type })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mettre à jour localement
                if (type === 'received') {
                    receivedMessages = receivedMessages.filter(m => m.id !== messageId);
                    loadReceivedMessages();
                } else {
                    sentMessages = sentMessages.filter(m => m.id !== messageId);
                    loadSentMessages();
                }
                loadStats(); // Mettre à jour les statistiques
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du message:', error);
            // Fallback: mettre à jour l'interface utilisateur sans attendre la confirmation du serveur
            if (type === 'received') {
                receivedMessages = receivedMessages.filter(m => m.id !== messageId);
                loadReceivedMessages();
            } else {
                sentMessages = sentMessages.filter(m => m.id !== messageId);
                loadSentMessages();
            }
        });
    }
    
    // Fonction pour envoyer un nouveau message
    document.getElementById('compose-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const recipientType = document.getElementById('recipient-type').value;
        const subject = document.getElementById('message-subject').value;
        const content = document.getElementById('message-content').value;
        const attachmentInput = document.getElementById('message-attachment');
        
        // Vérifier si les champs obligatoires sont remplis
        if (!subject || !content) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Créer un objet FormData pour gérer les fichiers
        const formData = new FormData();
        formData.append('recipient_type', recipientType);
        formData.append('subject', subject);
        formData.append('content', content);
        
        // Ajouter le fichier s'il existe
        if (attachmentInput.files.length > 0) {
            formData.append('attachment', attachmentInput.files[0]);
        }
        
        // Envoyer le message au serveur
        fetch('php/send_message.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message envoyé avec succès !');
                // Réinitialiser le formulaire
                document.getElementById('compose-form').reset();
                // Mettre à jour les statistiques et la liste des messages envoyés
                loadStats();
                loadSentMessages();
                // Revenir à l'onglet des messages envoyés
                activateTab('sent');
            } else {
                alert('Erreur lors de l\'envoi du message: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du message:', error);
            alert('Une erreur s\'est produite lors de l\'envoi du message.');
        });
    });
    
    // Fonction pour activer un onglet
    function activateTab(tabId) {
        // Désactiver tous les onglets
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Activer l'onglet sélectionné
        const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');
            
            // Charger le contenu approprié
            if (tabId === 'received') {
                loadReceivedMessages();
            } else if (tabId === 'sent') {
                loadSentMessages();
            }
        }
    }
    
    // Gérer les clics sur les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
    
    // Gérer les filtres et la recherche pour les messages reçus
    document.getElementById('filter-received').addEventListener('change', function() {
        const filterValue = this.value;
        const searchValue = document.getElementById('search-received').value.toLowerCase();
        
        // Filtrer les messages reçus en fonction du filtre et de la recherche
        const filteredMessages = receivedMessages.filter(message => {
            // Filtre par statut de lecture
            const matchesFilter = filterValue === 'all' ||
                (filterValue === 'unread' && !message.read) ||
                (filterValue === 'read' && message.read);
            
            // Filtre par texte de recherche
            const matchesSearch = searchValue === '' ||
                message.sender.toLowerCase().includes(searchValue) ||
                message.subject.toLowerCase().includes(searchValue) ||
                message.content.toLowerCase().includes(searchValue);
            
            return matchesFilter && matchesSearch;
        });
        
        displayReceivedMessages(filteredMessages);
    });
    
    document.getElementById('search-received').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const filterValue = document.getElementById('filter-received').value;
        
        // Filtrer les messages reçus en fonction du filtre et de la recherche
        const filteredMessages = receivedMessages.filter(message => {
            // Filtre par statut de lecture
            const matchesFilter = filterValue === 'all' ||
                (filterValue === 'unread' && !message.read) ||
                (filterValue === 'read' && message.read);
            
            // Filtre par texte de recherche
            const matchesSearch = searchValue === '' ||
                message.sender.toLowerCase().includes(searchValue) ||
                message.subject.toLowerCase().includes(searchValue) ||
                message.content.toLowerCase().includes(searchValue);
            
            return matchesFilter && matchesSearch;
        });
        
        displayReceivedMessages(filteredMessages);
    });
    
    // Gérer les filtres et la recherche pour les messages envoyés
    document.getElementById('filter-sent').addEventListener('change', function() {
        const filterValue = this.value;
        const searchValue = document.getElementById('search-sent').value.toLowerCase();
        
        // Filtrer les messages envoyés en fonction du filtre et de la recherche
        const filteredMessages = sentMessages.filter(message => {
            // Filtrer par type de destinataire
            const matchesFilter = filterValue === 'all' ||
                (filterValue === 'class' && message.recipient.includes('classe')) ||
                (filterValue === 'parent' && message.recipient.includes('Parent'));
            
            // Filtre par texte de recherche
            const matchesSearch = searchValue === '' ||
                message.recipient.toLowerCase().includes(searchValue) ||
                message.subject.toLowerCase().includes(searchValue) ||
                message.content.toLowerCase().includes(searchValue);
            
            return matchesFilter && matchesSearch;
        });
        
        displaySentMessages(filteredMessages);
    });
    
    document.getElementById('search-sent').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const filterValue = document.getElementById('filter-sent').value;
        
        // Filtrer les messages envoyés en fonction du filtre et de la recherche
        const filteredMessages = sentMessages.filter(message => {
            // Filtrer par type de destinataire
            const matchesFilter = filterValue === 'all' ||
                (filterValue === 'class' && message.recipient.includes('classe')) ||
                (filterValue === 'parent' && message.recipient.includes('Parent'));
            
            // Filtre par texte de recherche
            const matchesSearch = searchValue === '' ||
                message.recipient.toLowerCase().includes(searchValue) ||
                message.subject.toLowerCase().includes(searchValue) ||
                message.content.toLowerCase().includes(searchValue);
            
            return matchesFilter && matchesSearch;
        });
        
        displaySentMessages(filteredMessages);
    });
    
    // Ajouter des gestionnaires d'événements pour les liens de navigation du menu
    document.getElementById('view-messages-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('messages-section').scrollIntoView({ behavior: 'smooth' });
        activateTab('received');
    });
    
    document.getElementById('send-message-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('messages-section').scrollIntoView({ behavior: 'smooth' });
        activateTab('compose');
    });
    
    // Initialiser la page
    loadStats();
    loadReceivedMessages();
    
    // Ajouter des styles CSS pour les modales et autres éléments dynamiques
    const style = document.createElement('style');
    style.textContent = `
        /* Styles pour les onglets de messagerie */
        .message-tabs {
            display: flex;
            border-bottom: 1px solid #ddd;
            margin-bottom: 20px;
        }
        
        .tab-btn {
            padding: 10px 15px;
            background: #f8f8f8;
            border: 1px solid #ddd;
            border-bottom: none;
            margin-right: 5px;
            cursor: pointer;
            border-radius: 5px 5px 0 0;
        }
        
        .tab-btn.active {
            background: #fff;
            border-bottom: 2px solid #4a90e2;
            font-weight: bold;
        }
        
        .tab-content {
            display: none;
            padding: 20px 0;
        }
        
        .tab-content.active {
            display: block;
        }
        
        /* Styles pour les filtres de messages */
        .message-filters {
            display: flex;
            margin-bottom: 15px;
            gap: 10px;
        }
        
        .message-filters select, .message-filters input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .message-filters input {
            flex-grow: 1;
        }
        
        /* Styles pour la liste des messages */
        .messages-list {
            max-height: 500px;
            overflow-y: auto;
        }
        
        .message-item {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 10px;
            background: #fff;
            transition: background-color 0.3s;
        }
        
        .message-item:hover {
            background: #f9f9f9;
        }
        
        .message-item.unread {
            background: #f0f7ff;
            border-left: 3px solid #4a90e2;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 0.9em;
            color: #666;
        }
        
        .message-subject {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .unread-indicator {
            color: #4a90e2;
            margin-right: 5px;
        }
        
        .message-preview {
            color: #666;
            margin-bottom: 10px;
        }
        
        .message-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .message-action {
            padding: 5px 10px;
            background: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
        }
        
        .message-action:hover {
            background: #e0e0e0;
        }
        
        .message-action.view-btn {
            background: #4a90e2;
            color: white;
            border-color: #4a90e2;
        }
        
        .message-action.view-btn:hover {
            background: #3a80d2;
        }
        
        .message-action.delete-btn {
            background: #ff6b6b;
            color: white;
            border-color: #ff6b6b;
        }
        
        .message-action.delete-btn:hover {
            background: #ff5b5b;
        }
        
        /* Styles pour la fenêtre modale des messages */
        .message-modal {
            display: flex;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
        }
        
        .message-modal-content {
            background-color: #fff;
            border-radius: 5px;
            width: 80%;
            max-width: 800px;
            max-height: 90%;
            overflow-y: auto;
            padding: 20px;
            position: relative;
        }
        
        .message-modal-close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 24px;
            cursor: pointer;
        }
        
        .message-modal-header {
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        
        .message-modal-header h3 {
            margin-top: 0;
        }
        
        .message-modal-body {
            margin-bottom: 20px;
        }
        
        .message-attachment {
            margin-top: 15px;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        
        .message-modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        
        .modal-action {
            padding: 8px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .modal-action.reply-btn, .modal-action.forward-btn {
            background: #4a90e2;
            color: white;
            border-color: #4a90e2;
        }
        
        .modal-action.close-btn {
            background: #f0f0f0;
        }
        
        /* Styles pour le formulaire de message */
        .message-form {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        
        .no-messages {
            text-align: center;
            padding: 30px;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
});

// Gestion de l'ajout de note
document.getElementById('class').addEventListener('change', function() {
    const classValue = this.value;
    if (classValue) {
        document.getElementById('student-search-group').style.display = 'block';
        // Ici vous devriez charger les élèves de cette classe via AJAX
    } else {
        document.getElementById('student-search-group').style.display = 'none';
        document.getElementById('grade-details').style.display = 'none';
    }
});

// Simulation de recherche d'élève
document.getElementById('student-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const resultsDiv = document.getElementById('student-results');
    resultsDiv.innerHTML = '';
    
    if (searchTerm.length > 2) {
        // Simulation de résultats (remplacer par appel AJAX en réalité)
        const fakeStudents = [
            {id: 1, name: "Jean Dupont"},
            {id: 2, name: "Marie Martin"},
            {id: 3, name: "Pierre Durand"}
        ].filter(s => s.name.toLowerCase().includes(searchTerm));
        
        fakeStudents.forEach(student => {
            const div = document.createElement('div');
            div.className = 'student-result';
            div.textContent = student.name;
            div.dataset.id = student.id;
            div.addEventListener('click', function() {
                document.getElementById('student-search').value = student.name;
                document.getElementById('selected-student').value = student.id;
                document.getElementById('grade-details').style.display = 'block';
                resultsDiv.innerHTML = '';
            });
            resultsDiv.appendChild(div);
        });
    }
});

// Gestion de la consultation des notes
document.getElementById('view-class').addEventListener('change', function() {
    const classValue = this.value;
    if (classValue) {
        // Ici vous devriez charger les notes de cette classe via AJAX
        // Simulation de données :
        const fakeGrades = [
            {student: "Jean Dupont", subject: "Mathématiques", grade: 15, date: "2023-05-15", comment: "Bon travail"},
            {student: "Marie Martin", subject: "Français", grade: 18, date: "2023-05-16", comment: "Excellent"}
        ];
        
        const tbody = document.getElementById('grades-table-body');
        tbody.innerHTML = '';
        
        fakeGrades.forEach(grade => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${grade.student}</td>
                <td>${grade.subject}</td>
                <td>${grade.grade}</td>
                <td>${grade.date}</td>
                <td>${grade.comment}</td>
                <td>
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
});