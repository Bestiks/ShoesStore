// Mobile menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const navList = document.querySelector('.nav-list');

burgerMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    burgerMenu.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Функция показа уведомлений
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Добавляем уведомление на страницу
    document.body.appendChild(notification);

    // Добавляем стили для анимации
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Функция обновления счетчика корзины
function updateCartCounter() {
    const cartLink = document.querySelector('.cart-link');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Находим существующий счетчик или создаем новый
    let counter = cartLink.querySelector('.cart-counter');
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'cart-counter';
        cartLink.appendChild(counter);
    }
    
    // Обновляем значение счетчика
    if (totalItems > 0) {
        counter.textContent = totalItems;
        counter.style.display = 'inline-block';
    } else {
        counter.style.display = 'none';
    }
}

// Инициализация счетчика корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
}); 