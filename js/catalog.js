// Массив с данными товаров
const products = [
    {
        id: 1,
        title: "Классические туфли Oxford",
        price: 12990,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80",
        category: "men",
        popularity: 95,
        date: "2024-03-01"
    },
    {
        id: 2,
        title: "Ботинки Chelsea Premium",
        price: 9990,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80",
        category: "women",
        popularity: 88,
        date: "2024-03-15"
    },
    {
        id: 3,
        title: "Кроссовки Nike Air Max",
        price: 14990,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
        category: "sport",
        popularity: 92,
        date: "2024-03-10"
    },
    {
        id: 4,
        title: "Ботинки Timberland Pro",
        price: 16990,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80",
        category: "men",
        popularity: 85,
        date: "2024-03-20"
    },
    {
        id: 5,
        title: "Кроссовки Adidas Originals",
        price: 11990,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80",
        category: "women",
        popularity: 90,
        date: "2024-03-05"
    },
    {
        id: 6,
        title: "Беговые кроссовки Nike Zoom",
        price: 13990,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80",
        category: "sport",
        popularity: 87,
        date: "2024-03-18"
    },
    {
        id: 7,
        title: "Кожаные ботинки Classic",
        price: 15990,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80",
        category: "men"
    },
    {
        id: 8,
        title: "Кроссовки для бега Asics",
        price: 12990,
        image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80",
        category: "sport"
    },
    {
        id: 9,
        title: "Элегантные туфли на каблуке",
        price: 8990,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80",
        category: "women"
    },
    {
        id: 10,
        title: "Зимние ботинки Snow Pro",
        price: 17990,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80",
        category: "men"
    }
];

// Настройки пагинации
const PRODUCTS_PER_PAGE = 6;
let currentPage = 1;

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция фильтрации товаров
function filterProducts() {
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');
    const sortSelect = document.getElementById('sort');

    let filtered = [...products];

    // Фильтрация по категории
    if (categorySelect.value !== 'all') {
        filtered = filtered.filter(product => product.category === categorySelect.value);
    }

    // Фильтрация по цене
    switch (priceSelect.value) {
        case '0-5000':
            filtered = filtered.filter(product => product.price <= 5000);
            break;
        case '5000-10000':
            filtered = filtered.filter(product => product.price > 5000 && product.price <= 10000);
            break;
        case '10000+':
            filtered = filtered.filter(product => product.price > 10000);
            break;
    }

    // Сортировка
    switch (sortSelect.value) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filtered.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'new':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }

    return filtered;
}

// Функция отображения товаров
function displayProducts() {
    const filteredProducts = filterProducts();
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const grid = document.querySelector('.catalog-grid');
    grid.innerHTML = '';

    paginatedProducts.forEach(product => {
        const card = `
            <div class="product-card" data-category="${product.category}" data-popular="${product.popularity}" data-date="${product.date}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-overlay">
                        <a href="#" class="btn-small"><i class="fas fa-eye"></i> Быстрый просмотр</a>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price.toLocaleString()} ₽</p>
                    <button class="add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> В корзину
                    </button>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', card);
    });

    updatePagination(filteredProducts.length);
    addCartButtonListeners();
}

// Функция обновления пагинации
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const pagination = document.querySelector('.pagination');
    
    if (!pagination) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        document.querySelector('.catalog-grid').after(paginationContainer);
    }

    const currentPagination = document.querySelector('.pagination');
    currentPagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Первая страница
    currentPagination.insertAdjacentHTML('beforeend', `
        <a href="#" class="${currentPage === 1 ? 'active' : ''}" data-page="1">1</a>
    `);

    // Добавляем многоточие и промежуточные страницы
    if (totalPages > 1) {
        if (currentPage > 3) {
            currentPagination.insertAdjacentHTML('beforeend', '<span>...</span>');
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            currentPagination.insertAdjacentHTML('beforeend', `
                <a href="#" class="${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</a>
            `);
        }

        if (currentPage < totalPages - 2) {
            currentPagination.insertAdjacentHTML('beforeend', '<span>...</span>');
        }

        // Последняя страница
        if (totalPages > 1) {
            currentPagination.insertAdjacentHTML('beforeend', `
                <a href="#" class="${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</a>
            `);
        }
    }

    // Добавляем обработчики для кнопок пагинации
    const pageLinks = currentPagination.querySelectorAll('a');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(link.dataset.page);
            displayProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

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

// Функция добавления слушателей для кнопок корзины
function addCartButtonListeners() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
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
    // Добавляем обработчики событий для фильтров
    const filters = document.querySelectorAll('#category, #price, #sort');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            currentPage = 1; // Сбрасываем страницу при изменении фильтров
            displayProducts();
        });
    });

    // Отображаем товары
    displayProducts();
}); 