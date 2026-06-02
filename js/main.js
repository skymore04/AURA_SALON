document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initHighEnergyMotion();
});

function initLenis() {
    const lenis = new Lenis({ 
        lerp: 0.08, // Faster, more energetic scroll response
        smoothWheel: true,
        wheelMultiplier: 1 
    });
    
    function raf(time) { 
        lenis.raf(time); 
        requestAnimationFrame(raf); 
    }
    requestAnimationFrame(raf);
    
    lenis.on('scroll', ScrollTrigger.update);
}

function initHighEnergyMotion() {
    gsap.registerPlugin(ScrollTrigger);

    const energeticEase = "power4.out";

    // 1. Text Reveals (High Energy)
    const splitElements = document.querySelectorAll('[data-split-reveal]');
    splitElements.forEach(el => {
        const split = new SplitType(el, { types: 'lines, words, chars' });
        
        gsap.from(split.chars, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.015,
            ease: energeticEase,
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse" // Reverses on scroll up for continuous energy
            }
        });
    });

    // 2. Fade Up Elements
    const fadeElements = document.querySelectorAll('[data-fade-up]');
    fadeElements.forEach(el => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: energeticEase,
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 3. Image Clip-Path Reveals (Faster, sharper)
    gsap.utils.toArray('.image-reveal').forEach(img => {
        gsap.to(img, { 
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // 4. Intense Parallax for Hero Video
    gsap.utils.toArray('[data-v-parallax]').forEach(el => {
        const speed = el.getAttribute('data-v-parallax') || 20;
        gsap.to(el, {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}
