 (function() {
      'use strict';

      // ---------- ARTWORK DATA ----------
      const artworks = [
        { title: 'Dreamweaver', technique: 'Oil on canvas · 2024', price: '€4,200', dimensions: '120 × 90 cm', edition: 'Original', sold: false, isNew: true },
        { title: 'Golden Echo', technique: 'Mixed media · 2025', price: '€3,800', dimensions: '100 × 80 cm', edition: '1/25', sold: false, isNew: true },
        { title: 'Rose Noir', technique: 'Watercolor · 2024', price: '€2,600', dimensions: '70 × 50 cm', edition: '3/50', sold: false, isNew: false },
        { title: 'Silent Poetry', technique: 'Oil on linen · 2023', price: '€5,100', dimensions: '150 × 110 cm', edition: 'Original', sold: true, isNew: false },
        { title: 'Veiled Light', technique: 'Charcoal & pastel · 2025', price: '€1,900', dimensions: '60 × 45 cm', edition: '12/50', sold: false, isNew: true },
        { title: 'Eternal Spring', technique: 'Acrylic · 2024', price: '€3,200', dimensions: '90 × 70 cm', edition: '2/25', sold: false, isNew: false },
        { title: 'Mist & Petal', technique: 'Watercolor · 2025', price: '€1,500', dimensions: '50 × 40 cm', edition: '8/50', sold: false, isNew: true },
        { title: 'Scarlet Whisper', technique: 'Oil on canvas · 2024', price: '€4,800', dimensions: '130 × 100 cm', edition: 'Original', sold: false, isNew: false }
      ];

      // ---------- DOM refs ----------
      const track = document.getElementById('sliderTrack');
      const dotsContainer = document.getElementById('dotsContainer');
      const counter = document.getElementById('slideCounter');
      const prevBtn = document.getElementById('prevSlide');
      const nextBtn = document.getElementById('nextSlide');
      const section = document.getElementById('shopSlider');

      let currentIndex = 0;
      let slidesPerView = 3;
      let totalSlides = artworks.length;
      let slideCards = [];
      let autoplayInterval = null;
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let isTransitioning = false;

      // ---------- helpers ----------
      function getSlidesPerView() {
        if (window.innerWidth <= 700) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      }

      // ---------- build slider ----------
      function buildSlider() {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        slideCards = [];
        slidesPerView = getSlidesPerView();

        artworks.forEach((art, idx) => {
          const card = document.createElement('div');
          card.className = 'slide-card';
          card.dataset.index = idx;

          // front
          const front = document.createElement('div');
          front.className = 'card-front';
          const img = document.createElement('img');
          img.className = 'art-img';
          img.src = `./art-${idx + 1}.jpg`;
          img.alt = art.title;
          img.loading = 'lazy';
          front.appendChild(img);

          // badges
          if (art.sold) {
            const badge = document.createElement('div');
            badge.className = 'badge sold';
            badge.textContent = 'Sold';
            front.appendChild(badge);
          } else if (art.isNew) {
            const badge = document.createElement('div');
            badge.className = 'badge new';
            badge.textContent = 'New';
            front.appendChild(badge);
          }

          // wishlist heart
          const heart = document.createElement('div');
          heart.className = 'wishlist-icon';
          heart.innerHTML = '<i class="far fa-heart"></i>';
          heart.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = heart.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
          });
          front.appendChild(heart);

          // glass meta
          const meta = document.createElement('div');
          meta.className = 'glass-meta';
          meta.innerHTML = `
            <div class="title">${art.title}</div>
            <div class="technique">${art.technique}</div>
            <div class="price">${art.price}</div>
          `;
          front.appendChild(meta);

          // back
          const back = document.createElement('div');
          back.className = 'card-back';
          back.innerHTML = `
            <h3>${art.title}</h3>
            <div class="detail-item"><strong>Dimensions</strong> ${art.dimensions}</div>
            <div class="detail-item"><strong>Edition</strong> ${art.edition}</div>
            <div class="detail-item"><strong>Price</strong> ${art.price}</div>
            <div class="action-row">
              <button class="btn btn-primary">Add to Cart</button>
              <button class="btn">View Details</button>
            </div>
          `;

          // flipper
          const flipper = document.createElement('div');
          flipper.className = 'flipper';
          flipper.appendChild(front);
          flipper.appendChild(back);
          card.appendChild(flipper);

          // click flip (mobile / touch)
          card.addEventListener('click', () => {
            if (window.innerWidth <= 700) {
              card.classList.toggle('flipped');
            }
          });

          track.appendChild(card);
          slideCards.push(card);

          // dot
          const dot = document.createElement('div');
          dot.className = 'dot' + (idx === 0 ? ' active' : '');
          dot.dataset.index = idx;
          dot.addEventListener('click', () => goToSlide(idx));
          dotsContainer.appendChild(dot);
        });

        updateSlider();
        updateCounter();
        updateDots();
      }

      // ---------- slide transition ----------
      function goToSlide(index, animate = true) {
        if (isTransitioning) return;
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        if (index === currentIndex) return;

        isTransitioning = true;
        const direction = index > currentIndex ? 1 : -1;
        const oldIndex = currentIndex;

        // add exit class to current slides
        const visibleIndices = getVisibleIndices(oldIndex);
        visibleIndices.forEach(i => {
          if (slideCards[i]) slideCards[i].classList.add('exit');
        });

        setTimeout(() => {
          currentIndex = index;
          updateSlider();
          updateCounter();
          updateDots();

          // add enter class to new visible slides
          const newVisible = getVisibleIndices(index);
          newVisible.forEach(i => {
            if (slideCards[i]) {
              slideCards[i].classList.add('enter');
              setTimeout(() => {
                slideCards[i].classList.remove('enter');
              }, 200);
            }
          });

          // remove exit from all
          slideCards.forEach(c => c.classList.remove('exit'));

          setTimeout(() => {
            isTransitioning = false;
          }, 300);
        }, 400);

        resetAutoplay();
      }

      function getVisibleIndices(index) {
        const count = slidesPerView;
        const start = Math.floor(index - (count - 1) / 2);
        const indices = [];
        for (let i = 0; i < count; i++) {
          let idx = start + i;
          if (idx < 0) idx = totalSlides + idx;
          if (idx >= totalSlides) idx = idx - totalSlides;
          indices.push(idx);
        }
        return indices;
      }

      function updateSlider() {
        const slideWidth = slideCards[0]?.offsetWidth || 0;
        const gap = 1.8 * 16; // 1.8rem in px (approx)
        const offset = (slideWidth + gap) * (currentIndex - Math.floor(slidesPerView / 2));
        track.style.transform = `translateX(-${offset}px)`;
      }

      function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
      }

      function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
      }

      // ---------- autoplay ----------
      function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      }

      function resetAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      }

      // pause on hover
      const wrapper = document.getElementById('sliderWrapper');
      wrapper.addEventListener('mouseenter', () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
      });
      wrapper.addEventListener('mouseleave', startAutoplay);

      // ---------- swipe support ----------
      let touchStartX = 0;
      let touchEndX = 0;

      wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex - 1);
        }
      }, { passive: true });

      // ---------- nav buttons ----------
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

      // keyboard
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
      });

      // ---------- resize ----------
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newSPV = getSlidesPerView();
          if (newSPV !== slidesPerView) {
            slidesPerView = newSPV;
            updateSlider();
          }
        }, 200);
      });

      // ---------- Intersection Observer (section fade-in) ----------
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add('visible');
            sectionObserver.unobserve(section);
          }
        });
      }, { threshold: 0.15 });

      sectionObserver.observe(section);

      // ---------- init ----------
      buildSlider();
      startAutoplay();


      // expose for debugging
      window.goToSlide = goToSlide;

    })();
