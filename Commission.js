 (function() {
    'use strict';

    // ----- SCROLL REVEAL (Intersection Observer) -----
    const section = document.getElementById('commissionSection');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    observer.observe(section);

    // ----- PARTICLES (minimal, matching header) -----
    if (typeof tsParticles !== 'undefined') {
      tsParticles.load('commission-particles', {
        fpsLimit: 40,
        particles: {
          number: { value: 30, density: { enable: true, area: 800 } },
          color: { value: ['#FF69B4', '#E8C9A0', '#FF1493'] },
          shape: { type: 'circle' },
          opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.05 } },
          size: { value: { min: 3, max: 10 }, random: true },
          move: { enable: true, speed: 0.3, direction: 'top', random: true, outModes: 'out' },
          wobble: { enable: true, distance: 6, speed: 0.4 }
        },
        background: { color: 'transparent' }
      });
    }

    // ----- CAROUSEL (vertical-like fade) -----
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('#carouselDots span');
    let current = 0;
    let carouselInterval;

    function goToSlide(index) {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }
    function nextSlide() { goToSlide((current + 1) % slides.length); }
    dots.forEach(d => d.addEventListener('click', function() { goToSlide(parseInt(this.dataset.index)); resetCarousel(); }));

    function startCarousel() { carouselInterval = setInterval(nextSlide, 5000); }
    function resetCarousel() { clearInterval(carouselInterval); startCarousel(); }
    startCarousel();

    // pause on hover
    const carouselEl = document.getElementById('carousel');
    carouselEl.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselEl.addEventListener('mouseleave', startCarousel);

    // ----- FORM PROGRESS -----
    const form = document.getElementById('commissionForm');
    const progressFill = document.getElementById('formProgress');
    const inputs = form.querySelectorAll('input, select, textarea');
    function updateProgress() {
      let filled = 0;
      inputs.forEach(inp => {
        if (inp.type === 'radio') {
          const group = document.querySelectorAll(`input[name="${inp.name}"]`);
          if ([...group].some(r => r.checked)) filled += 0.5;
        } else if (inp.value && inp.value.trim() !== '') filled += 1;
        else if (inp.type === 'file' && inp.files.length > 0) filled += 1;
      });
      const total = inputs.length; 
      const pct = Math.min(100, (filled / total) * 100);
      progressFill.style.width = pct + '%';
    }
    inputs.forEach(inp => inp.addEventListener('change', updateProgress));
    updateProgress();

    // ----- FILE UPLOAD (drag & drop) -----
    const dropZone = document.getElementById('fileDrop');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = '#FF69B4'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = ''; });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = '';
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        filePreview.textContent = '📎 ' + e.dataTransfer.files[0].name;
        updateProgress();
      }
    });
    fileInput.addEventListener('change', function() {
      if (this.files.length) filePreview.textContent = '📎 ' + this.files[0].name;
      updateProgress();
    });

    // ----- FORM SUBMISSION (simulated) -----
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // basic validation
      let valid = true;
      const name = document.getElementById('fullName');
      const email = document.getElementById('email');
      if (!name.value.trim()) { name.classList.add('error'); valid = false; } else name.classList.remove('error');
      if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; } else email.classList.remove('error');
      if (!valid) return;

      submitBtn.classList.add('loading');
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        successModal.classList.add('open');
        // reset form
        form.reset();
        filePreview.textContent = '';
        updateProgress();
        document.querySelectorAll('.form-control').forEach(c => c.classList.remove('error'));
      }, 1800);
    });

    window.closeSuccess = function() { successModal.classList.remove('open'); };

    // ----- INPUT GLOW / ERROR CLEAR -----
    document.querySelectorAll('.form-control').forEach(inp => {
      inp.addEventListener('input', function() { this.classList.remove('error'); });
    });

  })();