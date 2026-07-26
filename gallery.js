    (function() {
      'use strict';

      // ----- SLIDE IMAGES (12 artworks) -----
      const images = [
        'img-art/art-1.jpg',
        'img-art/art-2.jpg',
        'img-art/art-3.jpg',
        'img-art/art-4.jpg',
        'img-art/art-5.jpg',
        'img-art/art-6.jpg',
        'img-art/art-7.jpg',
        'img-art/art-8.jpg',
        'img-art/art-9.jpg',
        'img-art/art-10.jpg',
        'img-art/art-11.jpg',
        'img-art/art-12.jpg'
      ];

      const slideshow = document.getElementById('heroSlideshow');
      const counter = document.getElementById('slideCounter');
      let currentIndex = 0;
      let slideInterval = null;
      const intervalTime = 4000;
      let isTransitioning = false;

      // ----- BUILD SLIDES -----
      function buildSlides() {
        slideshow.innerHTML = '';
        images.forEach((src, idx) => {
          const slide = document.createElement('div');
          slide.className = 'slide-bg' + (idx === 0 ? ' active' : '');
          slide.style.backgroundImage = `url(${src})`;
          slide.dataset.index = idx;
          slideshow.appendChild(slide);
        });
        updateCounter();
      }

      // ----- GO TO SLIDE -----
      function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;

        const slides = slideshow.querySelectorAll('.slide-bg');
        const oldSlide = slides[currentIndex];
        const newSlide = slides[index];

        // old exits
        oldSlide.classList.remove('active');
        oldSlide.classList.add('exit');

        // new enters
        newSlide.classList.add('active');

        // clean up after transition
        setTimeout(() => {
          oldSlide.classList.remove('exit');
          isTransitioning = false;
        }, 1800);

        currentIndex = index;
        updateCounter();
      }

      // ----- NEXT SLIDE (auto) -----
      function nextSlide() {
        const next = (currentIndex + 1) % images.length;
        goToSlide(next);
      }

      // ----- UPDATE COUNTER -----
      function updateCounter() {
        if (counter) {
          const num = String(currentIndex + 1).padStart(2, '0');
          const total = String(images.length).padStart(2, '0');
          counter.textContent = `${num} / ${total}`;
        }
      }

      // ----- AUTO-PLAY -----
      function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }

      function pauseAutoPlay() {
        if (slideInterval) {
          clearInterval(slideInterval);
          slideInterval = null;
        }
      }

      function resumeAutoPlay() {
        if (!slideInterval) {
          startAutoPlay();
        }
      }

      // ----- PARTICLES -----
      if (typeof tsParticles !== 'undefined') {
        tsParticles.load('hero-particles', {
          fpsLimit: 45,
          particles: {
            number: { value: 30, density: { enable: true, area: 900 } },
            color: { value: ['#E8C9A0', '#FF69B4', '#FF1493', '#FFF0F5'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.15,
              random: true,
              anim: { enable: true, speed: 0.4, opacity_min: 0.03 }
            },
            size: {
              value: { min: 3, max: 12 },
              random: true,
              anim: { enable: true, speed: 0.8, size_min: 2 }
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'top',
              random: true,
              outModes: 'out'
            },
            wobble: { enable: true, distance: 5, speed: 0.4 },
            rotate: { value: 45, random: true, animation: { enable: true, speed: 1.5 } }
          },
          background: { color: 'transparent' }
        });
      }

      // ----- PARALLAX on mouse (subtle) -----
      const hero = document.getElementById('heroGallery');
      const card = document.querySelector('.hero-card');
      let isParallaxActive = true;

      document.addEventListener('mousemove', (e) => {
        if (!isParallaxActive) return;
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        if (card) {
          const tiltX = y * 2.5;
          const tiltY = -x * 2.5;
          card.style.transform = `translateY(-4px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
      });

      document.addEventListener('mouseleave', () => {
        if (card) {
          card.style.transform = 'translateY(-4px) perspective(800px) rotateX(0deg) rotateY(0deg)';
        }
      });

      // disable parallax on small screens
      function checkParallax() {
        if (window.innerWidth < 768) {
          isParallaxActive = false;
          if (card) card.style.transform = '';
        } else {
          isParallaxActive = true;
        }
      }
      checkParallax();
      window.addEventListener('resize', checkParallax);

      // pause on hover
      const heroSection = document.getElementById('heroGallery');
      heroSection.addEventListener('mouseenter', pauseAutoPlay);
      heroSection.addEventListener('mouseleave', resumeAutoPlay);


      // ----- INIT -----
      buildSlides();
      startAutoPlay();

      console.log('✨ Gallery Hero · slideshow background active');
    })();












    (function() {
      'use strict';

      // ---------- ARTWORK DATA (16 pieces) ----------
      const allArtworks = [
        { title: 'Ethereal Bloom', year: '2025', technique: 'Oil on canvas', img: 'img-art/art-1.jpg' },
        { title: 'Golden Hour', year: '2024', technique: 'Oil on linen', img: 'img-art/art-2.jpg' },
        { title: 'Rose Noir', year: '2025', technique: 'Watercolor', img: 'img-art/art-3.jpg' },
        { title: 'Silent Poetry', year: '2024', technique: 'Mixed media', img: 'img-art/art-4.jpg' },
        { title: 'Veiled Light', year: '2023', technique: 'Charcoal', img: 'img-art/art-5.jpg' },
        { title: 'Mist & Petal', year: '2025', technique: 'Watercolor', img: 'img-art/art-6.jpg' },
        { title: 'Golden Echo', year: '2024', technique: 'Mixed media', img: 'img-art/art-7.jpg' },
        { title: 'Dreamweaver', year: '2025', technique: 'Oil on canvas', img: 'img-art/art-8.jpg' },
        { title: 'Scarlet Whisper', year: '2024', technique: 'Oil on linen', img: 'img-art/art-9.jpg' },
        { title: 'Twilight Sonata', year: '2025', technique: 'Acrylic', img: 'img-art/art-10.jpg' },
        { title: 'Aether', year: '2023', technique: 'Mixed media', img: 'img-art/art-11.jpg' },
        { title: 'Eternal Spring', year: '2025', technique: 'Watercolor', img: 'img-art/art-12.jpg' },
        { title: 'Whispering Shadows', year: '2024', technique: 'Charcoal', img: 'img-art/art-13.jpg' },
        { title: 'Crimson Tide', year: '2025', technique: 'Oil on canvas', img: 'img-art/art-14.jpg' },
        { title: 'Silver Lining', year: '2024', technique: 'Mixed media', img: 'img-art/art-15.jpg' },
        { title: 'Midnight Bloom', year: '2025', technique: 'Watercolor', img: 'img-art/art-16.jpg' }
      ];

      // ---------- DOM refs ----------
      const grid = document.getElementById('collectionGrid');
      const loadBtn = document.getElementById('loadMoreBtn');
      let visibleCount = 8;        // initial load
      const step = 4;
      let isLoaded = false;

      // ---------- render cards ----------
      function renderCards(count) {
        const slice = allArtworks.slice(0, count);
        grid.innerHTML = '';
        slice.forEach((item, index) => {
          const card = document.createElement('div');
          card.className = 'art-card';
          card.dataset.index = index;

          // image
          const imgWrap = document.createElement('div');
          imgWrap.className = 'card-image';
          const img = document.createElement('img');
          img.src = item.img;
          img.alt = item.title;
          img.loading = 'lazy';
          imgWrap.appendChild(img);

          // meta
          const meta = document.createElement('div');
          meta.className = 'card-meta';
          meta.innerHTML = `
            <div class="title">${item.title}</div>
            <div class="year"><i class="fas fa-diamond"></i> ${item.technique} <i class="fas fa-diamond"></i> ${item.year}</div>
          `;

          // glass overlay
          const overlay = document.createElement('div');
          overlay.className = 'glass-overlay';
          overlay.innerHTML = `
            <button class="view-btn"><i class="fas fa-arrow-right"></i> View Details</button>
          `;

          card.appendChild(imgWrap);
          card.appendChild(meta);
          card.appendChild(overlay);
          grid.appendChild(card);
        });

        // stagger reveal with IntersectionObserver
        const cards = grid.querySelectorAll('.art-card');
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const card = entry.target;
                const idx = parseInt(card.dataset.index, 10) || 0;
                const delay = Math.min(idx * 70, 600);
                setTimeout(() => {
                  card.classList.add('visible');
                }, delay);
                observer.unobserve(card);
              }
            });
          }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
          cards.forEach(c => observer.observe(c));
        } else {
          cards.forEach(c => c.classList.add('visible'));
        }

        // update button state
        if (count >= allArtworks.length) {
          loadBtn.disabled = true;
          loadBtn.innerHTML = '<i class="fas fa-check"></i> All Loaded';
        } else {
          loadBtn.disabled = false;
          loadBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Load More';
        }
        visibleCount = count;
      }

      // ---------- load more ----------
      function loadMore() {
        const next = Math.min(visibleCount + step, allArtworks.length);
        renderCards(next);
      }

      // ---------- init ----------
      renderCards(visibleCount);
      loadBtn.addEventListener('click', loadMore);

      // ---------- tsParticles (gold & pink) ----------
      if (typeof tsParticles !== 'undefined') {
        tsParticles.load('collection-particles', {
          fpsLimit: 45,
          particles: {
            number: { value: 28, density: { enable: true, area: 900 } },
            color: { value: ['#E8C9A0', '#FF69B4', '#FF1493', '#FFF0F5'] },
            shape: { type: 'circle' },
            opacity: {
              value: 0.2,
              random: true,
              anim: { enable: true, speed: 0.5, opacity_min: 0.04 }
            },
            size: {
              value: { min: 3, max: 14 },
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
            rotate: { value: 45, random: true, animation: { enable: true, speed: 1.5 } }
          },
          background: { color: 'transparent' }
        });
      }

      console.log('✨ Collection gallery loaded · Hana Yeganeh');
    })();