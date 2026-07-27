 (function() {
      'use strict';

      // ----- DOM refs -----
      const tabBar = document.getElementById('stickyTabBar');
      const tabs = document.querySelectorAll('.tab-item');
      const themeToggle = document.getElementById('themeToggleDemo');
      const themeIcon = document.getElementById('themeIconDemo');
      const themeLabel = document.getElementById('themeLabelDemo');

      // ----- 1. THEME TOGGLE -----
      function setTheme(theme) {
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          themeIcon.className = 'fas fa-sun';
          themeLabel.textContent = 'NIGHT';
        } else {
          document.documentElement.removeAttribute('data-theme');
          themeIcon.className = 'fas fa-moon';
          themeLabel.textContent = 'DAY';
        }
        localStorage.setItem('tabBarTheme', theme);
      }

      const stored = localStorage.getItem('tabBarTheme') || 'light';
      setTheme(stored);

      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });

      // ----- 2. ACTIVE TAB (based on current page URL) -----
      function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().split('?')[0] || 'index.html';
        return page;
      }

      function setActiveTabByPage() {
        const currentPage = getCurrentPage();
        tabs.forEach(tab => {
          const href = tab.getAttribute('href');
          const isActive = href === currentPage || 
                          (currentPage === 'index.html' && href === 'index.html') ||
                          (currentPage === '' && href === 'index.html');
          tab.classList.toggle('active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      setActiveTabByPage();

      // ----- 3. CLICK: navigation + cinematic effects -----
      tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
          // Let the link work normally

          // ---- PRESS FEEDBACK ----
          this.classList.remove('pressed');
          void this.offsetWidth;
          this.classList.add('pressed');

          // ---- RIPPLE EFFECT (modern, soft) ----
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 0.4;
          const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
          const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
          const ripple = document.createElement('span');
          ripple.className = 'ripple';
          ripple.style.width = size + 'px';
          ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          this.style.position = 'relative';
          this.style.overflow = 'visible';
          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);

          // ---- PARTICLE BURST (minimal gold) ----
          const iconEl = this.querySelector('i');
          const iconRect = iconEl?.getBoundingClientRect();
          if (iconRect) {
            const cx = iconRect.left + iconRect.width / 2;
            const cy = iconRect.top + iconRect.height / 2;
            const colors = ['#E8C9A0', '#FF4785', '#FF6B9D', '#d4b08a'];
            const count = 6;
            for (let i = 0; i < count; i++) {
              const particle = document.createElement('span');
              const isDiamond = i % 2 === 0;
              particle.className = 'particle' + (isDiamond ? ' diamond' : '');
              const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
              const distance = 30 + Math.random() * 40;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance - 20;
              particle.style.setProperty('--tx', tx + 'px');
              particle.style.setProperty('--ty', ty + 'px');
              particle.style.left = cx + 'px';
              particle.style.top = cy + 'px';
              particle.style.transform = 'translate(-50%, -50%)';
              particle.style.width = (isDiamond ? 6 : 4 + Math.random() * 4) + 'px';
              particle.style.height = (isDiamond ? 6 : 4 + Math.random() * 4) + 'px';
              particle.style.background = colors[Math.floor(Math.random() * colors.length)];
              particle.style.boxShadow = '0 0 10px rgba(232,201,160,0.2)';
              document.body.appendChild(particle);
              setTimeout(() => particle.remove(), 700);
            }
          }

          setTimeout(() => this.classList.remove('pressed'), 300);
        });

        // keyboard support
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tab.click();
          }
        });
      });

      // ----- 4. SMART HIDE/SHOW (like iPhone) -----
      let lastScrollY = window.scrollY;
      let ticking = false;
      const threshold = 50;

      function handleScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (Math.abs(delta) > threshold) {
              if (delta > 0 && currentScrollY > 150) {
                tabBar.classList.add('hidden');
              } else if (delta < 0) {
                tabBar.classList.remove('hidden');
              }
            }
            if (currentScrollY < 80) {
              tabBar.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true });

      // ----- 5. ENTRANCE ANIMATION (stagger) -----
      tabs.forEach((tab, i) => {
        tab.style.opacity = '0';
        tab.style.transform = 'translateY(30px) scale(0.92)';
        setTimeout(() => {
          tab.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
          tab.style.opacity = '1';
          tab.style.transform = 'translateY(0) scale(1)';
        }, 100 + i * 60);
      });

      // ----- 6. orientation change -----
      window.addEventListener('orientationchange', () => {
        setTimeout(() => tabBar.classList.remove('hidden'), 400);
      });

      console.log('🔥 MODERN TAB BAR · Soft corners · Phosphor icons');
    })();
