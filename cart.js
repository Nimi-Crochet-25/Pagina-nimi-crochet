// Carrito de compras básico para tienda de crochet

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartModal = null;
        this.renderCartIcon();
        this.renderCartModal();
        this.updateCartCount();
    }

    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += product.quantity || 1;
        } else {
            this.items.push({ ...product, quantity: product.quantity || 1 });
        }
        this.save();
        this.updateCartCount();
        this.renderCartModal();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateCartCount();
        this.renderCartModal();
    }

    clear() {
        this.items = [];
        this.save();
        this.updateCartCount();
        this.renderCartModal();
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    save() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    renderCartIcon() {
        if (document.getElementById('cart-icon')) return;
        const icon = document.createElement('div');
        icon.id = 'cart-icon';
        icon.innerHTML = `
            <span class="cart-count">0</span>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a0522d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2l1.5 2h9L18 2"/>
                <rect x="3" y="4" width="18" height="18" rx="4"/>
                <path d="M7 10a5 5 0 0 0 10 0"/>
            </svg>
        `;
        icon.className = 'cart-floating-icon';
        icon.onclick = () => this.toggleCartModal();
        document.body.appendChild(icon);
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const countEl = document.querySelector('#cart-icon .cart-count');
        if (countEl) countEl.textContent = count;
    }

    renderCartModal() {
        if (this.cartModal) this.cartModal.remove();
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="cart-modal-content">
                <h2>Carrito de compras</h2>
                <div class="cart-items-list">
                    ${this.items.length === 0 ? '<p>El carrito está vacío.</p>' : this.items.map(item => `
                        <div class="cart-item">
                            <img src="${item.image || ''}" alt="${item.name}" class="cart-item-img">
                            <div class="cart-item-info">
                                <strong>${item.name}</strong><br>
                                <span>Cantidad: ${item.quantity}</span>
                            </div>
                            <button class="cart-remove-btn" onclick="cart.removeItem('${item.id}')">&times;</button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total-row">
                    <span>Total:</span>
                    <span class="cart-total">$${this.getTotal().toLocaleString()}</span>
                </div>
                <div class="cart-payment-row">
                    <div class="cart-payment-methods">
                        <img src="images/Medios de pago/nequi-logo-png.png" alt="Nequi" class="pago-logo" style="height:32px; margin-right:10px;">
                        <img src="images/Medios de pago/Dale logo.png" alt="Dale" class="pago-logo" style="height:32px;">
                    </div>
                    <button class="cart-action-btn" style="margin-top:1rem;width:100%;" onclick="cart.goToCheckoutModal()">Ir a Pagar</button>
                </div>
                <div class="cart-modal-actions">
                    <button class="cart-action-btn" onclick="cart.clear()">Vaciar carrito</button>
                    <button class="cart-action-btn" onclick="cart.toggleCartModal()">Cerrar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.cartModal = modal;
    }

    toggleCartModal() {
        if (!this.cartModal) return;
        if (this.cartModal.style.display === 'flex') {
            this.cartModal.style.display = 'none';
        } else {
            this.cartModal.style.display = 'flex';
        }
    }

    goToCheckoutModal() {
        this.toggleCartModal();
        window.location.href = 'cart.html';
    }
}

// Inicializar carrito global
window.cart = new Cart();

// Ejemplo de cómo agregar un producto desde cualquier parte:
// cart.addItem({ id: 'ami1', name: 'Amigurumi', price: 35000, image: 'images/amigurumi-ejemplo.jpg', quantity: 1 }); 

// Función para cargar los items del carrito
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    let total = 0;

    cartContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">×</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total;
}

// Función para actualizar la cantidad de un item
function updateQuantity(index, change) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart();
}

// Función para remover un item del carrito
function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart();
}

// Función para aplicar descuento
function applyDiscount() {
    const code = document.getElementById('discount-code').value;
    // Aquí puedes agregar la lógica para validar y aplicar descuentos
    alert('Funcionalidad de descuento en desarrollo');
}

// Función para ir al checkout
function goToCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    // Aquí puedes agregar la lógica para el proceso de pago
    alert('Funcionalidad de pago en desarrollo');
}

// Cargar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', loadCart); 