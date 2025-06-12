// Funciones para el carrito y la galería
function decrementQuantity(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    if (input) {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    }
}

function incrementQuantity(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    if (input) {
        const currentValue = parseInt(input.value);
        if (currentValue < 10) {
            input.value = currentValue + 1;
        }
    }
}

// Datos de la galería
const galeriaItems = [
    // Amigurumis
    {
        id: 1,
        categoria: 'amigurumis',
        imagen: 'images/Amigurumi/IMG_20240630_212517631.jpg',
        titulo: 'Amigurumi Especial',
        descripcion: 'Creación única tejida a mano'
    },
    {
        id: 2,
        categoria: 'amigurumis',
        imagen: 'images/Amigurumi/IMG_20250420_111911.jpg',
        titulo: 'Amigurumi Decorativo',
        descripcion: 'Diseño exclusivo tejido con amor'
    },
    {
        id: 3,
        categoria: 'amigurumis',
        imagen: 'images/Amigurumi/IMG_20230226_205010.jpg',
        titulo: 'Amigurumi Coleccionable',
        descripcion: 'Pieza única hecha a mano'
    },

    // Gorros
    {
        id: 4,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230927_145547.jpg',
        titulo: 'Gorro Moderno',
        descripcion: 'Diseño contemporáneo y cómodo'
    },
    {
        id: 5,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230927_145140.jpg',
        titulo: 'Gorro Casual',
        descripcion: 'Perfecto para el día a día'
    },
    {
        id: 6,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20221114_171306.jpg',
        titulo: 'Gorro Elegante',
        descripcion: 'Estilo y comodidad'
    },
    {
        id: 7,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20221114_162343.jpg',
        titulo: 'Gorro Clásico',
        descripcion: 'Diseño atemporal'
    },
    {
        id: 8,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230525_221455.jpg',
        titulo: 'Gorro Estacional',
        descripcion: 'Perfecto para cualquier ocasión'
    },
    {
        id: 9,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230525_223024.jpg',
        titulo: 'Gorro Versátil',
        descripcion: 'Adaptable a cualquier estilo'
    },
    {
        id: 10,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230629_163208.jpg',
        titulo: 'Gorro Trendy',
        descripcion: 'A la última moda'
    },
    {
        id: 11,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230601_144802.jpg',
        titulo: 'Gorro Fashion',
        descripcion: 'Estilo único y personal'
    },
    {
        id: 12,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230601_214531.jpg',
        titulo: 'Gorro Distintivo',
        descripcion: 'Marca tu propio estilo'
    },
    {
        id: 13,
        categoria: 'gorros',
        imagen: 'images/Gorros/IMG_20230605_174616.jpg',
        titulo: 'Gorro Especial',
        descripcion: 'Diseño exclusivo'
    },

    // Llaveros
    {
        id: 14,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/3fa546a5017afbcd4f78a54080cee77f.jpg',
        titulo: 'Llavero Decorativo',
        descripcion: 'Accesorio único y personal'
    },
    {
        id: 15,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/2ed317892590eb9dd3eb2682f806e591.jpg',
        titulo: 'Llavero Artesanal',
        descripcion: 'Hecho a mano con dedicación'
    },
    {
        id: 16,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/IMG_20221014_081339.jpg',
        titulo: 'Llavero Exclusivo',
        descripcion: 'Diseño original'
    },
    {
        id: 17,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/IMG_20221013_224810.jpg',
        titulo: 'Llavero Personalizado',
        descripcion: 'Detalle único'
    },
    {
        id: 18,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/IMG_20220806_175526.jpg',
        titulo: 'Llavero Especial',
        descripcion: 'Accesorio distintivo'
    },
    {
        id: 19,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/IMG_20220806_175229.jpg',
        titulo: 'Llavero Moderno',
        descripcion: 'Diseño contemporáneo'
    },
    {
        id: 20,
        categoria: 'llaveros',
        imagen: 'images/Llaveros/IMG_20220805_192609.jpg',
        titulo: 'Llavero Elegante',
        descripcion: 'Toque de distinción'
    }
];

