(function() {
      'use strict';
      // ============================================================
      // 2. tsParticles – gold / pink floating (very low opacity)
      // ============================================================
      if (typeof tsParticles !== 'undefined') {
        tsParticles.load('hero-particles', {
          fpsLimit: 45,
          particles: {
            number: { value: 22, density: { enable: true, area: 800 } },
            color: { value: ['#E8C9A0', '#FF69B4', '#FFDAB9', '#FFF0F5'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.2,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.05 }
            },
            size: {
              value: { min: 3, max: 12 },
              random: true,
              anim: { enable: true, speed: 1.2, size_min: 2 }
            },
            move: {
              enable: true,
              speed: 0.5,
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

      // ============================================================
      // 3. PARALLAX on mousemove (subtle)
      // ============================================================
      const hero = document.getElementById('aboutHero');
      const bg = document.getElementById('heroBg');

      document.addEventListener('mousemove', (e) => {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        // only if mouse is inside hero
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        if (bg) {
          bg.style.transform = `scale(1.05) translate(${x * 0.4}px, ${y * 0.4}px)`;
        }
      });

      document.addEventListener('mouseleave', () => {
        if (bg) {
          bg.style.transform = 'scale(1.05) translate(0, 0)';
        }
      });

      // ============================================================
      // 4. (Optional) smooth entrance – no extra, but we keep it clean
      // ============================================================
      console.log('✨ About Hero · Hana Yeganeh');
    })();










    (function() {
      'use strict';
      // ============================================================
      // 2. SCROLL REVEAL – staggered (left then right)
      // ============================================================
      const portrait = document.getElementById('portraitWrap');
      const content = document.getElementById('storyContent');

      // if already visible on load (e.g. small screen), reveal immediately
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // left first
            portrait.classList.add('reveal');
            // right after a tiny delay
            setTimeout(() => {
              content.classList.add('reveal');
            }, 150);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -30px 0px'
      });

      observer.observe(document.getElementById('storySection'));

      // fallback: if section is already visible (e.g. above fold)
      const rect = document.getElementById('storySection').getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        portrait.classList.add('reveal');
        setTimeout(() => content.classList.add('reveal'), 150);
      }

      console.log('✨ Artist’s Story · Hana Yeganeh');
    })();






    (function() {
      'use strict';
      // ============================================================
      // 2. tsParticles – gold / pink floating (very low opacity)
      // ============================================================
      if (typeof tsParticles !== 'undefined') {
        tsParticles.load('connect-particles', {
          fpsLimit: 40,
          particles: {
            number: { value: 18, density: { enable: true, area: 800 } },
            color: { value: ['#E8C9A0', '#FF69B4', '#FFDAB9', '#FFF0F5'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.15,
              random: true,
              anim: { enable: true, speed: 0.4, opacity_min: 0.04 }
            },
            size: {
              value: { min: 3, max: 10 },
              random: true,
              anim: { enable: true, speed: 1.0, size_min: 2 }
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'top',
              random: true,
              outModes: 'out'
            },
            wobble: { enable: true, distance: 5, speed: 0.4 },
            rotate: { value: 45, random: true, animation: { enable: true, speed: 2 } }
          },
          background: { color: 'transparent' }
        });
      }

      // ============================================================
      // 3. Form submissions (demo)
      // ============================================================
      document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        if (input.value.trim()) {
          alert('✨ Thank you for subscribing! You\'ll hear from me soon.');
          input.value = '';
        }
      });

      document.getElementById('inquiryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.querySelector('input');
        const msg = e.target.querySelector('textarea');
        if (name.value.trim() && msg.value.trim()) {
          alert('📩 Thank you for your message! I\'ll respond within 24 hours.');
          name.value = '';
          msg.value = '';
        } else {
          alert('Please fill in both your name and message.');
        }
      });

      console.log('✨ Connect with Hana Yeganeh');
    })();