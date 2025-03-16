// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    const subtotalElement = document.querySelector('.cart-subtotal');
    const deliveryCostElement = document.querySelector('.delivery-cost');
    const totalElement = document.querySelector('.cart-total');

    function updateCartDisplay() {
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartContent.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartContent.style.display = 'grid';
            renderCartItems();
            updateCartTotals();
        }
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p class="cart-item-price">${item.price} ₽</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to quantity controls and remove buttons
        addCartControlsListeners();
    }

    function addCartControlsListeners() {
        // Quantity minus buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
                if (input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                    cartItems[index].quantity = parseInt(input.value);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    updateCartTotals();
                }
            });
        });

        // Quantity plus buttons
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
                input.value = parseInt(input.value) + 1;
                cartItems[index].quantity = parseInt(input.value);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartTotals();
            });
        });

        // Quantity input direct changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                if (input.value < 1) input.value = 1;
                cartItems[index].quantity = parseInt(input.value);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartTotals();
            });
        });

        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('.remove-item').dataset.index;
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartDisplay();
            });
        });
    }

    function updateCartTotals() {
        const subtotal = cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);

        const deliveryCost = subtotal >= 5000 ? 0 : 500;
        const total = subtotal + deliveryCost;

        subtotalElement.textContent = `${subtotal} ₽`;
        deliveryCostElement.textContent = `${deliveryCost} ₽`;
        totalElement.textContent = `${total} ₽`;
    }

    // Initialize cart display
    updateCartDisplay();

    // Checkout button handler
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        alert('Функционал оформления заказа находится в разработке');
    });
}); 