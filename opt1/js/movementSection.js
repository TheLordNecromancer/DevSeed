document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Verificamos que sea un enlace interno
        if (href.startsWith("#")) {
            e.preventDefault(); // Evita el "salto" instantáneo
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtenemos la altura del navbar dinámicamente
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Opcional: Transferencia de foco para accesibilidad
                targetElement.focus({ preventScroll: true });
            }
        }
    });
});