(function() {
      'use strict';

      // ===== DATA =====
      const testimonials = [
        { name: 'Sarah & James', location: 'London', avatar: 'https://i.pravatar.cc/128?img=12', text: 'Hana captured the soul of our garden in a way we never thought possible. The painting is now the heart of our home.', stars: 5, date: 'March 2025' },
        { name: 'Elena', location: 'Paris', avatar: 'https://i.pravatar.cc/128?img=20', text: 'A true master of light and emotion. Every brushstroke tells a story.', stars: 5, date: 'February 2025' },
        { name: 'Marcus', location: 'Berlin', avatar: 'https://i.pravatar.cc/128?img=33', text: 'I\'ve collected art for 20 years. Hana\'s work is something truly special.', stars: 5, date: 'January 2025' },
        { name: 'Aiko', location: 'Tokyo', avatar: 'https://i.pravatar.cc/128?img=45', text: 'The colors dance. The emotions linger. Absolutely breathtaking.', stars: 5, date: 'December 2024' },
        { name: 'Olivia', location: 'New York', avatar: 'https://i.pravatar.cc/128?img=10', text: 'Working with Hana was a dream. She understood my vision perfectly.', stars: 5, date: 'November 2024' },
        { name: 'David', location: 'Sydney', avatar: 'https://i.pravatar.cc/128?img=55', text: 'A masterpiece that transforms every time I look at it. Pure magic.', stars: 5, date: 'October 2024' }
      ];

      // ===== DOM REFS =====
      const track = document.getElementById('carouselTrack');
      const dotsContainer = document.getElementById('dotsContainer');
      const prevBtn = document.getElementById('prevArrow');
      const nextBtn = document.getElementById('nextArrow');
      const section = document.getElementById('testimonialsSection');
      const wrapper = document.getElementById('carouselWrapper');

      let currentIndex = 0;
      let cardWidth = 0;
      let gap = 28;
      let cardsPerView = 3;
      let totalCards = testimonials.length;
      let autoPlayInterval = null;
      let isTransitioning = false;

      // ===== HELPERS =====
      function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      }

      // ===== BUILD CARDS =====
      function buildCards() {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        cardsPerView = getCardsPerView();

        testimonials.forEach((item, idx) => {
          // card
          const card = document.createElement('div');
          card.className = 'testimonial-card';
          card.setAttribute('role', 'listitem');
          card.dataset.index = idx;
          card.style.transitionDelay = (idx * 120) + 'ms';

          // avatar
          const avatarDiv = document.createElement('div');
          avatarDiv.className = 'card-avatar';
          const img = document.createElement('img');
          img.src = item.avatar;
          img.alt = `Avatar of ${item.name}`;
          img.loading = 'lazy';
          const info = document.createElement('div');
          info.className = 'avatar-info';
          info.innerHTML = `<span class="name">${item.name}</span><span class="role">${item.location}</span>`;
          avatarDiv.appendChild(img);
          avatarDiv.appendChild(info);
          card.appendChild(avatarDiv);

          // stars
          const starsDiv = document.createElement('div');
          starsDiv.className = 'stars';
          for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = 'fas fa-star';
            starsDiv.appendChild(star);
          }
          card.appendChild(starsDiv);

          // text
          const textP = document.createElement('p');
          textP.className = 'testimonial-text';
          textP.textContent = item.text;
          card.appendChild(textP);

          // date
          const dateDiv = document.createElement('div');
          dateDiv.className = 'testimonial-date';
          dateDiv.innerHTML = `<i class="fas fa-calendar-alt"></i> ${item.date}`;
          card.appendChild(dateDiv);

          track.appendChild(card);

          // dot
          const dot = document.createElement('span');
          dot.className = 'dot' + (idx === 0 ? ' active' : '');
          dot.setAttribute('role', 'tab');
          dot.dataset.index = idx;
          dot.addEventListener('click', () => goToSlide(idx));
          dotsContainer.appendChild(dot);
        });

        // set initial visibility for cards (staggered via IntersectionObserver in reveal)
        // but we manually add visible class after section appears
      }

      // ===== SCROLL REVEAL + STAGGER =====
      let isRevealed = false;
      function revealSection() {
        if (isRevealed) return;
        isRevealed = true;
        section.classList.add('visible');
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, i * 120);
        });
        // start autoplay after reveal
        setTimeout(startAutoPlay, 600);
      }

      // ===== SLIDE NAVIGATION =====
      function goToSlide(index, animate = true) {
        if (isTransitioning) return;
        if (index < 0) index = totalCards - 1;
        if (index >= totalCards) index = 0;
        if (index === currentIndex) return;

        isTransitioning = true;
        currentIndex = index;
        updateCarousel();
        updateDots();
        resetAutoPlay();
        setTimeout(() => { isTransitioning = false; }, 400);
      }

      function updateCarousel() {
        const trackWidth = track.offsetWidth;
        const cardEls = track.querySelectorAll('.testimonial-card');
        if (!cardEls.length) return;
        // compute card width + gap dynamically
        const firstCard = cardEls[0];
        const cardW = firstCard.offsetWidth;
        const gapComputed = 28; // fixed gap from CSS
        const offset = currentIndex * (cardW + gapComputed);
        track.scrollTo({ left: offset, behavior: 'smooth' });
      }

      function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
      }

      // ===== AUTOPLAY =====
      function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      }
      function resetAutoPlay() {
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
          startAutoPlay();
        }
      }

      // pause on hover
      wrapper.addEventListener('mouseenter', () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
      });
      wrapper.addEventListener('mouseleave', startAutoPlay);

      // ===== ARROWS =====
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

      // ===== KEYBOARD =====
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
      });

      // ===== TOUCH / SWIPE (via scroll) =====
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

      // ===== RESIZE =====
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const newCPV = getCardsPerView();
          if (newCPV !== cardsPerView) {
            cardsPerView = newCPV;
            // re-build? we just update scroll position
            updateCarousel();
          }
        }, 200);
      });

      // ===== INTERSECTION OBSERVER (section reveal) =====
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealSection();
            observer.unobserve(section);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
      observer.observe(section);

      // ===== INIT =====
      buildCards();
      // if already visible (e.g. fast load), reveal
      setTimeout(() => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) revealSection();
      }, 300);

      // expose for debug
      window.goToSlide = goToSlide;

      // ===== THEME TOGGLE (demo) =====
      const themeToggle = document.getElementById('demoThemeToggle');
      const themeIcon = document.getElementById('demoThemeIcon');
      const themeLabel = document.getElementById('demoThemeLabel');
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
          document.documentElement.removeAttribute('data-theme');
          themeIcon.className = 'fas fa-moon';
          themeLabel.textContent = 'DAY';
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          themeIcon.className = 'fas fa-sun';
          themeLabel.textContent = 'NIGHT';
        }
      });

      console.log('✨ Testimonials Wall — loaded');
    })();