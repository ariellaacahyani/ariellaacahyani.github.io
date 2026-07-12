document.addEventListener('DOMContentLoaded', () => {

/* ============================= */
/* 🌙 Dark-mode toggle (+ memory) */
/* ============================= */
const toggle = document.getElementById('themeToggle');
const icon = toggle.querySelector('i');
const saved = localStorage.getItem('theme');
if (saved) {
document.documentElement.setAttribute('data-theme', saved);
icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}
toggle.addEventListener('click', () => {
const current = document.documentElement.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

/* ============================= */
/* 📜 Scroll fade-in animation */
/* ============================= */
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

const blocks = document.querySelectorAll('.item-block');
blocks.forEach(block => {
observer.observe(block);

/* video hover play (kalau ada) */
const video = block.querySelector('video');
if (video) {
block.addEventListener('mouseenter', () => video.play());
block.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
}
});

/* ============================= */
/* ⭐ Bintang jatuh RANDOM */
/* ============================= */
const starfield = document.querySelector('.starfield');

function spawnShootingStar() {
// cuma jalan kalau lagi dark mode
if (document.documentElement.getAttribute('data-theme') !== 'dark') return;

const star = document.createElement('div');
star.className = 'shooting-star';

// posisi awal random (mulai dari area atas layar)
const startX = Math.random() * window.innerWidth;
const startY = Math.random() * (window.innerHeight * 0.5);

// sudut, jarak, durasi, panjang ekor — semua random
const angle = 20 + Math.random() * 50; // 20°–70°
const distance = 300 + Math.random() * 400; // jarak tempuh
const duration = 0.8 + Math.random() * 1.2; // 0.8–2 detik
const length = 80 + Math.random() * 120; // ekor 80–200px

// titik akhir berdasarkan sudut
const rad = angle * Math.PI / 180;
const endX = Math.cos(rad) * distance;
const endY = Math.sin(rad) * distance;

star.style.left = startX + 'px';
star.style.top = startY + 'px';
star.style.width = length + 'px';
star.style.transform = `rotate(${angle}deg)`;

starfield.appendChild(star);

// animasi pakai Web Animations API
star.animate([
{ transform: `translate(0, 0) rotate(${angle}deg)`, opacity: 0 },
{ opacity: 1, offset: 0.15 },
{ opacity: 1, offset: 0.7 },
{ transform: `translate(${endX}px, ${endY}px) rotate(${angle}deg)`, opacity: 0 }
], {
duration: duration * 1000,
easing: 'linear'
}).onfinish = () => star.remove(); // hapus setelah selesai (hemat memori)
}

// hormati user yg gak suka animasi
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
// spawn tiap 1.5–4 detik, jeda random biar gak berpola
(function loop() {
spawnShootingStar();
setTimeout(loop, 1500 + Math.random() * 2500);
})();
}

});


