document.addEventListener('DOMContentLoaded', () => {

    // ─── NAVBAR SCROLL EFFECT ───────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ─── MOBILE MENU ────────────────────────────────────────────────────────
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileClose = document.getElementById('mobileNavClose');

    function openMobileMenu() {
        mobileOverlay.classList.add('open');
        mobileBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileOverlay.classList.remove('open');
        mobileBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileBtn) mobileBtn.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking overlay links
    if (mobileOverlay) {
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ─── SMOOTH SCROLL ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ─── PARTICLES SYSTEM ───────────────────────────────────────────────────
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 20 : 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);
        particle.style.animationDelay = `-${Math.random() * 20}s`;
        particlesContainer.appendChild(particle);
    }

    // ─── SCROLL REVEAL ──────────────────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a row, trigger children animations with faster staggered delay
                if (entry.target.classList.contains('row-reveal')) {
                    const children = entry.target.querySelectorAll('.step-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('active');
                            // Trigger visible class for opacity if needed
                            child.classList.add('visible');
                        }, index * 100); // Faster stagger (100ms)
                    });
                }

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero reveals immediately (they're in viewport on load)
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // ─── ANIMATED COUNTERS ──────────────────────────────────────────────────
    const counters = document.querySelectorAll('.metric-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '+';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = (target > 2 ? prefix : '') + Math.floor(current) + suffix;
        }, 16);
    }

    // ─── FLIP CARDS MOBILE AUTO-SCROLL ──────────────────────────────────────
    const flipCards = document.querySelectorAll('.flip-card');

    if (window.matchMedia('(hover: none)').matches) {
        const flipObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('flipped-active');
                } else {
                    entry.target.classList.remove('flipped-active');
                }
            });
        }, {
            // Trigger when the card is in the middle of the viewport
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.1
        });

        flipCards.forEach(card => flipObserver.observe(card));

        // Fallback: Toggle on click in case observer misses
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped-active');
            });
        });
    }

    // ─── LEAD FORM MAKE WEBHOOK ─────────────────────────────────────────────
    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/ocfah09brrq8gef6ageov2w2dl6mj2do';

    const leadFormMake = document.getElementById('form-servicios-erickddp');
    const formStatusMake = document.getElementById('formStatus');
    const submitBtnMake = leadFormMake ? leadFormMake.querySelector('button[type="submit"]') : null;

    if (leadFormMake && submitBtnMake) {
        leadFormMake.addEventListener('submit', async (e) => {
            e.preventDefault();

            const whatsapp = leadFormMake.whatsapp.value.trim();
            const email = leadFormMake.email.value.trim();

            if (!whatsapp && !email) {
                formStatusMake.textContent = 'Por favor, proporciona al menos un medio de contacto (WhatsApp o Correo)';
                formStatusMake.className = 'form-status error';
                return;
            }

            const originalBtnText = submitBtnMake.textContent;
            submitBtnMake.innerHTML = '<span class="spinner"></span> Enviando...';
            submitBtnMake.disabled = true;
            formStatusMake.textContent = '';
            formStatusMake.className = 'form-status';

            const formData = new FormData(leadFormMake);
            const data = Object.fromEntries(formData.entries());
            data.fecha = new Date().toISOString();
            data.fuente = 'Landing ErickDDP';

            try {
                const response = await fetch(MAKE_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                formStatusMake.innerHTML = '✅ ¡Listo! Datos enviados correctamente. Te contactaré pronto.';
                formStatusMake.classList.add('success');
                submitBtnMake.innerHTML = '✅ ¡Éxito!';
                leadFormMake.reset();

                setTimeout(() => {
                    submitBtnMake.textContent = originalBtnText;
                    submitBtnMake.disabled = false;
                    submitBtnMake.classList.add('btn-pulse');
                }, 4000);

            } catch (error) {
                console.error('Error al enviar formulario a Make:', error);
                formStatusMake.innerHTML = '❌ Error al enviar el formulario. <a href="https://wa.me/525534806184" target="_blank" style="color: #f87171; text-decoration: underline; font-weight: 600;">Escríbeme por WhatsApp →</a>';
                formStatusMake.classList.add('error');
                submitBtnMake.textContent = originalBtnText;
                submitBtnMake.disabled = false;
            }
        });
    }

    // ─── HERO CUMULATIVE PHRASE LOOP ─────────────────────────────────────
    const heroHeader = document.querySelector('.hero');
    const salvationBtn = document.getElementById('hero-cta-main');
    const phrases = document.querySelectorAll('#hero-title .phrase');

    if (phrases.length > 0) {
        let currentPhrase = 0;
        const phraseInterval = 1200; // Speed of lines appearing
        const fullMessageHold = 5000; // Time to stay visible once complete

        function showNextPhrase() {
            if (currentPhrase < phrases.length) {
                phrases[currentPhrase].classList.add('active');
                currentPhrase++;
                setTimeout(showNextPhrase, phraseInterval);
            } else {
                // Once all are shown, wait and then reset
                setTimeout(() => {
                    phrases.forEach(p => p.classList.remove('active'));
                    currentPhrase = 0;
                    // Short pause before starting over
                    setTimeout(showNextPhrase, 1000);
                }, fullMessageHold);
            }
        }

        // Initial delay before first line
        setTimeout(showNextPhrase, 500);
    }

    if (heroHeader && salvationBtn) {
        heroHeader.classList.add('hero-tension-active');

        salvationBtn.addEventListener('mouseenter', () => {
            heroHeader.classList.remove('hero-tension-active');
            heroHeader.style.transition = 'all 0.5s ease';
        });

        salvationBtn.addEventListener('mouseleave', () => {
            heroHeader.classList.add('hero-tension-active');
        });
    }

    // ─── PERSISTENT EMOJI SCROLL REVEAL ─────────────────────────────────────
    const emojiCards = document.querySelectorAll('.emoji-scroll');
    const emojiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('emoji-visible');
            } else {
                // Exit animation when leaving viewport
                entry.target.classList.remove('emoji-visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px' // Slightly earlier trigger
    });

    emojiCards.forEach(card => emojiObserver.observe(card));

});
