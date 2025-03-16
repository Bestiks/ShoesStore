// Массив популярных товаров
const featuredProducts = [
    {
        id: 3,
        title: "Спортивные кроссовки Pro",
        price: 7990,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
        category: "sport"
    },
    {
        id: 1,
        title: "Классические туфли Elite",
        price: 9990,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80",
        category: "men"
    },
    {
        id: 5,
        title: "Повседневные кеды Casual",
        price: 5990,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80",
        category: "casual"
    }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция добавления товара в корзину
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.title} добавлен в корзину`);
    updateCartCounter();
}

// Функция показа уведомления
function showNotification(message) {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 15px 25px;
                border-radius: 30px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transform: translateY(-100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Функция обновления счетчика товаров в корзине
function updateCartCounter() {
    const cartLink = document.querySelector('.cart-link');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartLink) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Корзина (${totalItems})`;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем счетчик корзины
    updateCartCounter();
    
    // Добавляем обработчики для кнопок корзины
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const product = {
                id: parseInt(button.getAttribute('data-product-id')),
                title: productCard.querySelector('h3').textContent,
                price: parseInt(productCard.querySelector('.price').textContent.replace(/\s/g, '')),
                image: productCard.querySelector('img').src,
                category: productCard.getAttribute('data-category')
            };
            addToCart(product);
        });
    });
}); 