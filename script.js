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

    // ---- Projects Slider Logic ----
    const projSliderWrapper = document.getElementById('proj-slider');
    const projSlides = projSliderWrapper ? projSliderWrapper.querySelectorAll('.slide') : [];
    const projPrevBtn = document.getElementById('proj-prev');
    const projNextBtn = document.getElementById('proj-next');
    const projDots = document.querySelectorAll('#proj-dots .dot');

    let currentProjSlide = 0;
    const totalProjSlides = projSlides.length;

    function updateProjSlider() {
        projSliderWrapper.style.transform = `translateX(-${currentProjSlide * 100}%)`;
        projDots.forEach(dot => dot.classList.remove('active'));
        if (projDots[currentProjSlide]) projDots[currentProjSlide].classList.add('active');
    }

    function nextProjSlide() {
        currentProjSlide = (currentProjSlide + 1) % totalProjSlides;
        updateProjSlider();
    }

    function prevProjSlide() {
        currentProjSlide = (currentProjSlide - 1 + totalProjSlides) % totalProjSlides;
        updateProjSlider();
    }

    if (projPrevBtn && projNextBtn) {
        projNextBtn.addEventListener('click', nextProjSlide);
        projPrevBtn.addEventListener('click', prevProjSlide);
    }

    projDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentProjSlide = index;
            updateProjSlider();
        });
    });

    // Auto-advance projects slider every 6 seconds
    let projAutoPlay = setInterval(nextProjSlide, 6000);
    const projSliderContainer = document.querySelector('.projects-slider-container');
    if (projSliderContainer) {
        projSliderContainer.addEventListener('mouseenter', () => clearInterval(projAutoPlay));
        projSliderContainer.addEventListener('mouseleave', () => {
            projAutoPlay = setInterval(nextProjSlide, 6000);
        });
    }

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
