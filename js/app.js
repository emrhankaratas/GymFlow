document.addEventListener('DOMContentLoaded', () => {
  // === Parallax Effect ===
  const heroImage = document.querySelector('.parallax-img');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (heroImage) {
      heroImage.style.transform = `translateY(${-10 + scrollY * 0.04}%) scale(1.05)`;
    }
  });

  // === Scroll Reveal ===
  const revealElements = document.querySelectorAll('.reveal-card');
  revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el, i) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        setTimeout(() => {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }, (i % 3) * 100);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // === Counter Animation ===
  const counters = document.querySelectorAll('.hero-stat-number');
  let countersAnimated = false;
  
  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      requestAnimationFrame(updateCounter);
    });
  };

  // Trigger counters when hero is visible
  setTimeout(animateCounters, 800);

  // === Navbar scroll effect ===
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10,10,10,0.9)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
    }
  });

  // === Smooth Scroll ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Contact Form ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Mesajınız Gönderildi!';
      btn.style.background = 'var(--success-color)';
      setTimeout(() => {
        btn.textContent = 'Mesaj Gönder';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
