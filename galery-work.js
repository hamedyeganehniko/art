    (function() {
      'use strict';

      // ----- DATA -----
      const artworks = [
        { title: 'Ethereal Bloom', technique: 'Oil on canvas', year: '2025', category: 'oil', img: 'art-1.jpg' },
        { title: 'Golden Hour', technique: 'Oil on linen', year: '2024', category: 'oil', img: 'art-2.jpg' },
        { title: 'Rose Noir', technique: 'Watercolor', year: '2025', category: 'watercolor', img: 'art-3.jpg' },
        { title: 'Silent Poetry', technique: 'Mixed media', year: '2024', category: 'mixed', img: 'art-4.jpg' },
        { title: 'Veiled Light', technique: 'Charcoal', year: '2023', category: 'charcoal', img: 'art-5.jpg' },
        { title: 'Mist & Petal', technique: 'Watercolor', year: '2025', category: 'watercolor', img: 'art-6.jpg' },
        { title: 'Golden Echo', technique: 'Mixed media', year: '2024', category: 'mixed', img: 'art-7.jpg' },
        { title: 'Dreamweaver', technique: 'Oil on canvas', year: '2025', category: 'oil', img: 'art-8.jpg' },
        { title: 'Scarlet Whisper', technique: 'Oil on linen', year: '2024', category: 'oil', img: 'art-9.jpg' },
        { title: 'Twilight Sonata', technique: 'Acrylic', year: '2025', category: 'oil', img: 'art-10.jpg' },
        { title: 'Aether', technique: 'Mixed media', year: '2023', category: 'mixed', img: 'art-11.jpg' },
        { title: 'Eternal Spring', technique: 'Watercolor', year: '2025', category: 'watercolor', img: 'art-12.jpg' }
      ];

      const grid = document.getElementById('masonryGrid');
      const filterBtns = document.querySelectorAll('.filter-btn');
      let currentFilter = 'all';
      let visibleCount = 9; // start with 9, load more adds rest
      let allCards = [];

      // ----- BUILD CARDS -----
      function buildCards(artList) {
        grid.innerHTML = '';
        allCards = [];
        artList.forEach((item, index) => {
          const card = document.createElement('div');
          card.className = 'art-card';
          card.dataset.category = item.category;
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
            <div class="details"><span>${item.technique}</span><span class="dot"></span><span>${item.year}</span></div>
          `;

          // glass overlay
          const overlay = document.createElement('div');
          overlay.className = 'glass-overlay';
          overlay.innerHTML = `
            <div class="meta-wrap">
              <div class="ov-title">${item.title}</div>
              <div class="ov-details">${item.technique} · ${item.year}</div>
              <button class="view-btn"><i class="fas fa-arrow-right"></i> View Details</button>
            </div>
          `;

          card.appendChild(imgWrap);
          card.appendChild(meta);
          card.appendChild(overlay);
          grid.appendChild(card);
          allCards.push(card);
        });

        // apply visibility and stagger
        applyFilter(currentFilter);
        revealVisible();
      }

      // ----- FILTER -----
      function applyFilter(filter) {
        currentFilter = filter;
        let visible = 0;
        allCards.forEach((card, idx) => {
          const cat = card.dataset.category;
          const match = filter === 'all' || cat === filter;
          if (match) {
            card.classList.remove('hidden');
            visible++;
          } else {
            card.classList.add('hidden');
          }
        });
        // hide cards beyond visibleCount
        let shown = 0;
        allCards.forEach((card) => {
          if (!card.classList.contains('hidden')) {
            shown++;
            if (shown > visibleCount) {
              card.classList.add('hidden');
            }
          }
        });
        // update load more button
        updateLoadMore();
      }

      function updateLoadMore() {
        const totalVisible = allCards.filter(c => !c.classList.contains('hidden') && c.dataset.category === currentFilter || currentFilter === 'all' && !c.classList.contains('hidden')).length;
        const btn = document.getElementById('loadMoreBtn');
        if (totalVisible >= allCards.filter(c => currentFilter === 'all' || c.dataset.category === currentFilter).length) {
          btn.style.display = 'none';
        } else {
          btn.style.display = 'inline-flex';
        }
      }

      // ----- REVEAL (stagger) -----
      function revealVisible() {
        const visibleCards = allCards.filter(c => !c.classList.contains('hidden'));
        visibleCards.forEach((card, idx) => {
          card.classList.remove('visible');
          const delay = Math.min(idx * 80, 500);
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
        });
      }

      // ----- LOAD MORE -----
      function loadMore() {
        const hiddenCards = allCards.filter(c => c.classList.contains('hidden'));
        if (hiddenCards.length === 0) return;
        // show next 3
        let count = 0;
        for (let card of hiddenCards) {
          if (count >= 3) break;
          card.classList.remove('hidden');
          count++;
          setTimeout(() => {
            card.classList.add('visible');
          }, 80 * count);
        }
        updateLoadMore();
      }

      // ----- FILTER EVENTS -----
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const filter = this.dataset.filter;
          // reset visible count to 9
          visibleCount = 9;
          applyFilter(filter);
          revealVisible();
        });
      });

      document.getElementById('loadMoreBtn').addEventListener('click', loadMore);

      // ----- INIT -----
      buildCards(artworks);

      // re-reveal after theme change (no-op but keeps cards visible)
      console.log('✨ Collection · Hana Yeganeh');
    })();







    
