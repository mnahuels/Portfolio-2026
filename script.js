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

    // Optional: Auto-play slider (uncomment if desired)
    // setInterval(nextSlide, 5000);
});
