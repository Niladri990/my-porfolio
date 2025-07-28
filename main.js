// main.js - Main JavaScript file for the portfolio website
document.addEventListener('DOMContentLoaded', () => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  const mobileMenuBtn = $('.mobile-menu-btn');
  const navLinksContainer = $('.nav-links');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');
  const backToTopBtn = $('.back-to-top');
  const contactForm = $('#contact-form');
  const currentYearSpan = $('#current-year');
  const heroSubtitle = $('.hero-subtitle');
  const heroContent = $('.hero-content');
  const heroSocial = $('.hero-social');
  const messageBox = $('#message-box');
  const messageBoxText = $('#message-box-text');
  const messageBoxOkBtn = $('.message-box-ok-btn');
  const messageBoxCloseBtn = $('#message-box .close-btn');

  const showMessageModal = message => {
    if (messageBox && messageBoxText) {
      messageBoxText.textContent = message;
      messageBox.classList.add('visible');
    } else {
      alert(message);
    }
  };

  const hideMessageModal = () => messageBox?.classList.remove('visible');

  // Set current year
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  heroContent?.classList.add('animate');
  heroSocial?.classList.add('animate');

  // Mobile menu toggle
  mobileMenuBtn?.addEventListener('click', () => {
    navLinksContainer?.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon?.classList.toggle('fa-bars');
    icon?.classList.toggle('fa-times');
  });

  // Smooth scroll
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.startsWith('#/')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = $('.floating-nav')?.offsetHeight || 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });

        if (navLinksContainer?.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          const icon = mobileMenuBtn?.querySelector('i');
          icon?.classList.remove('fa-times');
          icon?.classList.add('fa-bars');
        }
      }
    });
  });

  const updateActiveNavLink = () => {
    let current = '';
    const navHeight = $('.floating-nav')?.offsetHeight || 80;
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - navHeight - 40)
        current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Back to top
  window.addEventListener('scroll', () => {
    backToTopBtn?.classList.toggle('visible', window.pageYOffset > 300);
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Contact form
  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = $('#submit-btn');
    const spinner = submitBtn?.querySelector('.spinner');
    submitBtn && (submitBtn.disabled = true);
    spinner && (spinner.style.display = 'inline-block');

    setTimeout(() => {
      showMessageModal('Thank you for your message! I will get back to you soon.');
      this.reset();
      submitBtn && (submitBtn.disabled = false);
      spinner && (spinner.style.display = 'none');
    }, 1500);
  });

  messageBoxOkBtn?.addEventListener('click', hideMessageModal);
  messageBoxCloseBtn?.addEventListener('click', hideMessageModal);

  const elementsToAnimate = $$('.section, .project-card, .about-image');
  const animateOnScroll = () => {
    elementsToAnimate.forEach(el => {
      const rectTop = el.getBoundingClientRect().top;
      const winHeight = window.innerHeight;
      if (rectTop < winHeight - 100) el.classList.add('animate');
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Typing animation
  if (heroSubtitle) {
    const texts = [
      "I build things for the web.",
      "I solve complex problems.",
      "I create digital experiences."
    ];
    let idx = 0, char = 0, del = false, text = '';

    const type = () => {
      const full = texts[idx];
      text = del ? full.substring(0, char--) : full.substring(0, char++);
      heroSubtitle.textContent = text;

      let speed = del ? 60 : 120;
      if (!del && char === full.length) {
        speed = 2000;
        del = true;
      } else if (del && char === 0) {
        del = false;
        idx = (idx + 1) % texts.length;
        speed = 500;
      }
      setTimeout(type, speed);
    };
    setTimeout(type, 1000);
  }

  // particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#64ffda" },
        shape: {
          type: "circle",
          polygon: { nb_sides: 5 }
        },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#8892b0",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  } else {
    console.warn('particles.js not found');
  }
});
// Load particles.js script dynamically
const loadParticlesJS = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
  script.onload = () => {
    console.log('particles.js loaded successfully');
  };
  script.onerror = () => {
    console.error('Failed to load particles.js');
  };
  document.head.appendChild(script);
};