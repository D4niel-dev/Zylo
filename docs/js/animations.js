document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-card, .section-title, .cta-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add class for visible state in CSS (dynamic injection for simplicity)
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // 3D Tilt Effect for Hero Mockup
    const tiltElement = document.querySelector('.tilt-element');
    const heroSection = document.querySelector('.hero-section');

    if (tiltElement && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = tiltElement.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 25; // Sensitivity
            const y = (e.clientY - top - height / 2) / 25;

            tiltElement.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            tiltElement.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }
});

    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); 
    }

