/* ============================================
   GitHub Copilot Architecture - JavaScript
   Scroll animations, simulation, interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initSimulation();
  initNavHighlight();
  initThemeToggle();
});

/* ------------------------------------------
   Theme Toggle (Dark / Light)
   ------------------------------------------ */
function initThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  const icon = btn.querySelector('.theme-icon');

  /* Restore saved preference */
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    icon.textContent = '🌙';
  }

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    icon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ------------------------------------------
   Navigation
   ------------------------------------------ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  /* Scroll shadow */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Mobile toggle */
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  /* Close menu on link click */
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

/* ------------------------------------------
   Active nav highlight on scroll
   ------------------------------------------ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ------------------------------------------
   Scroll-triggered fade-in animations
   ------------------------------------------ */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in, .step-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ------------------------------------------
   Copilot Request Simulation
   ------------------------------------------ */
function initSimulation() {
  const btn = document.getElementById('sim-btn');
  if (!btn) return;
  btn.addEventListener('click', runSimulation);
}

async function runSimulation() {
  const btn = document.getElementById('sim-btn');
  btn.disabled = true;
  btn.textContent = 'Simulating...';

  /* Reset */
  resetSimulation();

  const steps = document.querySelectorAll('.sim-status-step');
  const lines = document.querySelectorAll('.sim-line');
  const suggestion = document.querySelector('.sim-suggestion');

  /* Step 1 — User types code */
  activateStep(steps, 0);
  for (let i = 0; i < lines.length; i++) {
    await wait(400);
    lines[i].classList.add('typed');
  }
  completeStep(steps, 0);

  /* Step 2 — Request sent */
  await wait(500);
  activateStep(steps, 1);
  await wait(1200);
  completeStep(steps, 1);

  /* Step 3 — Model processes */
  await wait(300);
  activateStep(steps, 2);
  await wait(1800);
  completeStep(steps, 2);

  /* Step 4 — Suggestion returned */
  await wait(300);
  activateStep(steps, 3);
  await wait(600);
  suggestion.classList.add('visible');
  completeStep(steps, 3);

  await wait(500);
  btn.disabled = false;
  btn.textContent = 'Simulate Copilot Request';
}

function activateStep(steps, idx) {
  steps.forEach(s => s.classList.remove('active'));
  steps[idx].classList.add('active');
}

function completeStep(steps, idx) {
  steps[idx].classList.remove('active');
  steps[idx].classList.add('done');
}

function resetSimulation() {
  document.querySelectorAll('.sim-line').forEach(l => l.classList.remove('typed'));
  document.querySelectorAll('.sim-status-step').forEach(s => {
    s.classList.remove('active', 'done');
  });
  const suggestion = document.querySelector('.sim-suggestion');
  if (suggestion) suggestion.classList.remove('visible');
}

/* Utility — promisified delay */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
