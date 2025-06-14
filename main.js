// Navegación suave por secciones
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Scroll al inicio al hacer clic en el logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Validación simple del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = contactForm.nombre.value.trim();
        const email = contactForm.email.value.trim();
        const mensaje = contactForm.mensaje.value.trim();
        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        alert('¡Gracias por tu mensaje! Pronto te responderé.');
        contactForm.reset();
    });
} 