// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
const getThemePreference = () => {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getThemePreference());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Floating Particles
const particlesContainer = document.getElementById('particles');

function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Pause animations initially and observe
document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
  el.style.animationPlayState = 'paused';
  animateOnScroll.observe(el);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScrollY = window.scrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Skill bar animations on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  skillObserver.observe(bar);
});

// Add hover effect to cards
document.querySelectorAll('.stat-item, .soft-skill-card, .certification-card, .contact-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('Portfolio loaded successfully!');
