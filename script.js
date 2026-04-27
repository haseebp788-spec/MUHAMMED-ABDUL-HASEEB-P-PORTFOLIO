document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Update active class
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                } else {
                    // If it's a button, find corresponding nav link
                    const matchingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                    if (matchingNavLink) {
                        matchingNavLink.classList.add('active');
                    }
                }

                // Scroll to element
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(fBtn => fBtn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Small delay to allow display flex to apply before opacity animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition
                }
            });
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic UI feedback for submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! ✓';
                submitBtn.style.background = '#10b981'; // Success green
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-container, .contact-container, .expertise-card');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });
    
    // --- Typewriter Effect ---
    const titleElement = document.getElementById('typewriter-title');
    const clickHint = document.getElementById('click-hint');
    const text = 'PORTFOLIO';
    let index = 0;

    // Reset title element to ensure it's empty
    if (titleElement) titleElement.textContent = '';

    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        } else {
            // Typing finished
            document.querySelector('.type-cursor').style.display = 'none';
            if (clickHint) clickHint.classList.add('visible');
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);

    // --- Cover Section Click Interaction ---
    const coverContent = document.querySelector('.cover-content');
    if (coverContent) {
        coverContent.style.cursor = 'pointer';
        coverContent.addEventListener('click', () => {
            titleElement.classList.add('clicked');
            
            // Subtle flash effect on body
            document.body.style.backgroundColor = '#111';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 100);

            // Scroll to next section after animation
            setTimeout(() => {
                const nextSection = document.getElementById('intro');
                if (nextSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = nextSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                // Reset title state after scroll
                setTimeout(() => {
                    titleElement.classList.remove('clicked');
                }, 1000);
            }, 600);
        });
    }
});
