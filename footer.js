(function() {
            'use strict';

            // ---------- THEME TOGGLE (demo) ----------
            const themeToggle = document.createElement('button');
            themeToggle.className = 'demo-theme-toggle';
            themeToggle.setAttribute('aria-label', 'Toggle theme');
            themeToggle.style.cssText = `
                position: fixed; top: 20px; left: 20px; z-index: 9999;
                background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid var(--glass-border); border-radius: 60px;
                padding: 6px 18px; font-family: 'Inter', sans-serif;
                font-weight: 600; font-size: 0.7rem; color: var(--text-primary);
                cursor: pointer; transition: 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                display: flex; align-items: center; gap: 8px;
            `;
            themeToggle.innerHTML = `<i class="fas fa-moon" id="demoThemeIcon"></i> <span id="demoThemeLabel">DAY</span>`;
            document.body.prepend(themeToggle);

            const themeIcon = themeToggle.querySelector('#demoThemeIcon');
            const themeLabel = themeToggle.querySelector('#demoThemeLabel');

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
            }

            // load saved
            const saved = localStorage.getItem('footerTheme');
            if (saved) setTheme(saved);

            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                if (current === 'dark') {
                    setTheme('light');
                    localStorage.setItem('footerTheme', 'light');
                } else {
                    setTheme('dark');
                    localStorage.setItem('footerTheme', 'dark');
                }
            });

            // ---------- BACK TO TOP ----------
            const backBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backBtn.classList.add('visible');
                } else {
                    backBtn.classList.remove('visible');
                }
            });
            backBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // ---------- NEWSLETTER (simple demo) ----------
            const form = document.getElementById('newsletterForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = form.querySelector('input[type="email"]');
                    if (input.value.trim()) {
                        alert('✨ Thank you for joining the Inner Circle!');
                        input.value = '';
                    } else {
                        input.focus();
                        input.style.borderColor = '#e74c3c';
                        setTimeout(() => { input.style.borderColor = ''; }, 1000);
                    }
                });
            }

            // ---------- PARTICLES (gold / pink) ----------
            if (typeof tsParticles !== 'undefined') {
                tsParticles.load('footer-particles', {
                    fpsLimit: 40,
                    particles: {
                        number: { value: 18, density: { enable: true, area: 900 } },
                        color: { value: ['#E8C9A0', '#FF69B4', '#FF1493'] },
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
                        wobble: { enable: true, distance: 6, speed: 0.6 },
                        rotate: { value: 45, random: true, animation: { enable: true, speed: 2 } }
                    },
                    background: { color: 'transparent' }
                });
            }

            // ---------- SCROLL REVEAL (stagger) ----------
            const section = document.getElementById('footerSection');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cols = document.querySelectorAll('.footer-col-1, .footer-col-2, .footer-col-3');
                        cols.forEach((col, i) => {
                            col.style.opacity = '0';
                            col.style.transform = 'translateY(30px)';
                            setTimeout(() => {
                                col.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                                col.style.opacity = '1';
                                col.style.transform = 'translateY(0)';
                            }, 120 + i * 140);
                        });
                        observer.unobserve(section);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
            observer.observe(section);

            // small initial stagger for first load
            setTimeout(() => {
                const cols = document.querySelectorAll('.footer-col-1, .footer-col-2, .footer-col-3');
                cols.forEach((col, i) => {
                    if (!col.style.opacity || col.style.opacity === '0') {
                        col.style.opacity = '0';
                        col.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            col.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                            col.style.opacity = '1';
                            col.style.transform = 'translateY(0)';
                        }, 200 + i * 140);
                    }
                });
            }, 400);

            console.log('✨ Museum Footer · Hana Yeganeh');
        })();