document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');

    // Helper to move to a slide
    const updateSlidePosition = (index) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        // Update active class
        const currentSlide = track.querySelector('.current-slide');
        if (currentSlide) currentSlide.classList.remove('current-slide');
        slides[index].classList.add('current-slide');
    };

    // Find current index
    const getCurrentIndex = () => {
        const currentSlide = track.querySelector('.current-slide');
        return slides.indexOf(currentSlide);
    };

    // Next Button Click
    nextButton.addEventListener('click', () => {
        const index = getCurrentIndex();
        const nextIndex = index === slides.length - 1 ? 0 : index + 1;
        updateSlidePosition(nextIndex);
    });

    // Prev Button Click
    prevButton.addEventListener('click', () => {
        const index = getCurrentIndex();
        const prevIndex = index === 0 ? slides.length - 1 : index - 1;
        updateSlidePosition(prevIndex);
    });

    // Auto-Play
    let autoPlayInterval = setInterval(() => {
        nextButton.click();
    }, 4000);

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            nextButton.click();
        }, 4000);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        const index = getCurrentIndex();
        // Recalculate position instantly
        track.style.transition = 'none';
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
});
