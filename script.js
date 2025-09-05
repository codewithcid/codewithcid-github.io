// Modern Interactive Portfolio - Complete JavaScript
class ModernPortfolio {
    constructor() {
        this.isDesktop = window.innerWidth > 768;
        this.observers = new Map();
        this.animations = new Map();
        this.typingTexts = [
            "Full Stack Developer",
            "AI/ML Specialist", 
            "React Enthusiast",
            "Problem Solver",
            "Code Wizard ✨"
        ];
        
        this.init();
    }

    async init() {
        await this.waitForDOM();
        
        // Initialize all components
        this.setupCustomCursor();
        this.setupMagneticEffects();
        this.setupNavigation();
        this.setupHeroAnimations();
        this.setupTypingEffect();
        this.setupScrollAnimations();
        this.setupProjectInteractions();
        this.setupSkillsAnimations();
        this.setupContactAnimations();
        this.setupMobileMenu();
        this.setupPerformanceOptimizations();
        this.setupKeyboardShortcuts();
        this.setupParticleSystem();
        
        console.log('🚀 Modern Portfolio initialized successfully!');
    }

    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    // Custom Cursor System (Desktop Only)
    setupCustomCursor() {
        if (!this.isDesktop) return;
        
        this.cursor = {
            dot: document.querySelector('[data-cursor-dot]'),
            outline: document.querySelector('[data-cursor-outline]'),
            position: { x: 0, y: 0 },
            outlinePosition: { x: 0, y: 0 },
            delay: 8,
            isVisible: true
        };

        if (!this.cursor.dot || !this.cursor.outline) return;

        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.position.x = e.clientX;
            this.cursor.position.y = e.clientY;
            this.cursor.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Mouse states
        document.addEventListener('mousedown', () => {
            this.cursor.dot.style.transform += ' scale(1.5)';
            this.cursor.outline.classList.add('hover');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.dot.style.transform = this.cursor.dot.style.transform.replace(' scale(1.5)', '');
            this.cursor.outline.classList.remove('hover');
        });

        // Hover effects on interactive elements
        const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.outline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.outline.classList.remove('hover');
            });
        });

        // Animate outline following
        this.animateCursor();
    }

    animateCursor() {
        if (!this.isDesktop || !this.cursor.outline) return;

        this.cursor.outlinePosition.x += (this.cursor.position.x - this.cursor.outlinePosition.x) / this.cursor.delay;
        this.cursor.outlinePosition.y += (this.cursor.position.y - this.cursor.outlinePosition.y) / this.cursor.delay;
        
        this.cursor.outline.style.transform = `translate(${this.cursor.outlinePosition.x}px, ${this.cursor.outlinePosition.y}px)`;
        
        requestAnimationFrame(() => this.animateCursor());
    }

    // Magnetic Effects (Desktop Only)
    setupMagneticEffects() {
        if (!this.isDesktop) return;

        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                
                const strength = element.dataset.magnetic || 0.3;
                const moveX = x * strength;
                const moveY = y * strength;
                
                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${moveY * 0.1}deg) rotateY(${moveX * 0.1}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
            });
        });
    }

    // Enhanced Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                this.smoothScrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Active section tracking
        this.setupSectionTracking(navLinks, sections);
        
        // Header scroll effects
        this.setupHeaderEffects();
    }

    smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupSectionTracking(navLinks, sections) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(navLinks, id);
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
        this.observers.set('navigation', observer);
    }

    updateActiveNavLink(navLinks, activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupHeaderEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.pageYOffset;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;
            
            // Add scrolled class
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Hero Section Animations
    setupHeroAnimations() {
        this.animateCounters();
        this.setupFloatingElements();
        this.setupScrollIndicator();
        this.setupTiltEffect();
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target + '+';
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.code-element');
        
        floatingElements.forEach((element, index) => {
            // Add click interactions
            element.addEventListener('click', () => {
                this.triggerElementEffect(element, index);
            });
            
            // Hover effects
            element.addEventListener('mouseenter', () => {
                element.style.animationPlayState = 'paused';
                element.style.transform += ' scale(1.1)';
                element.style.zIndex = '10';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animationPlayState = 'running';
                element.style.transform = element.style.transform.replace(' scale(1.1)', '');
                element.style.zIndex = '';
            });
        });
    }

    triggerElementEffect(element, index) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show contextual message
        this.showFloatingMessage(element, this.getElementMessage(element));
    }

    getElementMessage(element) {
        if (element.classList.contains('terminal-window')) {
            return '✅ Server running smoothly';
        } else if (element.classList.contains('api-response')) {
            return '📡 API responding perfectly';
        } else if (element.classList.contains('git-commit')) {
            return '🔀 Changes committed successfully';
        } else if (element.classList.contains('react-component')) {
            return '⚛️ Component rendered';
        } else {
            return '💻 System operational';
        }
    }

    showFloatingMessage(element, message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: var(--primary);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid var(--primary);
            font-family: var(--font-mono);
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        const rect = element.getBoundingClientRect();
        messageEl.style.left = `${rect.left + rect.width / 2}px`;
        messageEl.style.top = `${rect.top - 50}px`;
        messageEl.style.transform += ' translateX(-50%)';
        
        document.body.appendChild(messageEl);
        
        requestAnimationFrame(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = messageEl.style.transform.replace('translateY(20px)', 'translateY(0)');
        });
        
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform += ' translateY(-20px)';
            setTimeout(() => messageEl.remove(), 300);
        }, 2500);
    }

    setupScrollIndicator() {
        const indicator = document.getElementById('scroll-indicator');
        if (!indicator) return;
        
        indicator.addEventListener('click', () => {
            this.smoothScrollToSection('projects');
        });
        
        // Hide after first scroll
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.pageYOffset > 100) {
                hasScrolled = true;
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            }
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                const rotateX = (mouseY / (rect.height / 2)) * 10;
                const rotateY = (mouseX / (rect.width / 2)) * -10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    // Enhanced Typing Effect
    setupTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        let currentIndex = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        const typeText = () => {
            const currentText = this.typingTexts[currentIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % this.typingTexts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        };
        
        setTimeout(typeText, 1500);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Staggered animation for child elements
                    const children = entry.target.querySelectorAll('.skill-item, .project-card, .contact-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('reveal', observer);
    }

    // Project Interactions
    setupProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, false);
            });
            
            // Click effects
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.project-link')) {
                    this.createProjectRipple(e, card);
                }
            });
        });
    }

    animateProjectCard(card, isEntering) {
        const techBadges = card.querySelectorAll('.tech-badge');
        const featureTags = card.querySelectorAll('.feature-tag');
        const projectNumber = card.querySelector('.project-number');
        
        if (isEntering) {
            techBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'translateY(-3px) scale(1.05)';
                    badge.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.3)';
                }, index * 50);
            });
            
            featureTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 3px 10px rgba(139, 92, 246, 0.3)';
                }, index * 30);
            });
            
            if (projectNumber) {
                projectNumber.style.transform = 'scale(1.1)';
                projectNumber.style.opacity = '0.1';
            }
        } else {
            techBadges.forEach(badge => {
                badge.style.transform = '';
                badge.style.boxShadow = '';
            });
            
            featureTags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
            
            if (projectNumber) {
                projectNumber.style.transform = '';
                projectNumber.style.opacity = '';
            }
        }
    }

    createProjectRipple(e, card) {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-expand 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            card.style.overflow = '';
        }, 800);
    }

    // Skills Animations
    setupSkillsAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        const progressCircles = document.querySelectorAll('.progress-circle');
        
        // Skill item interactions
        skillItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.animateSkillItem(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateSkillItem(item, false);
            });
            
            item.addEventListener('click', () => {
                this.showSkillDetails(item);
            });
            
            // Entrance animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
        
        // Progress circle animations
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressCircle(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressCircles.forEach(circle => {
            progressObserver.observe(circle);
        });
    }

    animateSkillItem(item, isEntering) {
        const icon = item.querySelector('.skill-icon');
        const name = item.querySelector('.skill-name');
        
        if (isEntering) {
            icon.style.transform = 'scale(1.3) rotateY(10deg)';
            name.style.color = 'var(--primary)';
            
            // Create floating particles
            this.createSkillParticles(item);
        } else {
            icon.style.transform = '';
            name.style.color = '';
        }
    }

    createSkillParticles(item) {
        const rect = item.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary);
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                pointer-events: none;
                z-index: 1000;
                animation: particle-float 1s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    animateProgressCircle(circle) {
        const percentage = parseInt(circle.dataset.percentage);
        let currentPercentage = 0;
        
        const animate = () => {
            if (currentPercentage <= percentage) {
                circle.style.background = `conic-gradient(
                    var(--primary) 0deg,
                    var(--primary) ${currentPercentage * 3.6}deg,
                    var(--bg-secondary) ${currentPercentage * 3.6}deg,
                    var(--bg-secondary) 360deg
                )`;
                currentPercentage++;
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    showSkillDetails(item) {
        const skillName = item.querySelector('.skill-name').textContent;
        const skillLevel = item.querySelector('.skill-level').textContent;
        const skillExperience = item.querySelector('.skill-experience')?.textContent || '';
        
        const details = `${skillName} - ${skillLevel} ${skillExperience}`;
        this.showFloatingMessage(item, details);
    }

    // Contact Animations
    setupContactAnimations() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.animateContactCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateContactCard(card, false);
            });
            
            // Entrance animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            card.style.transition = 'all 0.8s ease';
            observer.observe(card);
        });
    }

    animateContactCard(card, isEntering) {
        const icon = card.querySelector('.card-icon');
        const statusDot = card.querySelector('.status-dot');
        const glow = card.querySelector('.card-glow');
        
        if (isEntering) {
            icon.style.transform = 'scale(1.1) rotateZ(5deg)';
            if (statusDot) {
                statusDot.style.animation = 'status-pulse 0.5s infinite';
            }
            if (glow) {
                glow.style.opacity = '1';
            }
            
            // Create connection effect
            this.createConnectionEffect(card);
        } else {
            icon.style.transform = '';
            if (statusDot) {
                statusDot.style.animation = '';
            }
            if (glow) {
                glow.style.opacity = '';
            }
        }
    }

    createConnectionEffect(card) {
        const rect = card.getBoundingClientRect();
        const line = document.createElement('div');
        
        line.style.cssText = `
            position: fixed;
            left: ${rect.right}px;
            top: ${rect.top + rect.height / 2}px;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), transparent);
            z-index: 1000;
            pointer-events: none;
            animation: connection-expand 0.5s ease-out;
        `;
        
        document.body.appendChild(line);
        setTimeout(() => line.remove(), 500);
    }

    // Mobile Menu
    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!menuBtn || !navMenu) return;
        
        this.mobileMenu = {
            isOpen: false,
            toggle: (forceState) => {
                const newState = forceState !== undefined ? forceState : !this.mobileMenu.isOpen;
                this.mobileMenu.isOpen = newState;
                
                if (newState) {
                    navMenu.classList.add('active');
                    menuBtn.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    navMenu.classList.remove('active');
                    menuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        };
        
        menuBtn.addEventListener('click', () => {
            this.mobileMenu.toggle();
        });
        
        // Close on nav link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.toggle(false);
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.mobileMenu.isOpen && !navMenu.contains(e.target) && e.target !== menuBtn) {
                this.mobileMenu.toggle(false);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.isOpen) {
                this.mobileMenu.toggle(false);
            }
        });
    }

    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.toggle(false);
        }
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            const isHidden = document.hidden;
            const animatedElements = document.querySelectorAll('.code-element, .floating-shapes');
            
            animatedElements.forEach(el => {
                el.style.animationPlayState = isHidden ? 'paused' : 'running';
            });
        });
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Preload critical resources
        this.preloadResources();
    }

    preloadResources() {
        const criticalResources = [
            '/styles.css',
            '/fluid.js'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Global shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k': // Ctrl/Cmd + K for navigation
                        e.preventDefault();
                        this.openQuickNavigation();
                        break;
                }
            }
            
            // Section shortcuts
            if (e.altKey) {
                switch (e.key) {
                    case '1':
                        this.smoothScrollToSection('about');
                        break;
                    case '2':
                        this.smoothScrollToSection('projects');
                        break;
                    case '3':
                        this.smoothScrollToSection('skills');
                        break;
                    case '4':
                        this.smoothScrollToSection('contact');
                        break;
                }
            }
        });
    }

    openQuickNavigation() {
        // Create quick navigation overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;
        
        const menu = document.createElement('div');
        menu.innerHTML = `
            <div style="background: var(--bg-card); padding: 2rem; border-radius: 16px; border: 1px solid var(--border-primary);">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem; text-align: center;">Quick Navigation</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <button data-nav="about" style="background: transparent; border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">About</button>
                    <button data-nav="projects" style="background: transparent; border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Projects</button>
                    <button data-nav="skills" style="background: transparent; border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Skills</button>
                    <button data-nav="contact" style="background: transparent; border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Contact</button>
                </div>
            </div>
        `;
        
        overlay.appendChild(menu);
        document.body.appendChild(overlay);
        
        // Handle navigation
        menu.addEventListener('click', (e) => {
            if (e.target.dataset.nav) {
                this.smoothScrollToSection(e.target.dataset.nav);
                overlay.remove();
            }
        });
        
        // Close on outside click or escape
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // Particle System
    setupParticleSystem() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer || !this.isDesktop) return;
        
        this.particles = [];
        this.particleCount = 50;
        
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(particleContainer);
        }
        
        this.animateParticles();
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
        `;
        
        const particleData = {
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3
        };
        
        this.particles.push(particleData);
        container.appendChild(particle);
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary checking
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    // Public API Methods
    scrollToSection(sectionId) {
        this.smoothScrollToSection(sectionId);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-primary);
            backdrop-filter: blur(20px);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        this.animations.forEach(animation => {
            if (animation.cancel) animation.cancel();
        });
        this.animations.clear();
        
        console.log('Portfolio destroyed');
    }
}

// CSS Animations
const additionalStyles = `
@keyframes ripple-expand {
    to {
        transform: translate(-50%, -50%) scale(50);
        opacity: 0;
    }
}

@keyframes particle-float {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-50px) scale(0);
        opacity: 0;
    }
}

@keyframes connection-expand {
    0% {
        width: 0;
        opacity: 1;
    }
    100% {
        width: 100px;
        opacity: 0;
    }
}

.cursor-down {
    transform: scale(0.5) !important;
}

.cursor-outline-down,
.cursor-outline.hover {
    width: 50px !important;
    height: 50px !important;
    border-color: var(--secondary) !important;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize Portfolio
let portfolioInstance;

document.addEventListener('DOMContentLoaded', () => {
    portfolioInstance = new ModernPortfolio();
    window.portfolio = portfolioInstance; // Global access for debugging
});

// Error handling
window.addEventListener('error', (event) => {
    console.warn('⚠️ Error caught:', event.error);
    // Continue execution gracefully
});

console.log('🚀 Modern Interactive Portfolio Script Loaded!');

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernPortfolio };
} else if (typeof define === 'function' && define.amd) {
    define(() => ({ ModernPortfolio }));
}
