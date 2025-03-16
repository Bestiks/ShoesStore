document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');

    // Маска для телефона
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            const matches = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !matches[2] ? '+7 (' + matches[1] :
                            '+7 (' + matches[1] + ') ' + matches[2] +
                            (matches[3] ? '-' + matches[3] : '') +
                            (matches[4] ? '-' + matches[4] : '');
        }
    });

    // Обработка отправки формы
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Сбор данных формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Валидация формы
        if (!validateForm(formData)) {
            return;
        }

        // Имитация отправки данных на сервер
        showLoadingState();
        
        setTimeout(() => {
            // В реальном проекте здесь был бы запрос к серверу
            hideLoadingState();
            showSuccessMessage();
            contactForm.reset();
        }, 1500);
    });

    function validateForm(data) {
        // Проверка имени
        if (data.name.length < 2) {
            showError('Имя должно содержать не менее 2 символов');
            return false;
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Введите корректный email адрес');
            return false;
        }

        // Проверка телефона
        if (data.phone.replace(/\D/g, '').length < 11) {
            showError('Введите корректный номер телефона');
            return false;
        }

        // Проверка темы
        if (!data.subject) {
            showError('Выберите тему сообщения');
            return false;
        }

        // Проверка сообщения
        if (data.message.length < 10) {
            showError('Сообщение должно содержать не менее 10 символов');
            return false;
        }

        return true;
    }

    function showError(message) {
        const notification = createNotification(message, 'error');
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function showSuccessMessage() {
        const notification = createNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Стили для уведомления
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '5px',
            color: '#fff',
            backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            transition: 'opacity 0.3s ease',
            zIndex: '1000'
        });

        return notification;
    }

    function showLoadingState() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    }

    function hideLoadingState() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить сообщение';
    }
}); 