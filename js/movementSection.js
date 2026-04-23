document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evitamos el salto brusco original
        
        const hash = this.getAttribute('href');
        const target = document.querySelector(hash);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        if (target) {
            // Calculamos la posición real menos el alto del menú
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Aplicamos el foco después del movimiento para no perder la posición
            setTimeout(() => {
                target.focus({ preventScroll: true }); 
            }, 600); // 600ms es el tiempo estándar del smooth scroll
        }
    });
});