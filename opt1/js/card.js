const track = document.getElementById('track');
const intervalTime = 5000; // 5 segundos

function moveCarousel() {
    // Calculamos el ancho del primer elemento para saber cuánto desplazar
    const cardWidth = track.firstElementChild.offsetWidth + 15; // ancho + gap

    // Iniciamos la transición hacia la izquierda
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${cardWidth}px)`;

    // Una vez terminada la animación, reordenamos el DOM
    setTimeout(() => {
        track.style.transition = "none"; // Quitamos transición para el salto invisible
        track.appendChild(track.firstElementChild); // Movemos el primer hijo al final
        track.style.transform = "translateX(0)"; // Reseteamos la posición
    }, 800); // Debe coincidir con el tiempo de la transición CSS
}

// Ciclo de ejecución
setInterval(moveCarousel, intervalTime);