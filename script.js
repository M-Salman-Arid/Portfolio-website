
// hamburger icon scirpt 
let menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// faqs scirpt 
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// service learn more toggle script 
const buttons = document.querySelectorAll(".servToggle");

buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const desc = this.previousElementSibling;

    desc.classList.toggle("expanded");

    if (desc.classList.contains("expanded")) {
      this.textContent = "Show less";
    } else {
      this.textContent = "Learn more";
    }
  });
});
// ===== SCROLL ANIMATIONS ===== 
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // stop observing after animation triggers to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-blur, .stagger-item, .fade-in-scroll, .count-up').forEach(el => {
  observer.observe(el);
});

// Parallax scroll effect
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(element => {
    let scrollPosition = window.pageYOffset;
    element.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// --- Load-time and dynamic class assignment for animations ---
document.addEventListener('DOMContentLoaded', () => {
  // Add sensible animation classes to common elements so they animate on scroll/load
  document.querySelectorAll('img').forEach(img => img.classList.add('scroll-scale-up'));

  const selectors = [
    'section', '.service-box', '.project-box', '.skill-box', '.edu-box', '.faq-item', '.intro-box', '.pic-box', '.contact-left', '.form-right', '.skills-heading', '.projects-line', '.edu-heading', '.contact-heading'
  ];

  document.querySelectorAll(selectors.join(', ')).forEach((el, i) => {
    el.classList.add('scroll-fade-in');
    // alternate slide direction for variety
    if (i % 2 === 0) el.classList.add('scroll-slide-left'); else el.classList.add('scroll-slide-right');
  });

  // Observe newly added animation classes (safe to call repeatedly)
  document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-blur, .stagger-item').forEach(el => {
    observer.observe(el);
  });
});

// When the page fully loads, add `in-view` only to elements that are already visible
window.addEventListener('load', () => {
  const loadEls = Array.from(document.querySelectorAll('.scroll-fade-in, .scroll-scale-up'));
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Stagger only for elements currently within the viewport; keep others observed for scroll
  let staggerIndex = 0;
  loadEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < viewportHeight - 40 && rect.bottom > 0;
    if (isVisible) {
      setTimeout(() => {
        el.classList.add('in-view');
        // unobserve since animation played
        try { observer.unobserve(el); } catch (e) { }
      }, staggerIndex * 80);
      staggerIndex++;
    }
  });
});