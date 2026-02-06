document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  const animateElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  animateElements.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', { 'event_category': 'contact', 'event_label': this.getAttribute('href') });
      }
    });
  });
});