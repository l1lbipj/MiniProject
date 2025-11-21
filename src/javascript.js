document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    initHeroCarousel();
    initTestimonials();
    initRevealOnScroll();
    handleCTAForm();
});

function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileMenu || !navMenu) return;

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll('.nav-link').forEach(link =>
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        })
    );

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !mobileMenu.contains(e.target)
        ) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function initHeroCarousel() {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const dotsContainer = document.querySelector('.hero-dots');
    if (!slides.length || !dotsContainer) return;

    slides.forEach((slide) => {
        const bg = slide.dataset.bg;
        if (bg) slide.style.backgroundImage = `url(${bg})`;
    });

    let current = 0;
    let intervalId;

    const goToSlide = (index) => {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    };

    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => {
            goToSlide(idx);
            restartAuto();
        });
        dotsContainer.appendChild(dot);
    });

    dotsContainer.children[0].classList.add('active');

    const startAuto = () => {
        intervalId = setInterval(() => goToSlide(current + 1), 6000);
    };

    const restartAuto = () => {
        clearInterval(intervalId);
        startAuto();
    };

    startAuto();
}

function initTestimonials() {
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    if (!cards.length || !prevBtn || !nextBtn) return;

    let index = 0;

    const setActive = (newIndex) => {
        cards[index].classList.remove('active');
        index = (newIndex + cards.length) % cards.length;
        cards[index].classList.add('active');
    };

    prevBtn.addEventListener('click', () => setActive(index - 1));
    nextBtn.addEventListener('click', () => setActive(index + 1));

    setInterval(() => setActive(index + 1), 8000);
}

function initRevealOnScroll() {
    const sections = document.querySelectorAll('section');
    if (!('IntersectionObserver' in window) || !sections.length) {
        sections.forEach((section) => section.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
}

function handleCTAForm() {
    const form = document.querySelector('.cta-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !emailInput.value.trim()) {
            emailInput?.focus();
            return;
        }
        emailInput.value = '';
        form.classList.add('success');
        form.querySelector('button').textContent = 'Đã đăng ký!';
        setTimeout(() => {
            form.classList.remove('success');
            form.querySelector('button').textContent = 'Đăng ký';
        }, 3000);
    });
}