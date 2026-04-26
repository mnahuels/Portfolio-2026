document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle Logic ----
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';

        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
        localStorage.setItem('theme', theme);
    });

    // ---- Slider Logic ----
    const sliderWrapper = document.getElementById('edu-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        // Move the wrapper
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', previousSlide);

    // Event Listeners for Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // ---- Scroll Animations ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-bar');
    animateElements.forEach(el => observer.observe(el));

    // ---- Welcome Modal Logic ----
    const welcomeModal = document.getElementById('welcome-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (welcomeModal && closeModalBtn) {
        setTimeout(() => {
            welcomeModal.classList.add('show');
        }, 800);

        closeModalBtn.addEventListener('click', () => {
            welcomeModal.classList.remove('show');
        });
    }
    // ---- Mostrar mas / menos habilidades ----
    const btnVerMasSkills = document.getElementById('btn-ver-mas-skills');
    const btnVerMenosSkills = document.getElementById('btn-ver-menos-skills');
    const hiddenSkills = Array.from(document.querySelectorAll('.hidden-skill'));
    const PASO_MAS = 6;
    const PASO_MENOS = 3;
    let visiblesActuales = 0;

    if (btnVerMasSkills && btnVerMenosSkills && hiddenSkills.length > 0) {

        // --- Ver MÁS: muestra de a 6 ---
        btnVerMasSkills.addEventListener('click', () => {
            const siguiente = Math.min(visiblesActuales + PASO_MAS, hiddenSkills.length);
            const lote = hiddenSkills.slice(visiblesActuales, siguiente);

            lote.forEach(skill => {
                skill.style.display = 'flex';
                observer.observe(skill);
            });

            visiblesActuales = siguiente;

            // Mostrar "Ver menos" en cuanto haya al menos 1 skill expandido
            btnVerMenosSkills.style.display = 'inline-flex';

            // Ocultar "Ver más" solo si ya no quedan más por mostrar
            if (visiblesActuales >= hiddenSkills.length) {
                btnVerMasSkills.style.display = 'none';
            }
        });

        // --- Ver MENOS: oculta de a 3 con animación de fade-out ---
        btnVerMenosSkills.addEventListener('click', () => {
            const inicio = Math.max(visiblesActuales - PASO_MENOS, 0);
            const lote = hiddenSkills.slice(inicio, visiblesActuales);

            // Aplicar fade-out animado
            lote.forEach(skill => {
                skill.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                skill.style.opacity = '0';
                skill.style.transform = 'translateY(20px)';
            });

            // Después de la animación, ocultar de verdad
            setTimeout(() => {
                lote.forEach(skill => {
                    skill.style.display = 'none';
                    skill.classList.remove('visible');
                    skill.style.opacity = '';
                    skill.style.transform = '';
                    skill.style.transition = '';
                });

                visiblesActuales = inicio;

                // Restaurar "Ver más" si estaba oculto
                btnVerMasSkills.style.display = 'inline-flex';

                // Si ya no quedan skills expandidos, ocultar "Ver menos" y hacer scroll suave
                if (visiblesActuales <= 0) {
                    btnVerMenosSkills.style.display = 'none';

                    // Scroll suave al inicio de habilidades
                    const seccionHabilidades = document.getElementById('habilidades');
                    if (seccionHabilidades) {
                        seccionHabilidades.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }, 370);
        });
    }
});
