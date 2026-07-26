(function() {
      'use strict';

      // ---------- THEME TOGGLE ----------
      const toggle = document.getElementById('themeToggleHero');
      const icon = document.getElementById('themeIconHero');
      const label = document.getElementById('themeLabelHero');

      function setTheme(theme) {
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          icon.className = 'fas fa-sun';
          label.textContent = 'NIGHT';
        } else {
          document.documentElement.removeAttribute('data-theme');
          icon.className = 'fas fa-moon';
          label.textContent = 'DAY';
        }
        localStorage.setItem('journalTheme', theme);
      }

      const stored = localStorage.getItem('journalTheme') || 'light';
      setTheme(stored);

      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });

      // ---------- tsparticles (golden dust, low opacity) ----------
      async function loadParticles() {
        if (typeof tsParticles === 'undefined') return;
        await tsParticles.load('hero-particles', {
          fpsLimit: 40,
          particles: {
            number: { value: 28, density: { enable: true, area: 800 } },
            color: { value: ['#E8C9A0', '#d4b08a', '#c9a88a', '#f5e6d6'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.18,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.04, sync: false }
            },
            size: {
              value: { min: 3, max: 11 },
              random: true,
              anim: { enable: true, speed: 1.2, size_min: 1.5, sync: false }
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'top',
              random: true,
              straight: false,
              outModes: 'out',
              wobble: { enable: true, distance: 5, speed: 0.4 }
            },
            rotate: {
              value: 45,
              random: true,
              animation: { enable: true, speed: 1.8 }
            }
          },
          background: { color: 'transparent' }
        });
      }

      // wait for DOM
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        loadParticles();
      } else {
        document.addEventListener('DOMContentLoaded', loadParticles);
      }

      // ---------- subtle parallax on mouse move (just for elegance) ----------
      const hero = document.getElementById('journalHero');
      let isActive = true;

      hero.addEventListener('mousemove', (e) => {
        if (!isActive) return;
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
        const content = hero.querySelector('.hero-content');
        if (content) {
          content.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
          content.style.transition = 'transform 0.1s ease-out';
        }
      });

      hero.addEventListener('mouseleave', () => {
        const content = hero.querySelector('.hero-content');
        if (content) {
          content.style.transform = 'translate(0, 0)';
          content.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        }
      });

      // ---------- small entrance stagger for text ----------
      const title = document.querySelector('.hero-title');
      const divider = document.querySelector('.gold-divider');
      const desc = document.querySelector('.hero-desc');
      const labelEl = document.querySelector('.hero-label');
      const dateEl = document.querySelector('.hero-date');

      [title, divider, desc, labelEl, dateEl].forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(12px)';
          setTimeout(() => {
            el.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 200);
        }
      });

      // slightly different delays for layering
      setTimeout(() => {
        if (title) { title.style.transitionDelay = '0.1s'; }
        if (divider) { divider.style.transitionDelay = '0.2s'; }
        if (desc) { desc.style.transitionDelay = '0.3s'; }
      }, 100);

      console.log('✨ Journal Hero · Studio Notes');
    })();











        (function() {
      'use strict';

      // ---------- VIDEO DATA ----------
      const videos = [
        {
          title: 'A Day in the Studio',
          duration: '12:34',
          date: '15 Mar 2025',
          desc: 'Watch the creative process unfold from morning light to final brushstroke.',
          thumbnail: 'https://picsum.photos/id/101/800/450',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'Mixing Colors: A Study',
          duration: '08:21',
          date: '1 Mar 2025',
          desc: 'Exploring the alchemy of pigments and the magic of color theory.',
          thumbnail: 'https://picsum.photos/id/102/800/450',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'The Art of Patience',
          duration: '15:47',
          date: '15 Feb 2025',
          desc: 'A meditation on slow painting and the beauty of taking time.',
          thumbnail: 'https://picsum.photos/id/104/800/450',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }
      ];

      // ---------- BUILD GRID ----------
      const grid = document.getElementById('videoGrid');
      if (!grid) return;

      videos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.index = index;
        card.dataset.delay = (index * 120) % 360;

        card.innerHTML = `
          <div class="video-thumbnail">
            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
            <span class="duration-badge">${item.duration}</span>
            <div class="play-btn"><i class="fas fa-play"></i></div>
          </div>
          <div class="video-content">
            <div class="video-title">${item.title}</div>
            <div class="video-meta">
              <span class="video-date"><i class="far fa-calendar-alt" style="margin-right:4px;"></i>${item.date}</span>
              <span class="video-duration">${item.duration}</span>
            </div>
            <div class="video-desc">${item.desc}</div>
          </div>
        `;

        // store video data on card
        card.dataset.videoUrl = item.videoUrl;
        card.dataset.videoTitle = item.title;
        card.dataset.videoDate = item.date;

        grid.appendChild(card);
      });

      // ---------- SCROLL REVEAL (staggered) ----------
      const cards = document.querySelectorAll('.video-card');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      });

      cards.forEach(card => observer.observe(card));

      // fallback
      setTimeout(() => {
        cards.forEach(card => {
          if (!card.classList.contains('visible')) {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
              const delay = parseInt(card.dataset.delay) || 0;
              setTimeout(() => card.classList.add('visible'), delay);
            }
          }
        });
      }, 400);

      // ---------- MODAL ----------
      const modal = document.getElementById('videoModal');
      const modalVideo = document.getElementById('modalVideo');
      const modalTitle = document.getElementById('modalTitle');
      const modalDate = document.getElementById('modalDate');
      const modalClose = document.getElementById('modalClose');
      let currentVideo = null;

      function openModal(videoUrl, title, date) {
        modalVideo.src = videoUrl;
        modalTitle.textContent = title;
        modalDate.textContent = date;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modalVideo.play().catch(() => {});
      }

      function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.src = '';
      }

      // click on card -> open modal
      cards.forEach(card => {
        card.addEventListener('click', function() {
          const url = this.dataset.videoUrl;
          const title = this.dataset.videoTitle;
          const date = this.dataset.videoDate;
          if (url) openModal(url, title, date);
        });
      });

      // close buttons
      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          closeModal();
        }
      });

      console.log('✨ Studio Vlog · ' + videos.length + ' videos loaded');
    })();