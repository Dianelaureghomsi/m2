// Marquer une notification comme lue
document.querySelectorAll('.notification a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const response = await fetch(link.href);
        if (response.ok) {
            const notification = link.closest('.notification');
            notification.classList.remove('unread');
            notification.classList.add('read');
            link.remove();
        }
    });
});

// Gestion des formulaires
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            });
            
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                const result = await response.json();
                if (result.success) {
                    showMessage('success', result.message);
                    if (form.dataset.resetOnSuccess !== 'false') {
                        form.reset();
                    }
                } else {
                    showMessage('error', result.message);
                }
            }
        } catch (error) {
            showMessage('error', 'Une erreur est survenue');
        }
    });
});

function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = type;
    message.textContent = text;
    document.body.prepend(message);
    setTimeout(() => message.remove(), 5000);
}