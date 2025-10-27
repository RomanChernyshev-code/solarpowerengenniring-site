// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger?.addEventListener('click', () => menu.classList.toggle('open'));

// Smooth appear on scroll
const io = new IntersectionObserver((entries)=> {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold: 0.15 });
document.querySelectorAll('.appear').forEach(el => io.observe(el));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// KPI playful counters (static demo)
const animateNum = (el, to, dur=1000) => {
  const start = performance.now();
  const from = parseFloat(el.textContent) || 0;
  const delta = to - from;
  const tick = now => {
    const p = Math.min(1, (now - start)/dur);
    el.textContent = (from + delta * p).toFixed( (to%1!==0)?1:0 );
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
animateNum(document.getElementById('kpi-power'), 15);
animateNum(document.getElementById('kpi-co2'), 7.2);
document.getElementById('kpi-savings').textContent = '-60%';

// Simple carousel
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
let idx = 0;
const show = i => {
  idx = (i+slides.length)%slides.length;
  slides.forEach((s, k)=> s.style.display = (k===idx)?'block':'none');
  dots.forEach((d, k)=> d.classList.toggle('active', k===idx));
};
dots.forEach((d, k)=> d.addEventListener('click', ()=> show(k)));
show(0);
setInterval(()=> show(idx+1), 6000);

// Copy to clipboard (email/phone)
document.querySelectorAll('[data-copy]').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    await navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = 'Скопійовано ✓';
    setTimeout(()=> btn.textContent = btn.dataset.copy, 1200);
  });
});

// Lead form (static demo — відправка в email: заміни на свій бекенд або Formspree)
const form = document.getElementById('lead-form');
const note = document.getElementById('form-note');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  // TODO: підключи свій endpoint або Formspree:
  // fetch('https://formspree.io/f/XXXX', { method:'POST', body: new FormData(form) })
  console.log('Лід надіслано (демо):', data);
  note.textContent = 'Дякуємо! Заявку отримано — ми зв’яжемося з вами.';
  form.reset();
});

// Instagram button
document.getElementById('open-instagram')?.addEventListener('click', ()=>{
  window.open('https://instagram.com/solarpowerengineering','_blank');
});

// ---- Gallery ----
// Оскільки офіційний Instagram oEmbed потребує токен, робимо легку галерею,
// яку ти оновлюєш сам: просто додавай об’єкти нижче (img, caption, url).
const posts = [
  {
    img: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop',
    caption: 'AIKO Solar • Дахова СЕС 15 кВт',
    url: 'https://instagram.com/solarpowerengineering'
  },
  {
    img: 'https://images.unsplash.com/photo-1509395176047-d0a3f4b8b9b4?q=80&w=1600&auto=format&fit=crop',
    caption: 'Інвертор + акумулятори • Гібрид',
    url: 'https://instagram.com/solarpowerengineering'
  },
  {
    img: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop',
    caption: 'LONGi 615W • Комерційний об’єкт',
    url: 'https://instagram.com/solarpowerengineering'
  },
  {
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    caption: 'Монтаж та кабель-менеджмент',
    url: 'https://instagram.com/solarpowerengineering'
  },
  {
    img: 'https://images.unsplash.com/photo-1584276433295-4b1413f4b1f2?q=80&w=1600&auto=format&fit=crop',
    caption: 'Моніторинг генерації 24/7',
    url: 'https://instagram.com/solarpowerengineering'
  },
  {
    img: 'https://images.unsplash.com/photo-1505739966280-316e6d74bf66?q=80&w=1600&auto=format&fit=crop',
    caption: 'Резервне живлення складу',
    url: 'https://instagram.com/solarpowerengineering'
  }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');

function renderGallery(){
  gallery.innerHTML = '';
  posts.forEach(p=>{
    const ph = document.createElement('a');
    ph.className = 'ph appear';
    ph.href = p.url; ph.target = '_blank'; ph.rel = 'noopener';
    ph.innerHTML = `<img src="${p.img}" alt="${p.caption}"><span class="cap">${p.caption}</span>`;
    // open lightbox on middle-click/hold image (or change to click without leaving page)
    ph.addEventListener('click', (e)=>{
      if (!e.metaKey && !e.ctrlKey) { // normal click: lightbox
        e.preventDefault();
        lightboxImg.src = p.img;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
    gallery.appendChild(ph);
    io.observe(ph);
  });
}
renderGallery();

lightboxClose.addEventListener('click', ()=>{
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox.addEventListener('click', (e)=>{
  if (e.target === lightbox) lightboxClose.click();
});

