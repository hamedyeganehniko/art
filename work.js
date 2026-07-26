(function() {
    'use strict';

    // ----- 1. tsParticles (gold/pink, low opacity, floating) -----
    if (typeof tsParticles !== 'undefined') {
      tsParticles.load('works-hero-particles', {
        fpsLimit: 50,
        particles: {
          number: { value: 32, density: { enable: true, area: 700 } },
          color: { value: ['#E8C9A0', '#FF69B4', '#FF1493', '#FFF0F5'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.18,
            random: true,
            anim: { enable: true, speed: 0.6, opacity_min: 0.03, sync: false }
          },
          size: {
            value: { min: 3, max: 14 },
            random: true,
            anim: { enable: true, speed: 1.6, size_min: 2, sync: false }
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'top',
            random: true,
            straight: false,
            outModes: 'out',
          },
          wobble: { enable: true, distance: 8, speed: 0.5 },
          rotate: { value: 45, random: true, animation: { enable: true, speed: 2 } }
        },
        background: { color: 'transparent' }
      });
    }

    // ----- 2. Parallax (background + glass) -----
    const hero = document.getElementById('worksHero');
    if (hero) {
      const bg = hero.querySelector('.works-hero-bg');
      const glass = hero.querySelector('.works-hero-glass');
      let isParallaxActive = true;
      let rafId = null;

      if ('ontouchstart' in window) {
        isParallaxActive = false;
        if (bg) bg.style.transform = 'scale(1.06) translate(0, 0)';
        if (glass) glass.style.transform = 'translate(0, 0)';
      }

      hero.addEventListener('mousemove', (e) => {
        if (!isParallaxActive) return;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const moveX = x * 14;
          const moveY = y * 10;
          if (bg) {
            bg.style.transform = `scale(1.06) translate(${moveX}px, ${moveY}px)`;
          }
          if (glass) {
            glass.style.transform = `translate(${x * 4}px, ${y * 3}px)`;
          }
          rafId = null;
        });
      });

      hero.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (bg) bg.style.transform = 'scale(1.06) translate(0, 0)';
        if (glass) glass.style.transform = 'translate(0, 0)';
      });
    }

    // ----- 3. Scroll indicator: click to scroll -----
    const scrollEl = document.querySelector('.works-hero-scroll');
    if (scrollEl) {
      scrollEl.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight * 0.55, behavior: 'smooth' });
      });
    }

    // ----- 4. Listen for theme changes (from main site) -----
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        // Small delay to let theme apply, then update particle colors if needed
        setTimeout(() => {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const particlesContainer = document.getElementById('works-hero-particles');
          if (particlesContainer && typeof tsParticles !== 'undefined') {
            // Optional: refresh particles to adapt colors
            // tsParticles.load('works-hero-particles', { ... });
          }
        }, 100);
      });
    }

    // ----- 5. Entrance animation (theme-aware) -----
    document.addEventListener('DOMContentLoaded', () => {
      const heroSection = document.querySelector('.works-hero');
      if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(12px)';
        setTimeout(() => {
          heroSection.style.transition = 'opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)';
          heroSection.style.opacity = '1';
          heroSection.style.transform = 'translateY(0)';
        }, 120);
      }
    });

    console.log('✨ Works Hero — fully theme-aware (light/dark)');
  })();











  (function() {
    'use strict';

    // ----- SCROLL REVEAL (staggered) -----
    const cards = document.querySelectorAll('.step-card');
    let revealed = false;

    function revealCards() {
      if (revealed) return;
      const rect = document.getElementById('timelineWrapper').getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;
      if (rect.top < triggerPoint) {
        revealed = true;
        cards.forEach((card, idx) => {
          const delay = idx * 120;
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
        });
      }
    }

    // check on load & scroll
    window.addEventListener('load', () => {
      setTimeout(revealCards, 300);
    });
    window.addEventListener('scroll', revealCards, { passive: true });


    // if cards not revealed after 2s (fallback)
    setTimeout(() => {
      if (!revealed) {
        const rect = document.getElementById('timelineWrapper').getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          revealCards();
        }
      }
    }, 2000);

    console.log('✨ Behind the Canvas · Timeline loaded');
  })();








  (function() {
    'use strict';

    // ----- DATA -----
    const testimonials = [
      { name: 'Sarah & James', location: 'London', quote: 'Hana captured the soul of our garden in a way we never thought possible.', date: '2024' },
      { name: 'Elena', location: 'Paris', quote: 'A true master of light and emotion. Every brushstroke tells a story.', date: '2025' },
      { name: 'Marcus', location: 'Berlin', quote: 'I\'ve collected art for 20 years. Hana\'s work is truly special.', date: '2024' },
      { name: 'Aiko', location: 'Tokyo', quote: 'The colors dance. The emotions linger. Absolutely breathtaking.', date: '2025' },
      { name: 'Olivia', location: 'New York', quote: 'Working with Hana was a dream. She understood my vision perfectly.', date: '2024' },
      { name: 'David', location: 'Sydney', quote: 'A masterpiece that transforms every time I look at it. Pure magic.', date: '2025' }
    ];

    // avatars (initials fallback)
    const avatarColors = ['#FF69B4', '#E8C9A0', '#FF1493', '#d4b08a', '#ff6bb5', '#c9a88a'];

    // DOM refs
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const wrapper = document.getElementById('carouselWrapper');

    let currentIndex = 0;
    let cardsPerView = 3;
    let totalCards = testimonials.length;
    let autoPlayInterval = null;
    const autoPlayDelay = 5000;
    let isPaused = false;

    // ----- BUILD CARDS -----
    function buildCarousel() {
      track.innerHTML = '';
      dotsContainer.innerHTML = '';

      testimonials.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        // stars
        const stars = document.createElement('div');
        stars.className = 'stars';
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('i');
          star.className = 'fas fa-star';
          stars.appendChild(star);
        }

        // quote
        const quote = document.createElement('div');
        quote.className = 'quote-text';
        quote.textContent = item.quote;

        // client row
        const row = document.createElement('div');
        row.className = 'client-row';

        const avatar = document.createElement('div');
        avatar.className = 'client-avatar';
        const initial = item.name.charAt(0);
        avatar.textContent = initial;
        avatar.style.background = avatarColors[idx % avatarColors.length];
        avatar.style.color = '#fff';
        avatar.style.fontWeight = '600';
        avatar.style.fontSize = '1.4rem';

        const info = document.createElement('div');
        info.className = 'client-info';
        const nameEl = document.createElement('span');
        nameEl.className = 'client-name';
        nameEl.textContent = item.name;
        const locEl = document.createElement('span');
        locEl.className = 'client-location';
        locEl.textContent = item.location;
        const dateEl = document.createElement('span');
        dateEl.className = 'client-date';
        dateEl.textContent = `✦ ${item.date}`;

        info.appendChild(nameEl);
        info.appendChild(locEl);
        info.appendChild(dateEl);
        row.appendChild(avatar);
        row.appendChild(info);

        card.appendChild(stars);
        card.appendChild(quote);
        card.appendChild(row);
        track.appendChild(card);

        // dot
        const dot = document.createElement('button');
        dot.className = 'dot' + (idx === 0 ? ' active' : '');
        dot.dataset.index = idx;
        dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });

      updateCardsPerView();
      updateTrack();
    }

    // ----- UPDATE CARDS PER VIEW -----
    function updateCardsPerView() {
      const w = window.innerWidth;
      if (w < 640) cardsPerView = 1;
      else if (w < 1024) cardsPerView = 2;
      else cardsPerView = 3;
    }

    // ----- UPDATE TRACK POSITION -----
    function updateTrack() {
      const totalSlides = testimonials.length;
      const maxIndex = Math.max(0, totalSlides - cardsPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const cardWidth = track.querySelector('.testimonial-card')?.offsetWidth || 260;
      const gap = window.innerWidth < 640 ? 16 : 28;
      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      // update dots
      document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // ----- GO TO SLIDE -----
    function goToSlide(index) {
      const maxIndex = Math.max(0, testimonials.length - cardsPerView);
      if (index < 0) index = 0;
      if (index > maxIndex) index = maxIndex;
      currentIndex = index;
      updateTrack();
      resetAutoPlay();
    }

    // ----- NEXT / PREV -----
    function nextSlide() {
      const maxIndex = Math.max(0, testimonials.length - cardsPerView);
      if (currentIndex >= maxIndex) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }

    function prevSlide() {
      if (currentIndex <= 0) {
        const maxIndex = Math.max(0, testimonials.length - cardsPerView);
        goToSlide(maxIndex);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    // ----- AUTO-PLAY -----
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, autoPlayDelay);
    }

    function resetAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }
    }

    function pauseAutoPlay() {
      isPaused = true;
    }

    function resumeAutoPlay() {
      isPaused = false;
    }

    // ----- EVENT LISTENERS -----
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    // pause on hover
    const carouselWrapper = document.getElementById('carouselWrapper');
    carouselWrapper.addEventListener('mouseenter', pauseAutoPlay);
    carouselWrapper.addEventListener('mouseleave', resumeAutoPlay);

    // responsive
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCardsPerView();
        updateTrack();
      }, 200);
    });

    // keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
      if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
    });

    // ----- INIT -----
    buildCarousel();
    startAutoPlay();

    // small delay to ensure layout
    setTimeout(() => {
      updateCardsPerView();
      updateTrack();
    }, 100);

    console.log('✨ Collectors\' Voices · Carousel loaded');
  })();










      (function() {
      'use strict';

      // ----- PARTICLES (gold / pink floating) -----
      if (typeof tsParticles !== 'undefined') {
        tsParticles.load('studio-particles', {
          fpsLimit: 45,
          particles: {
            number: { value: 28, density: { enable: true, area: 800 } },
            color: { value: ['#E8C9A0', '#FF69B4', '#FF1493', '#FFF0F5'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.25,
              random: true,
              anim: { enable: true, speed: 0.6, opacity_min: 0.05 }
            },
            size: {
              value: { min: 3, max: 14 },
              random: true,
              anim: { enable: true, speed: 1.2, size_min: 2 }
            },
            move: {
              enable: true,
              speed: 0.4,
              direction: 'top',
              random: true,
              outModes: 'out'
            },
            wobble: { enable: true, distance: 6, speed: 0.5 },
            rotate: { value: 45, random: true, animation: { enable: true, speed: 2 } }
          },
          background: { color: 'transparent' }
        });
      }

      // ----- SCROLL REVEAL (Intersection Observer) -----
      const revealElements = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
      });
      revealElements.forEach(el => observer.observe(el));

      // fallback: reveal after 1.5s if not yet
      setTimeout(() => {
        revealElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('visible');
          }
        });
      }, 1500);
      console.log('✨ Inside the Studio · loaded');
    })();