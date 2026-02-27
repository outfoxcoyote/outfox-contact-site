/* ---- CAROUSEL CONFIG ---- */

const CAROUSEL_CONFIG = {
  pauseMs: 5000,
  scrollMs: 1350,
  ease: 'cubic-bezier(0.45, 0, 0.25, 1)'
};

/* ---- ASSET DISCOVERY ---- */

async function fetchAssets() {
  try {
    const res = await fetch('/api/assets');
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (_) {
    return { fonts: [], images: [] };
  }
}

/* ---- FONT LOADING ---- */

function getFormat(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return { woff2: 'woff2', woff: 'woff', ttf: 'truetype', otf: 'opentype' }[ext] || 'woff2';
}

function applyFont(fonts) {
  // Prefer woff2, then woff, then first available
  const file = fonts.find(f => /\.woff2$/i.test(f))
    || fonts.find(f => /\.woff$/i.test(f))
    || fonts[0];
  if (!file) return;

  const style = document.createElement('style');
  style.textContent = `@font-face { font-family: 'Oil Can'; src: url('assets/fonts/${file}') format('${getFormat(file)}'); font-display: swap; }`;
  document.head.appendChild(style);
  const root = document.documentElement;
  root.style.setProperty('--font-body',    "'Oil Can', Georgia, serif");
  root.style.setProperty('--font-display', "'Oil Can', Georgia, serif");
}

/* ---- CAROUSEL ---- */

function buildCarousel(images) {
  const track  = document.getElementById('carousel-track');
  const banner = document.querySelector('#mobile-banner img');
  if (!track || !images.length) return;

  track.innerHTML = images
    .map(img => `<div class="car-slide"><img src="assets/images/${img}" alt=""></div>`)
    .join('');

  if (banner) banner.src = `assets/images/${images[0]}`;
}

function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const slides = [...track.querySelectorAll('.car-slide')];
  if (slides.length === 0) return;

  // Clone all slides for seamless loop
  slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

  let currentIndex = 0;
  const totalOriginal = slides.length;

  function advance() {
    currentIndex++;
    const slideH = track.parentElement.clientHeight;
    track.style.transition = `transform ${CAROUSEL_CONFIG.scrollMs}ms ${CAROUSEL_CONFIG.ease}`;
    track.style.transform = `translateY(-${currentIndex * slideH}px)`;

    // Reset to top seamlessly after last original slide
    if (currentIndex >= totalOriginal) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateY(0)';
        currentIndex = 0;
      }, CAROUSEL_CONFIG.scrollMs + 50);
    }
  }

  setInterval(advance, CAROUSEL_CONFIG.pauseMs);
}

/* ---- FORM SUBMISSION ---- */

async function submitForm(payload) {
  const response = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const errorEl = document.getElementById('form-error');
  const btn     = form.querySelector('.submit-btn');

  errorEl.textContent = '';

  const firstName          = form.firstName.value.trim();
  const lastName           = form.lastName.value.trim();
  const phone              = form.phone.value.trim();
  const email              = form.email.value.trim();
  const consentTransactional = form.consentTransactional.checked;

  if (!firstName || !lastName) {
    errorEl.textContent = 'Please enter your first and last name.';
    return;
  }
  if (!phone) {
    errorEl.textContent = 'Phone number is required.';
    return;
  }
  if (!email || !email.includes('@')) {
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  if (!consentTransactional) {
    errorEl.textContent = 'Please accept the transactional messaging consent to continue.';
    return;
  }

  const payload = {
    firstName,
    lastName,
    phone,
    email,
    message: form.message.value.trim(),
    consentTransactional: true,
    consentMarketing: form.consentMarketing.checked
  };

  btn.disabled    = true;
  btn.textContent = 'Sending...';

  submitForm(payload)
    .then(() => {
      document.getElementById('contact-form').hidden = true;
      document.getElementById('form-success').hidden = false;
    })
    .catch(() => {
      errorEl.textContent = 'Something went wrong. Please try again or contact us directly.';
      btn.disabled    = false;
      btn.textContent = 'Send Message';
    });
}

/* ---- INIT ---- */

document.addEventListener('DOMContentLoaded', async () => {
  const { fonts, images } = await fetchAssets();
  applyFont(fonts);
  buildCarousel(images);
  initCarousel();
  document.getElementById('contact-form')
    .addEventListener('submit', handleFormSubmit);
});
