/*document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userType = document.getElementById('userType').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // En production, vous feriez une requête AJAX vers votre backend
            // Voici une simulation basique
            if (email && password && userType) {
                // Stockage temporaire du type d'utilisateur
                sessionStorage.setItem('userType', userType);
                sessionStorage.setItem('userEmail', email);
                
                // Redirection en fonction du type d'utilisateur
                switch(userType) {
                    case 'teacher':
                        window.location.href = 'teacher.html';
                        break;
                    case 'parent':
                        window.location.href = 'parent.html';
                        break;
                    case 'admin':
                        window.location.href = 'admin.html';
                        break;
                    default:
                        alert('Type d\'utilisateur invalide');
                }
            } else {
                alert('Veuillez remplir tous les champs');
            }
        });
    }
    
    // Vérification de la session au chargement des pages
    const protectedPages = ['teacher.html', 'parent.html', 'admin.html'];
    if (protectedPages.some(page => window.location.pathname.endsWith(page))) {
        const userType = sessionStorage.getItem('userType');
        if (!userType) {
            window.location.href = 'login.html';
        }
    }
});
// Dans auth.js, ajouter cette vérification dans le switch/case
case 'admin':
    window.location.href = 'admin.html';
    break;

    */
/*
    // Gestion globale des connexions
document.addEventListener('DOMContentLoaded', function() {
    // Détection du formulaire de connexion
    const loginForms = document.querySelectorAll('form[id^="loginForm"], form[class*="-login-form"]');
    
    loginForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs selon le formulaire
            const userType = this.id.includes('admin') ? 'admin' : 
                          this.id.includes('teacher') ? 'teacher' : 'parent';
            
            const email = this.querySelector('[type="email"], [name="email"]').value;
            const password = this.querySelector('[type="password"]').value;

            // Validation basique
            if (!email || !password) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            // Simulation de connexion
            sessionStorage.setItem('userType', userType);
            sessionStorage.setItem('userEmail', email);
            
            // Redirection
            window.location.href = `${userType}.html`;
        });
    });

    // Protection des pages
    const protectedPages = {
        'admin.html': 'admin',
        'teacher.html': 'teacher',
        'parent.html': 'parent'
    };

    if (protectedPages[window.location.pathname.split('/').pop()]) {
        const requiredRole = protectedPages[window.location.pathname.split('/').pop()];
        const userRole = sessionStorage.getItem('userType');
        
        if (userRole !== requiredRole) {
            window.location.href = 'connexion.html';
        }
    }
});
*/


document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la connexion admin
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Validation basique
            if (username && password) {
                // Stockage de la session
                sessionStorage.setItem('userType', 'admin');
                sessionStorage.setItem('username', username);
                
                // Redirection vers l'interface admin
                window.location.href = 'admin.html';
            } else {
                alert('Veuillez remplir tous les champs');
            }
        });
    }

    // Vérification de session pour admin.html
    if (window.location.pathname.endsWith('admin.html')) {
        const userType = sessionStorage.getItem('userType');
        if (userType !== 'admin') {
            window.location.href = 'connexion_admin.html';
        } else {
            // Afficher le nom d'utilisateur si connecté
            const username = sessionStorage.getItem('username');
            if (username && document.querySelector('.admin-name')) {
                document.querySelector('.admin-name').textContent = username;
            }
        }
    }
});
// Gestion spécifique de la connexion parent
document.addEventListener('DOMContentLoaded', function() {
    const parentLoginForm = document.getElementById('parentLoginForm');
    
    if (parentLoginForm) {
        parentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('parent-email').value;
            const password = document.getElementById('parent-password').value;
            const childCode = document.getElementById('child-code').value;
            
            // Validation basique
            if (email && password && childCode) {
                // Stockage de la session (simulation)
                sessionStorage.setItem('userType', 'parent');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('childCode', childCode);
                
                // Redirection vers parents.html
                window.location.href = 'parents.html';
            } else {
                alert('Veuillez remplir tous les champs');
            }
        });
    }
    // Vérification de session pour parents.html
if (window.location.pathname.endsWith('parents.html')) {
    const userType = sessionStorage.getItem('userType');
    if (userType !== 'parent') {
        window.location.href = 'connexion_parent.html';
    } else {
        // Afficher les infos du parent si connecté
        const parentEmail = sessionStorage.getItem('userEmail');
        if (parentEmail && document.querySelector('.parent-name')) {
            document.querySelector('.parent-name').textContent = parentEmail.split('@')[0];
        }
    }
}
});