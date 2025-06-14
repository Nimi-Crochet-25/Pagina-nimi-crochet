// Clase para manejar el carrito de compras
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.total = 0;
        this.updateTotal();
    }

    // Agregar producto al carrito
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
        }
        
        this.updateTotal();
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Remover producto del carrito
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, Math.min(10, quantity));
            this.updateTotal();
            this.saveToStorage();
            this.updateCartDisplay();
        }
    }

    // Calcular el total del carrito
    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Guardar carrito en localStorage
    saveToStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    // Actualizar la visualización del carrito
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        if (cartItems) {
            cartItems.innerHTML = '';
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Cantidad: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="cart.removeItem(${item.id})" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(itemElement);
            });
        }

        if (cartTotal) {
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    // Limpiar el carrito
    clearCart() {
        this.items = [];
        this.total = 0;
        this.saveToStorage();
        this.updateCartDisplay();
    }
}

// Inicializar el carrito
const cart = new ShoppingCart();

// Función para agregar producto al carrito desde los botones
function addToCart(productId, name, price, image) {
    cart.addItem({
        id: productId,
        name: name,
        price: price,
        image: image,
        quantity: 1
    });
}

// Función para ir al checkout
function goToCheckout() {
    if (cart.items.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('El carrito está vacío');
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartDisplay();
}); 