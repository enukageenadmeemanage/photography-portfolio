document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Demo Modal Logic
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.querySelector('.close-modal');
    const closeBtnPrimary = document.querySelector('.close-modal-btn');
    const demoLinks = document.querySelectorAll('.demo-link');
    const demoForms = document.querySelectorAll('.demo-form');

    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.add('show');
    };

    const closeModal = () => {
        modal.classList.remove('show');
    };

    demoLinks.forEach(link => {
        link.addEventListener('click', openModal);
    });

    demoForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    closeBtnPrimary.addEventListener('click', closeModal);

    // Close when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 4. Horizontal Scroll for Portfolio Gallery on Desktop using Mouse Wheel
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    if (galleryWrapper) {
        galleryWrapper.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                // If scrolling vertically, translate to horizontal scroll
                // Prevent default only if we are actually scrolling horizontally inside the container
                if ((e.deltaY > 0 && galleryWrapper.scrollLeft < galleryWrapper.scrollWidth - galleryWrapper.clientWidth) ||
                    (e.deltaY < 0 && galleryWrapper.scrollLeft > 0)) {
                    e.preventDefault();
                    galleryWrapper.scrollLeft += e.deltaY;
                }
            }
        });
    }

    // 5. Testimonial Slider Controls
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelectorAll('.control-btn')[0];
    const nextBtn = document.querySelectorAll('.control-btn')[1];

    if (testimonialSlider && prevBtn && nextBtn) {
        const scrollAmount = 300 + 32; // card width + gap (approx)

        nextBtn.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state in nav
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if (this.parentElement.classList.contains('nav-links')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // 7. Portfolio Category Filtering
    const categoryBtns = document.querySelectorAll('.categories span');
    const galleryItems = document.querySelectorAll('.gallery-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 8. New Modals Logic (About & Gallery)
    const aboutModal = document.getElementById('about-modal');
    const openAboutBtn = document.getElementById('open-about-btn');
    
    if (openAboutBtn && aboutModal) {
        openAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutModal.classList.add('show');
        });
        
        const closeAboutBtn = aboutModal.querySelector('.close-modal');
        if (closeAboutBtn) {
            closeAboutBtn.addEventListener('click', () => {
                aboutModal.classList.remove('show');
            });
        }
    }

    const galleryModal = document.getElementById('gallery-modal');
    const openGalleryBtn = document.getElementById('open-gallery-btn');
    
    if (openGalleryBtn && galleryModal) {
        openGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            galleryModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
        
        const closeGalleryBtn = galleryModal.querySelector('.close-full-modal');
        if (closeGalleryBtn) {
            closeGalleryBtn.addEventListener('click', () => {
                galleryModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    }

    // Update global click listener to close new modals as well
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('show');
        }
        if (e.target === galleryModal) {
            galleryModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // 9. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (menuToggle && navLinks && hamburger) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            hamburger.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                hamburger.classList.remove('active');
                navbar.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        });
    }
});
