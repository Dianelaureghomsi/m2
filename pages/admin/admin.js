/*document.addEventListener('DOMContentLoaded', function() {
    // Vérification de la session
    const userType = sessionStorage.getItem('userType');
    if (userType !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    // Affichage du nom de l'admin
    const adminEmail = sessionStorage.getItem('userEmail');
    if (adminEmail) {
        document.querySelector('.admin-name').textContent = adminEmail.split('@')[0];
    }

    // Génération des statistiques
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        // Générer 100 éléments de statistique (comme dans l'image)
        for (let i = 1; i <= 100; i++) {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.textContent = `${i}.0`;
            statsGrid.appendChild(statItem);
        }
    }

    // Gestion des boutons d'action
    document.getElementById('manageUsers').addEventListener('click', function() {
        // Redirection vers la gestion des utilisateurs
        alert('Gestion des utilisateurs - À implémenter');
    });

    document.getElementById('manageClasses').addEventListener('click', function() {
        // Redirection vers la gestion des classes
        alert('Gestion des classes - À implémenter');
    });

    document.getElementById('sendGlobalNotif').addEventListener('click', function() {
        // Envoi de notification globale
        alert('Envoi de notification globale - À implémenter');
    });

    document.getElementById('generateReports').addEventListener('click', function() {
        // Génération de rapports
        alert('Génération de rapports - À implémenter');
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    // Vérification de session
    const userType = sessionStorage.getItem('userType');
    if (userType !== 'admin') {
        window.location.href = 'connexion_admin.html';
        return;
    }

    // Affichage du nom d'admin
    const username = sessionStorage.getItem('username');
    if (username) {
        document.querySelector('.admin-name').textContent = username;
    }

    // Génération des statistiques
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        for (let i = 1; i <= 100; i++) {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.textContent = `${i}.0`;
            statsGrid.appendChild(statItem);
        }
    }

    // Gestion des boutons d'action
    document.getElementById('manageUsers').addEventListener('click', function() {
        // À implémenter: Redirection vers la gestion des utilisateurs
        alert('Gestion des utilisateurs - À implémenter');
    });

    document.getElementById('manageClasses').addEventListener('click', function() {
        // À implémenter: Redirection vers la gestion des classes
        alert('Gestion des classes - À implémenter');
    });

    document.getElementById('sendGlobalNotif').addEventListener('click', function() {
        // À implémenter: Envoi de notification globale
        alert('Envoi de notification globale - À implémenter');
    });

    document.getElementById('generateReports').addEventListener('click', function() {
        // À implémenter: Génération de rapports
        alert('Génération de rapports - À implémenter');
    });
});