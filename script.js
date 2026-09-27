/* ─────────────────────────────────────────────────────────────────
   Ahmed Samir – Portfolio  |  JavaScript
   ───────────────────────────────────────────────────────────────── */

/* ── Cursor Glow ────────────────────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ── Navbar scroll effect ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

/* ── Mobile menu ────────────────────────────────────────────────── */
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Active nav link ────────────────────────────────────────────── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ── Typed text effect ──────────────────────────────────────────── */
const phrases = [
  'Flutter Developer',
  'Mobile App Developer',
  'UI Developer',
  'Dart Enthusiast',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIdx);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
  }
  let delay = isDeleting ? 60 : 110;
  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 1200);

/* ── Intersection Observer for AOS animations ───────────────────── */
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

/* ── Skill icon level bars animation ───────────────────────────── */
const skillIconObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.sic-level span').forEach((bar, i) => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, i * 90);
      });
      skillIconObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-icons-grid').forEach(el => skillIconObserver.observe(el));

/* ── Smooth scroll for anchor links ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Contact form ────────────────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn        = document.getElementById('btn-send');
  const btnText    = document.getElementById('btn-send-text');
  const btnIcon    = document.getElementById('btn-send-icon');
  const successMsg = document.getElementById('formSuccess');

  btn.disabled  = true;
  btnText.textContent = 'Sending…';
  btnIcon.textContent = '⏳';

  // Simulate async send
  setTimeout(() => {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.textContent = '→';
    successMsg.style.display = 'block';
    e.target.reset();
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1500);
}

/* ── Navbar link highlight on load ──────────────────────────────── */
updateActiveLink();

/* ── Parallax on orbs ────────────────────────────────────────────── */
document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (x - cx) / cx;
  const dy = (y - cy) / cy;

  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 10;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

/* ── Number counter animation ────────────────────────────────────── */
function animateCount(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.textContent);
        el.textContent = '0';
        animateCount(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
