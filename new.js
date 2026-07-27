(function() {
    'use strict';

    // ----- VIDEO DATA -----
    const videos = [
      { title: 'Whispers of Color', desc: 'Oil paint swirling on canvas', duration: '0:45', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-1.jpg' },
      { title: 'Golden Hour Palette', desc: 'Mixing warm amber and rose', duration: '1:12', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-2.jpg' },
      { title: 'Dancing Brushes', desc: 'Expressive brushstrokes in motion', duration: '0:32', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-3.jpg' },
      { title: 'Petals in Ink', desc: 'Watercolor bleeding like morning dew', duration: '0:58', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-4.jpg' },
      { title: 'Light & Shadow', desc: 'Charcoal sketching with dramatic lighting', duration: '1:05', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-5.jpg' },
      { title: 'Soul of the Canvas', desc: 'The final, emotional strokes', duration: '0:48', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: 'art-6.jpg' }
    ];

    const grid = document.getElementById('videoGrid');
    if (!grid) {
      console.warn('❌ videoGrid not found!');
      return;
    }

    const modal = document.getElementById('cinemaModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDuration = document.getElementById('modalDuration');
    const closeBtn = document.getElementById('modalClose');

    // ----- build cards -----
    function buildCards() {
      grid.innerHTML = '';
      
      videos.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.index = idx;
        card.style.transitionDelay = (idx * 100) + 'ms';

        const wrapper = document.createElement('div');
        wrapper.className = 'thumb-wrapper';

        // تصویر
        const img = document.createElement('img');
        img.src = item.thumb;
        img.alt = item.title;
        img.loading = 'lazy';
        img.onerror = function() {
          this.src = 'https://picsum.photos/seed/' + (idx + 100) + '/600/400';
        };
        wrapper.appendChild(img);

        // vignette
        const vignette = document.createElement('div');
        vignette.className = 'vignette';
        wrapper.appendChild(vignette);

        // duration badge
        const badge = document.createElement('div');
        badge.className = 'duration-badge';
        badge.textContent = item.duration;
        wrapper.appendChild(badge);

        // play button
        const playBtn = document.createElement('div');
        playBtn.className = 'play-btn';
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.setAttribute('aria-label', 'Play video');
        wrapper.appendChild(playBtn);

        // ✅ overlay با متن‌ها - همیشه قابل مشاهده
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        overlay.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        `;
        wrapper.appendChild(overlay);

        card.appendChild(wrapper);
        grid.appendChild(card);

        // click event
        card.addEventListener('click', function() {
          openModal(idx);
        });
      });

      console.log('✅ ' + videos.length + ' cards built successfully!');
    }

    // ----- open modal -----
    function openModal(index) {
      const data = videos[index];
      if (!data) return;
      
      modalVideo.src = data.src;
      modalVideo.load();
      modalTitle.textContent = data.title;
      modalDuration.textContent = data.duration;
      modal.classList.add('open');
      
      modalVideo.play().catch(() => {
        console.warn('⚠️ Auto-play prevented');
      });
    }

    // ----- close modal -----
    function closeModal() {
      modal.classList.remove('open');
      modalVideo.pause();
      modalVideo.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });

    // ----- SCROLL REVEAL -----
    const section = document.getElementById('artInMotion');
    let isRevealed = false;

    if (section) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isRevealed) {
            isRevealed = true;
            section.classList.add('visible');
            
            const cards = document.querySelectorAll('.video-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('visible');
                console.log(`✅ Card ${i} revealed`);
              }, i * 120);
            });
            
            observer.unobserve(section);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      observer.observe(section);
    } else {
      console.warn('❌ artInMotion section not found!');
    }

    // ----- init -----
    buildCards();

    // expose for debug
    window.openModal = openModal;
    window.closeModal = closeModal;

    console.log('✨ Art in Motion — cinematic gallery loaded');
})();
