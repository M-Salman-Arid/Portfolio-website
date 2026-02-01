// Main site JavaScript (moved to /scripts)
// Menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// FAQ toggles
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  if (q) q.addEventListener('click', () => item.classList.toggle('active'));
});

// Service "learn more" toggles
document.querySelectorAll('.servToggle').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const desc = this.previousElementSibling;
    if (!desc) return;
    desc.classList.toggle('expanded');
    this.textContent = desc.classList.contains('expanded') ? 'Show less' : 'Learn more';
  });
});

// Intersection Observer for scroll animations
const ioOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, ioOptions);

document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-blur, .stagger-item, .fade-in-scroll, .count-up').forEach(el => io.observe(el));

// Parallax (lightweight)
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const y = window.pageYOffset * 0.4;
    el.style.backgroundPosition = `center ${y}px`;
  });
});

// Smooth anchor scrolling (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Sticky header on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.pageYOffset > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Back-to-top button (created dynamically)
(function createBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  Object.assign(btn.style, {
    position: 'fixed', right: '18px', bottom: '18px', padding: '10px 12px',
    'font-size': '18px', 'border-radius': '6px', border: 'none', cursor: 'pointer',
    'background-color': '#2563eb', color: '#fff', display: 'none', zIndex: 9999
  });
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.style.display = window.pageYOffset > 400 ? 'block' : 'none';
  });
})();

// Count-up animation for stats (uses data-target)
function animateCount(el, target) {
  let start = 0;
  const duration = 1200;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  const timer = setInterval(() => {
    start += 1;
    el.textContent = start + '+';
    if (start >= target) clearInterval(timer);
  }, stepTime);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10) || 0;
      if (!el.classList.contains('counted') && target > 0) {
        animateCount(el, target);
        el.classList.add('counted');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

// small accessibility: add focus outlines on keyboard nav
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
