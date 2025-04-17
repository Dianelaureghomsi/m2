/*document.addEventListener('DOMContentLoaded', function() {
    // Vérification de la session
    const userType = sessionStorage.getItem('userType');
    if (userType !== 'teacher') {
        window.location.href = 'enseignants.html';
        return;
    }
    
    // Affichage du nom de l'enseignant
    const teacherEmail = sessionStorage.getItem('userEmail');
    if (teacherEmail) {
        document.querySelector('.teacher-name').textContent = teacherEmail.split('@')[0];
    }
    
    // Gestion de l'envoi de message
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const recipient = document.getElementById('recipient').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // En production, vous enverriez ces données au serveur
            console.log('Message à envoyer:', {
                recipient,
                subject,
                message
            });
            
            alert('Message envoyé avec succès !');
            messageForm.reset();
        });
    }
});
*/


document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentSection = 'grades';
    let currentGradeId = null;
    
    // Éléments du DOM
    const gradesSection = document.getElementById('grades-section');
    const messagesSection = document.getElementById('messages-section');
    
    // Menu de navigation
    const navLinks = {
        'add-grade': document.getElementById('add-grade-link'),
        'view-grades': document.getElementById('view-grades-link'),
        'view-messages': document.getElementById('view-messages-link'),
        'send-message': document.getElementById('send-message-link')
    };
    
    // Initialisation
    initStats();
    initEventListeners();
    showGradesSection();
    
    function initStats() {
        // Simuler des données (en production, ça viendrait d'une API)
        document.getElementById('grades-count').textContent = '42';
        document.getElementById('messages-count').textContent = '15';
        document.getElementById('sent-count').textContent = '28';
    }
    
    function initEventListeners() {
        // Navigation
        navLinks['add-grade'].addEventListener('click', function(e) {
            e.preventDefault();
            showGradesSection();
            showAddGradeForm();
        });
        
        navLinks['view-grades'].addEventListener('click', function(e) {
            e.preventDefault();
            showGradesSection();
            showViewGradesTable();
        });
        
        navLinks['view-messages'].addEventListener('click', function(e) {
            e.preventDefault();
            showMessagesSection();
            showReceivedMessages();
        });
        
        navLinks['send-message'].addEventListener('click', function(e) {
            e.preventDefault();
            showMessagesSection();
            showSendMessageForm();
        });
        
        // Boutons d'action
        document.getElementById('show-add-grade').addEventListener('click', showAddGradeForm);
        document.getElementById('show-view-grades').addEventListener('click', showViewGradesTable);
        document.getElementById('show-received-messages').addEventListener('click', showReceivedMessages);
        document.getElementById('show-send-message').addEventListener('click', showSendMessageForm);
        
        // Annulation de formulaires
        document.getElementById('cancel-add-grade').addEventListener('click', showViewGradesTable);
        document.getElementById('cancel-edit-grade').addEventListener('click', cancelEditGrade);
        document.getElementById('cancel-send-message').addEventListener('click', showReceivedMessages);
        
        // Gestion des notes
        document.getElementById('gradeForm').addEventListener('submit', handleAddGrade);
        document.getElementById('editGradeForm').addEventListener('submit', handleUpdateGrade);
        document.getElementById('delete-grade').addEventListener('click', handleDeleteGrade);
        
        // Filtres
        document.getElementById('filter-class').addEventListener('change', filterGrades);
        document.getElementById('filter-subject').addEventListener('change', filterGrades);
        document.getElementById('filter-message-type').addEventListener('change', filterMessages);
        document.getElementById('message-search').addEventListener('input', filterMessages);
        
        // Gestion des messages
        document.getElementById('message-type').addEventListener('change', handleMessageTypeChange);
        document.getElementById('messageForm').addEventListener('submit', handleSendMessage);
        
        // Chargement initial des données
        loadStudents();
        loadGrades();
        loadMessages();
    }
    
    // Fonctions pour gérer les sections
    function showGradesSection() {
        currentSection = 'grades';
        gradesSection.style.display = 'block';
        messagesSection.style.display = 'none';
        updateActiveNav();
        showViewGradesTable();
    }
    
    function showMessagesSection() {
        currentSection = 'messages';
        gradesSection.style.display = 'none';
        messagesSection.style.display = 'block';
        updateActiveNav();
        showReceivedMessages();
    }
    
    function updateActiveNav() {
        // Mettre à jour les classes actives dans la navigation
        const gradeItems = document.querySelectorAll('.nav-menu li:nth-child(2) a');
        const messageItems = document.querySelectorAll('.nav-menu li:nth-child(3) a');
        
        if (currentSection === 'grades') {
            gradeItems.forEach(item => item.classList.add('active'));
            messageItems.forEach(item => item.classList.remove('active'));
        } else {
            gradeItems.forEach(item => item.classList.remove('active'));
            messageItems.forEach(item => item.classList.add('active'));
        }
    }
    
    // Fonctions pour la gestion des notes
    function showAddGradeForm() {
        document.getElementById('add-grade-form').style.display = 'block';
        document.getElementById('view-grades-table').style.display = 'none';
        document.getElementById('show-add-grade').classList.add('active');
        document.getElementById('show-view-grades').classList.remove('active');
    }
    
    function showViewGradesTable() {
        document.getElementById('add-grade-form').style.display = 'none';
        document.getElementById('view-grades-table').style.display = 'block';
        document.getElementById('edit-grade-form').style.display = 'none';
        document.getElementById('show-add-grade').classList.remove('active');
        document.getElementById('show-view-grades').classList.add('active');
    }
    
    function cancelEditGrade() {
        document.getElementById('edit-grade-form').style.display = 'none';
        document.getElementById('view-grades-table').style.display = 'block';
    }
    
    function loadStudents() {
        // Simuler un chargement d'élèves depuis une API
        const students = [
            { id: 1, name: 'Jean Dupont', class: '6eme' },
            { id: 2, name: 'Marie Martin', class: '5eme' },
            { id: 3, name: 'Pierre Durand', class: '4eme' },
            { id: 4, name: 'Sophie Lambert', class: '3eme' },
            { id: 5, name: 'Thomas Moreau', class: '2nde' }
        ];
        
        const select = document.getElementById('student');
        select.innerHTML = '<option value="">-- Sélectionnez un élève --</option>';
        
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.name} (${student.class})`;
            select.appendChild(option);
        });
    }
    
    function loadGrades() {
        // Simuler un chargement de notes depuis une API
        const grades = [
            { id: 1, student: 'Jean Dupont', class: '6eme', subject: 'Mathématiques', grade: 15, date: '12/05/2023', comment: 'Bon travail' },
            { id: 2, student: 'Marie Martin', class: '5eme', subject: 'Français', grade: 18, date: '10/05/2023', comment: 'Excellent' },
            { id: 3, student: 'Pierre Durand', class: '4eme', subject: 'Histoire', grade: 12, date: '15/05/2023', comment: 'Peut mieux faire' },
            { id: 4, student: 'Sophie Lambert', class: '3eme', subject: 'Sciences', grade: 14.5, date: '08/05/2023', comment: 'Bon effort' },
            { id: 5, student: 'Thomas Moreau', class: '2nde', subject: 'Anglais', grade: 16, date: '18/05/2023', comment: 'Très bien' }
        ];
        
        const tbody = document.getElementById('grades-table-body');
        tbody.innerHTML = '';
        
        // Remplir les options de filtre de matière
        const subjects = [...new Set(grades.map(grade => grade.subject))];
        const subjectFilter = document.getElementById('filter-subject');
        subjectFilter.innerHTML = '<option value="">Toutes les matières</option>';
        
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);
        });
        
        // Remplir le tableau
        grades.forEach(grade => {
            const tr = document.createElement('tr');
            tr.dataset.id = grade.id;
            tr.dataset.class = grade.class;
            tr.dataset.subject = grade.subject;
            
            tr.innerHTML = `
                <td>${grade.student}</td>
                <td>${grade.class}</td>
                <td>${grade.subject}</td>
                <td>${grade.grade}/20</td>
                <td>${grade.date}</td>
                <td class="action-cell">
                    <button class="action-btn edit-grade" data-id="${grade.id}">Modifier</button>
                    <button class="action-btn delete-grade" data-id="${grade.id}">Supprimer</button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Ajouter les écouteurs d'événements pour les boutons d'action
        document.querySelectorAll('.edit-grade').forEach(btn => {
            btn.addEventListener('click', function() {
                editGrade(parseInt(this.dataset.id));
            });
        });
        
        document.querySelectorAll('.delete-grade').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
                    deleteGrade(parseInt(this.dataset.id));
                }
            });
        });
    }
    
    function filterGrades() {
        const classFilter = document.getElementById('filter-class').value;
        const subjectFilter = document.getElementById('filter-subject').value;
        
        document.querySelectorAll('#grades-table-body tr').forEach(tr => {
            const showClass = !classFilter || tr.dataset.class === classFilter;
            const showSubject = !subjectFilter || tr.dataset.subject === subjectFilter;
            
            tr.style.display = showClass && showSubject ? '' : 'none';
        });
    }
    
    function editGrade(gradeId) {
        // Simuler la récupération d'une note depuis une API
        const grade = {
            id: gradeId,
            student: 'Jean Dupont',
            subject: 'Mathématiques',
            grade: 15,
            comment: 'Bon travail'
        };
        
        currentGradeId = gradeId;
        
        document.getElementById('edit-grade-id').value = grade.id;
        document.getElementById('edit-student').value = grade.student;
        document.getElementById('edit-subject').value = grade.subject;
        document.getElementById('edit-grade').value = grade.grade;
        document.getElementById('edit-comment').value = grade.comment;
        
        document.getElementById('view-grades-table').style.display = 'none';
        document.getElementById('edit-grade-form').style.display = 'block';
    }
    
    function handleAddGrade(e) {
        e.preventDefault();
        
        // Simuler l'envoi à une API
        alert('Note ajoutée avec succès !');
        loadGrades();
        showViewGradesTable();
        document.getElementById('gradeForm').reset();
        
        // Mettre à jour les statistiques
        document.getElementById('grades-count').textContent = 
            parseInt(document.getElementById('grades-count').textContent) + 1;
    }
    
    function handleUpdateGrade(e) {
        e.preventDefault();
        
        // Simuler la mise à jour via une API
        alert('Note mise à jour avec succès !');
        loadGrades();
        showViewGradesTable();
    }
    
    function handleDeleteGrade() {
        if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
            // Simuler la suppression via une API
            alert('Note supprimée avec succès !');
            loadGrades();
            showViewGradesTable();
            
            // Mettre à jour les statistiques
            document.getElementById('grades-count').textContent = 
                parseInt(document.getElementById('grades-count').textContent) - 1;
        }
    }
    
    function deleteGrade(gradeId) {
        // Simuler la suppression via une API
        alert(`Note #${gradeId} supprimée avec succès !`);
        loadGrades();
        
        // Mettre à jour les statistiques
        document.getElementById('grades-count').textContent = 
            parseInt(document.getElementById('grades-count').textContent) - 1;
    }
    
    // Fonctions pour la gestion des messages
    function showReceivedMessages() {
        document.getElementById('received-messages').style.display = 'block';
        document.getElementById('send-message-form').style.display = 'none';
        document.getElementById('show-received-messages').classList.add('active');
        document.getElementById('show-send-message').classList.remove('active');
    }
    
    function showSendMessageForm() {
        document.getElementById('received-messages').style.display = 'none';
        document.getElementById('send-message-form').style.display = 'block';
        document.getElementById('show-received-messages').classList.remove('active');
        document.getElementById('show-send-message').classList.add('active');
        
        // Charger les parents si nécessaire
        if (document.getElementById('parent').options.length <= 1) {
            loadParents();
        }
    }
    
    function handleMessageTypeChange() {
        const type = this.value;
        document.getElementById('parent-select-group').style.display = type === 'parent' ? 'block' : 'none';
        document.getElementById('class-select-group').style.display = type === 'class' ? 'block' : 'none';
    }
    
    function loadParents() {
        // Simuler un chargement de parents depuis une API
       // const parents

    }
}
