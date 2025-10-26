// --- MENÚ HAMBURGUESA ---
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

menu.addEventListener('click', () => {
  overlay.style.height = overlay.style.height === '100%' ? '0' : '100%';
  menu.classList.toggle('open');
});

// --- SCROLL REVEAL EFECTO ---
window.addEventListener('scroll', reveal);

function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