// Función para cargar la galería
function cargarGaleria() {
    const galeriaGrid = document.querySelector('.galeria-grid');
    if (!galeriaGrid) return; // Si no estamos en la página de galería, retornamos

    galeriaGrid.innerHTML = ''; // Limpiar la galería

    galeriaItems.forEach(item => {
        const galeriaItem = document.createElement('div');
        galeriaItem.className = `galeria-item ${item.categoria}`;
        galeriaItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}" loading="lazy">
            <div class="galeria-item-info">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
            </div>
        `;
        galeriaGrid.appendChild(galeriaItem);
    });
}

// Función para filtrar la galería
function filtrarGaleria(categoria) {
    const galeriaGrid = document.querySelector('.galeria-grid');
    if (!galeriaGrid) return;

    // Actualizar botones activos
    const botones = document.querySelectorAll('.categoria-btn');
    botones.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === categoria || 
            (categoria === 'todos' && btn.textContent.toLowerCase() === 'todos')) {
            btn.classList.add('active');
        }
    });

    // Filtrar items
    const items = document.querySelectorAll('.galeria-item');
    items.forEach(item => {
        if (categoria === 'todos' || item.classList.contains(categoria)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Optimización de rendimiento con módulos
const cartState = {
    items: [],
    total: 0
};

// Manejo de la pantalla de carga
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la carga
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Función para ocultar la pantalla de carga
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // Ocultar la pantalla de carga después de un tiempo razonable
    setTimeout(hideLoadingScreen, 1500);

    // Inicializar el resto de funcionalidades
    initializeVideos();
    initializeIntersectionObserver();
    initializeEventListeners();
    cargarGaleria(); // Asegurarnos de cargar la galería si estamos en esa página
});

// Inicialización de videos
function initializeVideos() {
    const isMobile = window.innerWidth <= 768;
    const desktopVideo = document.getElementById('hero-video-desktop');
    const mobileVideo = document.getElementById('hero-video-mobile');
    
    if (desktopVideo && mobileVideo) {
        if (isMobile) {
            desktopVideo.style.display = 'none';
            mobileVideo.style.display = 'block';
        } else {
            mobileVideo.style.display = 'none';
            desktopVideo.style.display = 'block';
        }
    }
}

// Optimización de carga de imágenes
function initializeIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Inicialización de event listeners
function initializeEventListeners() {
    // Event listeners para el carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(productId, name, price);
        });
    });

    // Event listener para el formulario de contacto
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Event listeners para filtros de galería
    document.querySelectorAll('.categoria-btn').forEach(button => {
        button.addEventListener('click', () => {
            const categoria = button.textContent.toLowerCase();
            filtrarGaleria(categoria);
        });
    });
}

// Funciones del carrito
function updateCartCount() {
    const count = cartState.items.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function updateCartTotal() {
    cartState.total = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.querySelector('.cart-total').textContent = `$${cartState.total.toFixed(2)}`;
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = cartState.items.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join('');
    
    updateCartCount();
    updateCartTotal();
}

function addToCart(productId, name, price) {
    const existingItem = cartState.items.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartState.items.push({
            id: productId,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cartState.items = cartState.items.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, increment) {
    const item = cartState.items.find(item => item.id === productId);
    if (item) {
        if (increment) {
            item.quantity = Math.min(item.quantity + 1, 10);
        } else {
            item.quantity = Math.max(item.quantity - 1, 1);
        }
        updateCartDisplay();
    }
}

function goToCheckout() {
    // Implementar lógica de checkout
    alert('Redirigiendo al checkout...');
}

function applyDiscount() {
    const discountCode = document.querySelector('#discount-code').value;
    // Implementar lógica de descuentos
    if (discountCode) {
        alert('Código de descuento aplicado');
    } else {
        alert('Por favor ingrese un código de descuento válido');
    }
}

// Manejo del formulario de contacto
async function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    try {
        // Aquí iría la lógica de envío del formulario
        alert('Mensaje enviado con éxito');
        event.target.reset();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        alert('Error al enviar el mensaje. Por favor intente nuevamente.');
    }
} 