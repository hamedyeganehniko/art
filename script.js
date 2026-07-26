(function() {
    'use strict';
    async function initParticles() {
      if (typeof tsParticles === 'undefined') return;
      await tsParticles.load('header-particles', {
        fpsLimit: 45,
        particles: {
          number: { value: 35, density: { enable: true, area: 700 } },
          color: { value: ['#E8C9A0', '#FF69B4', '#FF1493', '#FFF0F5'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.3,
            random: true,
            anim: { enable: true, speed: 0.6, opacity_min: 0.05 }
          },
          size: {
            value: { min: 3, max: 12 },
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
    function initTheme() {
      const toggle = document.getElementById('themeToggle');
      const icon = document.getElementById('themeIcon');
      const label = document.getElementById('themeLabel');
      const stored = localStorage.getItem('headerTheme') || 'light';
      if (stored === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        label.textContent = 'NIGHT';
      } else {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        label.textContent = 'DAY';
      }

      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('headerTheme', 'light');
          icon.className = 'fas fa-moon';
          label.textContent = 'DAY';
          icon.style.transform = 'rotate(0deg)';
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('headerTheme', 'dark');
          icon.className = 'fas fa-sun';
          label.textContent = 'NIGHT';
          icon.style.transform = 'rotate(180deg)';
        }
        setTimeout(() => { icon.style.transform = ''; }, 600);
      });
    }
    function initSearch() {
      const box = document.getElementById('searchBox');
      const input = document.getElementById('searchInput');
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        box.classList.toggle('open');
        if (box.classList.contains('open')) input.focus();
      });
      document.addEventListener('click', () => box.classList.remove('open'));
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') box.classList.remove('open');
      });
    }
    function initNav() {
      const navItems = document.querySelectorAll('.nav-item');
      const mobileItems = document.querySelectorAll('.mobile-nav li');
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const currentHash = window.location.hash;

      function setActiveFromPage() {
        navItems.forEach(item => item.classList.remove('active'));
        mobileItems.forEach(item => item.classList.remove('active'));

        navItems.forEach((item, index) => {
          const link = item.querySelector('a');
          if (!link) return;
          const href = link.getAttribute('href') || '';
          
          const isCurrentPage = href === currentPath || 
                               (href.includes('#') && href.split('#')[0] === currentPath);
          const isCurrentHash = href === '#' + currentHash.replace('#', '') || 
                                href === currentPath + currentHash;

          if (isCurrentPage || isCurrentHash) {
            item.classList.add('active');
            if (mobileItems[index]) mobileItems[index].classList.add('active');
          }
        });

        if (!document.querySelector('.nav-item.active') && navItems.length > 0) {
          navItems[0].classList.add('active');
          if (mobileItems[0]) mobileItems[0].classList.add('active');
        }
      }

      setActiveFromPage();

      navItems.forEach((item) => {
        const link = item.querySelector('a');
        if (link) {
          link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.includes('#') && href.split('#')[0] === currentPath) {
              e.preventDefault();
              navItems.forEach(i => i.classList.remove('active'));
              mobileItems.forEach(i => i.classList.remove('active'));
              item.classList.add('active');
              const idx = Array.from(navItems).indexOf(item);
              if (mobileItems[idx]) mobileItems[idx].classList.add('active');
              
              // اسکرول به بخش مورد نظر
              const targetId = href.split('#')[1];
              if (targetId) {
                const target = document.getElementById(targetId);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
              // بستن منو موبایل
              const overlay = document.getElementById('mobileOverlay');
              const hamburger = document.getElementById('hamburger');
              if (overlay) overlay.classList.remove('open');
              if (hamburger) hamburger.classList.remove('active');
            }
          });
        }
      });

      // موبایل - بستن منو بعد از کلیک
      mobileItems.forEach((item) => {
        const link = item.querySelector('a');
        if (link) {
          link.addEventListener('click', function() {
            const overlay = document.getElementById('mobileOverlay');
            const hamburger = document.getElementById('hamburger');
            if (overlay) overlay.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
          });
        }
      });

      // گوش دادن به تغییر هش (برای تک‌صفحه‌ای)
      window.addEventListener('hashchange', setActiveFromPage);
    }

    // ============================================================
    // 5. Hamburger + mobile overlay (custom)
    // ============================================================
    function initMobile() {
      const hamburger = document.getElementById('hamburger');
      const overlay = document.getElementById('mobileOverlay');
      const closeBtn = document.getElementById('closeOverlay');

      function toggleMenu(open) {
        hamburger.classList.toggle('active', open);
        overlay.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      }

      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(!overlay.classList.contains('open'));
      });

      closeBtn.addEventListener('click', () => toggleMenu(false));
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) toggleMenu(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
      });
    }

    // ============================================================
    // 6. Scroll effects
    // ============================================================
    function initScrollEffects() {
      const header = document.getElementById('mainHeader');
      const progress = document.getElementById('progress');
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

            if (scrollY > 40) header.classList.add('scrolled');
            else header.classList.remove('scrolled');

            progress.style.width = percent + '%';
            progress.setAttribute('aria-valuenow', Math.round(percent));
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    // ============================================================
    // 7. GSAP entrance
    // ============================================================
    function initGSAP() {
      if (typeof gsap === 'undefined') return;
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } });
      tl.from('#logoEl', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'back.out(1.6)'
      })
      .from('.nav-item', {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.3')
      .from('#rightGroup', {
        x: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.5');
    }

    // ============================================================
    // 8. Init
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
      initParticles();
      initTheme();
      initSearch();
      initNav();
      initMobile();
      initScrollEffects();
      initGSAP();
    });

  })();

  // ============================================================
  // HERO SLIDER SCRIPT
  // ============================================================
  (function(){
    'use strict';

    // ----- SLIDE DATA -----
    const slidesData = [
      {
        title: 'Ethereal Beauty',
        subtitle: 'Where light dances on velvet petals',
        img: 'hero-slider/bg-slide1.png',
      },
      {
        title: 'Golden Hour',
        subtitle: 'Gilded whispers of the dying sun',
        img: 'hero-slider/bg-slide2.png',
      },
      {
        title: 'Rose Noir',
        subtitle: 'Mystery blooms in shadow and silk',
        img: 'hero-slider/bg-slide3.png',
      },
      {
        title: 'Silent Poetry',
        subtitle: 'A canvas of unspoken verses',
        img: 'hero-slider/bg-slide4.jpg',
      },
      {
        title: 'Eternal Bloom',
        subtitle: 'Beauty that outlasts the seasons',
        img: 'hero-slider/bg-slide5.jpg',
      }
    ];

    // DOM refs
    const container = document.getElementById('slidesContainer');
    const indicatorsContainer = document.getElementById('indicatorsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderWrapper = document.getElementById('heroSliderWrapper');

    let currentSlide = 0;
    let slideInterval = null;
    const intervalTime = 6000;
    let isTransitioning = false;
    let slidesElements = [];

    // Build slides
    function buildSlider() {
      if (!container) return;
      container.innerHTML = '';
      indicatorsContainer.innerHTML = '';
      
      slidesData.forEach((data, idx) => {
        const slide = document.createElement('div');
        slide.className = `slide ${idx === 0 ? 'active' : ''}`;
        slide.setAttribute('data-index', idx);

        const bg = document.createElement('div');
        bg.className = 'slide-bg';
        bg.style.backgroundImage = `url(${data.img})`;
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';

        const overlay = document.createElement('div');
        overlay.className = 'slide-overlay';
        const tint = document.createElement('div');
        tint.className = 'slide-tint';

        const content = document.createElement('div');
        content.className = 'slide-content';
        content.innerHTML = `
          <h2 class="title">${data.title}</h2>
          <p class="subtitle">${data.subtitle}</p>
          <a href="#" class="cta-button" role="button">Explore the collection</a>
        `;

        slide.appendChild(bg);
        slide.appendChild(overlay);
        slide.appendChild(tint);
        slide.appendChild(content);
        container.appendChild(slide);
        slidesElements.push(slide);

        const ind = document.createElement('div');
        ind.className = `indicator ${idx === 0 ? 'active' : ''}`;
        ind.dataset.index = idx;
        ind.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(ind);
      });
    }

    // Go to slide
    function goToSlide(index) {
      if (isTransitioning || index === currentSlide) return;
      if (index < 0) index = slidesData.length - 1;
      if (index >= slidesData.length) index = 0;
      isTransitioning = true;

      const oldIdx = currentSlide;
      const newIdx = index;
      const oldSlide = slidesElements[oldIdx];
      const newSlide = slidesElements[newIdx];
      const oldInd = indicatorsContainer.children[oldIdx];
      const newInd = indicatorsContainer.children[newIdx];

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
          oldSlide.classList.remove('active');
          newSlide.classList.add('active');
          oldInd.classList.remove('active');
          newInd.classList.add('active');
          newSlide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
          currentSlide = newIdx;
          animateText(newSlide);
        }
      });

      newSlide.style.visibility = 'visible';
      newSlide.style.opacity = '1';
      newSlide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      
      tl.to(oldSlide, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        clipPath: 'polygon(20% 0, 80% 0, 80% 100%, 20% 100%)',
        onComplete: () => {
          oldSlide.classList.remove('active');
          oldSlide.style.visibility = 'hidden';
        }
      })
      .to(newSlide, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1,
      }, 0);

      resetAutoPlay();
    }

    // Animate text
    function animateText(slide) {
      const title = slide.querySelector('.title');
      const subtitle = slide.querySelector('.subtitle');
      const cta = slide.querySelector('.cta-button');
      gsap.set([title, subtitle, cta], { opacity: 0, y: 50, clearProps: 'transform' });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
        delay: 0.3,
      });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'back.out(1.2)',
        delay: 0.5,
      });
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'back.out(1.2)',
        delay: 0.7,
      });
    }

    // Auto-play
    function startAutoPlay() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, intervalTime);
    }
    
    function resetAutoPlay() {
      if (slideInterval) clearInterval(slideInterval);
      startAutoPlay();
    }

    // Events
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', () => {
        if (slideInterval) clearInterval(slideInterval);
      });
      sliderWrapper.addEventListener('mouseleave', () => {
        startAutoPlay();
      });
    }

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Parallax
    document.addEventListener('mousemove', (e) => {
      if (!sliderWrapper) return;
      const rect = sliderWrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      const bg = document.querySelector('.slide.active .slide-bg');
      if (bg) {
        bg.style.transform = `scale(1.05) translate(${x * 0.5}px, ${y * 0.5}px)`;
      }
    });

    // Init
    buildSlider();
    
    setTimeout(() => {
      const active = document.querySelector('.slide.active');
      if (active) animateText(active);
    }, 300);

    // Particles
    if (typeof tsParticles !== 'undefined') {
      tsParticles.load('tsparticles', {
        fpsLimit: 60,
        particles: {
          number: { value: 22, density: { enable: true, area: 700 } },
          color: { value: ['#FF69B4', '#FF1493', '#E8C9A0', '#FFF0F5'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.4,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: { min: 4, max: 12 },
            random: true,
            anim: { enable: true, speed: 2, size_min: 2, sync: false }
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: 'top',
            random: true,
            straight: false,
            outModes: 'out',
          },
          wobble: { enable: true, distance: 8, speed: 0.6 },
          rotate: { value: 45, random: true, animation: { enable: true, speed: 2 } }
        },
        background: { color: 'transparent' }
      });
    }

    startAutoPlay();
    window.goToSlide = goToSlide;
  })();

  // ============================================================
  // MASONRY GALLERY
  // ============================================================
  (function() {
    'use strict';

    const artworks = [
      { title: 'Ethereal Bloom', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-1.jpg' },
      { title: 'Golden Hour', year: '2024', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-2.jpg' },
      { title: 'Rose Noir', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-3.jpg' },
      { title: 'Silent Poetry', year: '2024', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-4.jpg' },
      { title: 'Veiled Light', year: '2023', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-5.jpg' },
      { title: 'Mist & Petal', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-6.jpg' },
      { title: 'Golden Echo', year: '2024', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-7.jpg' },
      { title: 'Dreamweaver', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-8.jpg' },
      { title: 'Scarlet Whisper', year: '2024', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-9.jpg' },
      { title: 'Twilight Sonata', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-10.jpg' },
      { title: 'Aether', year: '2023', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-11.jpg' },
      { title: 'Eternal Spring', year: '2025', technique: 'Category: Hyper-realism or Charcoal Drawing', img: 'img-art/art-12.jpg' }
    ];

    const grid = document.getElementById('masonryGrid');
    if (!grid) return;

    function buildGallery() {
      grid.innerHTML = '';
      artworks.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.dataset.index = index;

        const wrap = document.createElement('div');
        wrap.className = 'image-wrap';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.title;
        img.loading = 'lazy';
        wrap.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'glass-overlay';
        overlay.innerHTML = `
          <div class="meta">
            <div class="title">${item.title}</div>
            <div class="details">${item.technique} <span class="dot"></span> ${item.year}</div>
            <div class="view-btn"><i class="fas fa-arrow-right"></i> View</div>
          </div>
        `;

        card.appendChild(wrap);
        card.appendChild(overlay);
        grid.appendChild(card);
      });
    }

    buildGallery();

    const cards = document.querySelectorAll('.artwork-card');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const idx = parseInt(card.dataset.index, 10) || 0;
            const delay = Math.min(idx * 55, 450);
            setTimeout(() => {
              card.classList.add('visible');
            }, delay);
            observer.unobserve(card);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });
      cards.forEach(card => observer.observe(card));
    } else {
      cards.forEach(c => c.classList.add('visible'));
    }

    console.log('✨ Masonry Gallery loaded');
  })();

  // ============================================================
  // ABOUT SECTION
  // ============================================================
  (function() {
    'use strict';

    const section = document.getElementById('aboutSection');
    let isRevealed = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isRevealed) {
          isRevealed = true;
          section.classList.add('visible');
          setTimeout(() => {
            initTypewriter();
          }, 600);
          observer.unobserve(section);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(section);

    let typedInstance = null;
    let bioShown = false;

    function initTypewriter() {
      if (typedInstance || typeof Typed === 'undefined') return;

      const strings = [
        'I paint the invisible.',
        'Color is my language.',
        'Silence speaks through me.'
      ];

      typedInstance = new Typed('#typewriter', {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 35,
        backDelay: 2000,
        startDelay: 200,
        loop: true,
        cursorChar: '|',
        onStringTyped: (index) => {
          if (index === strings.length - 1 && !bioShown) {
            setTimeout(() => {
              bioShown = true;
              document.getElementById('bioText').classList.add('visible');
            }, 1500);
          }
        }
      });
    }

    // Mouse parallax
    const portraitWrapper = document.getElementById('portraitWrapper');
    const heading = document.querySelector('.artist-heading');
    let isParallaxActive = true;

    document.addEventListener('mousemove', (e) => {
      if (!isParallaxActive) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const maxMove = 12;

      if (portraitWrapper) {
        const px = x * maxMove * 0.5;
        const py = y * maxMove * 0.5;
        portraitWrapper.style.transform =
          `translate(${px}px, ${py}px) scale(${section.classList.contains('visible') ? 1 : 0.92})`;
      }
      if (heading) {
        const hx = -x * 6;
        const hy = -y * 4;
        heading.style.transform = `translate(${hx}px, ${hy}px)`;
      }
    });

    document.addEventListener('mouseleave', () => {
      if (portraitWrapper) {
        portraitWrapper.style.transform = `translate(0, 0) scale(${section.classList.contains('visible') ? 1 : 0.92})`;
      }
      if (heading) {
        heading.style.transform = 'translate(0, 0)';
      }
    });

    console.log('✨ About section loaded');
  })();