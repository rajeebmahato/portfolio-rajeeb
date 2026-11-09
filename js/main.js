/* ============================================================
   Rajeeb Kumar Mahato — Portfolio JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ──────────────────────────────────────────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.add('page-loaded');
        }, 800);
    });
    // Fallback: hide preloader after 3 seconds no matter what
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.add('page-loaded');
    }, 3000);

    // ── Particles (Hero Background) ───────────────────────────
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = Math.random() * 4 + 1 + 'px';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = Math.random() * 6 + 8 + 's';
            particleContainer.appendChild(particle);
        }
    }

    // ── Navbar scroll behaviour ───────────────────────────────
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        navbar.classList.toggle('scrolled', currentScroll > 50);

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;

        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('visible', currentScroll > 500);
        }
    });

    // ── Mobile menu toggle ────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link, .btn-resume').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ── Smooth scrolling ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link on scroll (Scroll Spy) ────────────────
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ── Intersection Observer for scroll animations ───────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate skill bars when they come into view
                if (entry.target.closest('.skills-section')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .animate-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // ── Skill bar animation ───────────────────────────────────
    function animateSkillBars(container) {
        const bars = container.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    }

    // ── Typing effect for hero ────────────────────────────────
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                tagline.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            }
        }
        // Start typing after initial animations
        setTimeout(typeWriter, 1500);
    }

    // ── Counter animation for stats ───────────────────────────
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ── Tilt effect on cards (desktop only) ───────────────────
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.querySelectorAll('.info-card, .education-card, .contact-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // ── Data flow animation (project section) ─────────────────
    const flowNodes = document.querySelectorAll('.flow-node');
    const flowArrows = document.querySelectorAll('.flow-arrow');

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                flowNodes.forEach((node, i) => {
                    setTimeout(() => {
                        node.classList.add('animate');
                    }, i * 400);
                });
                flowArrows.forEach((arrow, i) => {
                    setTimeout(() => {
                        arrow.classList.add('animate');
                    }, i * 400 + 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const projectVisual = document.querySelector('.project-visual');
    if (projectVisual) {
        projectObserver.observe(projectVisual);
    }

    // ── Cursor glow effect ────────────────────────────────────
    if (window.matchMedia('(min-width: 768px)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

});
