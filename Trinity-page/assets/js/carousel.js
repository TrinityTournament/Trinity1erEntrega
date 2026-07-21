// ══════════════════════════════════════════
//  TRINITY — Carrusel de videojuegos (Home)
//  Flechas de scroll + arrastre con el mouse
//  para las tarjetas de juegos de index.html.
//  100% frontend, no depende de ninguna API.
// ══════════════════════════════════════════

// Scroll de las flechas del carrusel de juegos.
// Se deja como función global (fuera de una IIFE) a propósito, porque
// los botones del carrusel la llaman directamente desde el HTML con
// onclick="scrollCards('esports', 1)" / onclick="scrollCards('esports', -1)".
function scrollCards(sectionId, direction) {
    const track = document.getElementById(`scroll-${sectionId}`);
    if (!track) return;
    const card = track.querySelector('.card');
    const step = card ? card.getBoundingClientRect().width + 20 : 300;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
}

// Arrastrar con el mouse para scrollear (usa la clase .grabbing ya definida en style.css).
(function enableCardDrag() {
    document.querySelectorAll('.cards-scroll').forEach(track => {
        let isDown = false, startX, scrollStart;
        track.addEventListener('mousedown', e => {
            isDown = true;
            track.classList.add('grabbing');
            startX = e.pageX;
            scrollStart = track.scrollLeft;
        });
        window.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('grabbing');
        });
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('grabbing');
        });
        track.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            track.scrollLeft = scrollStart - (e.pageX - startX);
        });
    });
})();
