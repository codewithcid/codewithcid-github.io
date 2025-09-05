// Advanced Interactive Portfolio System
class ModernPortfolio {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.animations = new Map();
        this.currentTheme = 'cyber';
        this.mobileBreakpoint = 768;
        this.typingText = [
            'Full Stack Developer',
            'AI/ML Engineer',
            'React Specialist',
            'Problem Solver',
            'Code Wizard ✨'
        ];
        this.currentTypeIndex = 0;
        
        this.init();
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            await this.waitForDOM();
            
            // Initialize all components
            this.setupAdvancedLogo();
            this.setupEnhancedNavigation();
            this.setupHeroAnimations();
            this.setupTypingEffect();
            this.setupProjectInteractions();
            this.setupSkillsSystem();
            this.setupContactAnimations();
            this.setupScrollEffects();
            this.setupMobileMenu();
            this.setupPerformanceOptimizations();
            this.setupAdvancedBackground();
            this.setupKeyboardShortcuts();
            
            this.isInitialized = true;
            console.log('🚀 Modern Portfolio System Initialized!');
        } catch (error) {
            console.error('❌ Portfolio initialization failed:', error);
        }
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

    // Advanced Logo System
    setupAdvancedLogo() {
        const logo = document.getElementById('interactive-logo');
        if (!logo) return;

        const letters = logo.querySelectorAll('.logo-letter');
        let glitchTimeout;
        let effectQueue = [];

        // Letter-by-letter hover effects
        letters.forEach((letter, index) => {
            letter.addEventListener('mouseenter', () => {
                this.triggerLetterEffect(letter, index);
            });
        });

        // Logo click effects
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            this.triggerLogoSequence(letters);
        });

        // Random glitch system
        this.setupRandomGlitch(logo, letters);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.triggerLogoSequence(letters);
            }
        });

        console.log('✨ Advanced logo system activated');
    }

    triggerLetterEffect(letter, index) {
        const effects = ['wave', 'glow', 'rotate', 'scale', 'rainbow'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        letter.classList.add(`effect-${randomEffect}`);
        
        // Create ripple effect to adjacent letters
        const adjacentIndices = [index - 1, index + 1];
        adjacentIndices.forEach((adjIndex, delay) => {
            setTimeout(() => {
                const adjLetter = letter.parentElement.children[adjIndex];
                if (adjLetter && adjLetter.classList.contains('logo-letter')) {
                    adjLetter.style.transform = 'translateY(-3px) scale(1.05)';
                    adjLetter.style.color = 'var(--accent)';
                    
                    setTimeout(() => {
                        adjLetter.style.transform = '';
                        adjLetter.style.color = '';
                    }, 200);
                }
            }, delay * 100);
        });
        
        setTimeout(() => {
            letter.classList.remove(`effect-${randomEffect}`);
        }, 1000);
    }

    triggerLogoSequence(letters) {
        const sequence = [
            { effect: 'matrix-rain', duration: 1000 },
            { effect: 'glitch-wave', duration: 800 },
            { effect: 'rainbow-cascade', duration: 1200 }
        ];
        
        let currentSequence = 0;
        
        const runSequence = () => {
            if (currentSequence >= sequence.length) return;
            
            const current = sequence[currentSequence];
            this.applySequenceEffect(letters, current.effect);
            
            setTimeout(() => {
                currentSequence++;
                runSequence();
            }, current.duration);
        };
        
        runSequence();
        this.createScreenEffect();
    }

    applySequenceEffect(letters, effect) {
        switch (effect) {
            case 'matrix-rain':
                this.matrixRainEffect(letters);
                break;
            case 'glitch-wave':
                this.glitchWaveEffect(letters);
                break;
            case 'rainbow-cascade':
                this.rainbowCascadeEffect(letters);
                break;
        }
    }

    matrixRainEffect(letters) {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.color = '#00ff00';
                letter.style.textShadow = '0 0 20px #00ff00';
                letter.style.transform = 'translateY(-10px)';
                
                // Add binary rain
                this.createBinaryRain(letter);
                
                setTimeout(() => {
                    letter.style.color = '';
                    letter.style.textShadow = '';
                    letter.style.transform = '';
                }, 800);
            }, index * 100);
        });
    }

    createBinaryRain(element) {
        const rect = element.getBoundingClientRect();
        const rain = document.createElement('div');
        
        rain.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.bottom}px;
            color: #00ff00;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            pointer-events: none;
            z-index: 1000;
            animation: binary-fall 1s ease-out forwards;
        `;
        
        rain.textContent = Math.random().toString(2).substr(2, 8);
        document.body.appendChild(rain);
        
        setTimeout(() => rain.remove(), 1000);
    }

    glitchWaveEffect(letters) {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('glitch-active');
                
                setTimeout(() => {
                    letter.classList.remove('glitch-active');
                }, 200);
            }, index * 50);
        });
    }

    rainbowCascadeEffect(letters) {
        const colors = ['#ff0080', '#8000ff', '#0080ff', '#00ff80', '#ff8000'];
        
        letters.forEach((letter, index) => {
            let colorIndex = 0;
            const colorInterval = setInterval(() => {
                letter.style.color = colors[colorIndex];
                letter.style.textShadow = `0 0 20px ${colors[colorIndex]}`;
                colorIndex = (colorIndex + 1) % colors.length;
            }, 100);
            
            setTimeout(() => {
                clearInterval(colorInterval);
                letter.style.color = '';
                letter.style.textShadow = '';
            }, 1000);
        });
    }

    createScreenEffect() {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
            z-index: 9999;
            pointer-events: none;
            animation: screen-flash 0.3s ease-out;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 300);
    }

    setupRandomGlitch(logo, letters) {
        const triggerRandomGlitch = () => {
            if (Math.random() < 0.08) { // 8% chance
                const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                this.triggerLetterEffect(randomLetter, 0);
            }
            
            // Next check in 8-15 seconds
            const nextCheck = 8000 + Math.random() * 7000;
            setTimeout(triggerRandomGlitch, nextCheck);
        };
        
        setTimeout(triggerRandomGlitch, 10000);
    }

    // Enhanced Navigation
    setupEnhancedNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Enhanced smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                this.smoothScrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Advanced active section tracking
        this.setupAdvancedSectionTracking(navLinks, sections);
        
        // Navigation sound effects
        this.setupNavigationSounds(navLinks);
    }

    smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        // Enhanced easing function
        this.smoothScrollTo(targetPosition, 1000);
    }

    smoothScrollTo(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    setupAdvancedSectionTracking(navLinks, sections) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavigation(navLinks, id);
                }
            });
        }, {
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
        this.observers.set('navigation', observer);
    }

    updateActiveNavigation(navLinks, activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
                this.animateActiveLink(link);
            }
        });
    }

    animateActiveLink(link) {
        link.style.transform = 'scale(1.05)';
        setTimeout(() => {
            link.style.transform = '';
        }, 200);
    }

    setupNavigationSounds(navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Visual feedback
                link.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.boxShadow = '';
            });
        });
    }

    // Hero Animations
    setupHeroAnimations() {
        this.setupParallaxEffects();
        this.setupCodeEditorAnimation();
        this.setupFloatingElements();
        this.setupScrollIndicator();
    }

    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            // Parallax for floating elements
            const floatingElements = document.querySelectorAll('.code-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform += ` translateY(${rate * speed}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupCodeEditorAnimation() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0';
                line.style.transform = 'translateX(-20px)';
                line.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, index * 200);
            }, 1000);
        });
    }

    setupFloatingElements() {
        const elements = document.querySelectorAll('.code-element');
        
        elements.forEach(element => {
            element.addEventListener('click', () => {
                this.triggerElementInteraction(element);
            });
            
            element.addEventListener('mouseenter', () => {
                element.style.animationPlayState = 'paused';
                element.style.transform = 'scale(1.1) translateZ(0)';
                element.style.zIndex = '10';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animationPlayState = 'running';
                element.style.transform = '';
                element.style.zIndex = '';
            });
        });
    }

    triggerElementInteraction(element) {
        const elementType = element.className.split(' ')[1];
        
        switch (elementType) {
            case 'terminal-window':
                this.showTerminalOutput(element);
                break;
            case 'code-snippet':
                this.expandCodeSnippet(element);
                break;
            case 'git-badge':
                this.showGitAction(element);
                break;
            case 'api-call':
                this.simulateAPICall(element);
                break;
            default:
                this.createGenericEffect(element);
        }
    }

    showTerminalOutput(element) {
        const outputs = [
            '✅ Server started on port 3000',
            '🚀 Build completed successfully',
            '📦 Dependencies installed',
            '🔥 Hot reload enabled',
            '✨ Ready to code!'
        ];
        
        const output = outputs[Math.floor(Math.random() * outputs.length)];
        this.showFloatingMessage(element, output, 'success');
    }

    showFloatingMessage(element, message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-primary);
            backdrop-filter: blur(20px);
            z-index: 1000;
            pointer-events: none;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        
        const rect = element.getBoundingClientRect();
        messageElement.style.left = `${rect.left}px`;
        messageElement.style.top = `${rect.top - 60}px`;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(-20px)';
            setTimeout(() => messageElement.remove(), 300);
        }, 3000);
    }

    setupScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;
        
        indicator.addEventListener('click', () => {
            this.smoothScrollToSection('projects');
        });
        
        // Hide indicator after first scroll
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.pageYOffset > 100) {
                hasScrolled = true;
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            }
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
            const currentText = this.typingText[currentIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % this.typingText.length;
                typeSpeed = 500; // Pause before starting new text
            }
            
            setTimeout(typeText, typeSpeed);
        };
        
        // Start typing after a delay
        setTimeout(typeText, 2000);
    }

    // Project Interactions
    setupProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            this.enhanceProjectCard(card, index);
        });
        
        // Setup project filters (if needed)
        this.setupProjectFilters();
    }

    enhanceProjectCard(card, index) {
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            this.animateProjectEntry(card);
        });
        
        card.addEventListener('mouseleave', () => {
            this.animateProjectExit(card);
        });
        
        // Click ripple effect
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-link')) {
                this.createAdvancedRipple(e, card);
            }
        });
        
        // Intersection observer for entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    }

    animateProjectEntry(card) {
        const techItems = card.querySelectorAll('.tech-item');
        const featureTags = card.querySelectorAll('.feature-tag');
        
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
                item.style.background = 'rgba(0, 212, 255, 0.2)';
            }, index * 100);
        });
        
        featureTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-2px)';
                tag.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
            }, index * 50);
        });
    }

    animateProjectExit(card) {
        const techItems = card.querySelectorAll('.tech-item');
        const featureTags = card.querySelectorAll('.feature-tag');
        
        techItems.forEach(item => {
            item.style.transform = '';
            item.style.background = '';
        });
        
        featureTags.forEach(tag => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
    }

    createAdvancedRipple(e, card) {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        const size = Math.max(rect.width, rect.height) * 1.5;
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
            animation: advanced-ripple 0.8s ease-out;
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

    setupProjectFilters() {
        // Implementation for project filtering if needed
        console.log('Project filters ready');
    }

    // Skills System
    setupSkillsSystem() {
        const skillItems = document.querySelectorAll('.skill-item');
        const categories = document.querySelectorAll('.skill-category');
        
        // Animate skill items on scroll
        skillItems.forEach((item, index) => {
            this.setupSkillItemAnimation(item, index);
        });
        
        // Category animations
        categories.forEach(category => {
            this.setupCategoryAnimation(category);
        });
        
        // Progress bar animations
        this.setupProgressAnimations();
    }

    setupSkillItemAnimation(item, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
        
        // Enhanced interactions
        item.addEventListener('click', () => {
            this.showSkillDetails(item);
        });
        
        item.addEventListener('mouseenter', () => {
            this.animateSkillHover(item);
        });
        
        item.addEventListener('mouseleave', () => {
            this.resetSkillHover(item);
        });
    }

    showSkillDetails(item) {
        const skillName = item.querySelector('.skill-name').textContent;
        const skillLevel = item.querySelector('.skill-level').textContent;
        
        const details = this.getSkillDetails(skillName);
        this.showFloatingMessage(item, `${skillName}: ${details}`, 'info');
    }

    getSkillDetails(skillName) {
        const skillData = {
            'React': '3+ years experience, Hooks, Context, Redux',
            'Node.js': 'Express, MongoDB, RESTful APIs, Microservices',
            'Python': 'Django, FastAPI, ML libraries, Data Analysis',
            'TypeScript': 'Strong typing, Advanced patterns, React integration',
            'AI/ML': 'TensorFlow, PyTorch, Computer Vision, NLP',
            'Docker': 'Containerization, Orchestration, CI/CD',
            'Git': 'Advanced workflows, Branch management, Team collaboration',
            'JavaScript': 'ES6+, Async/Await, Modern frameworks'
        };
        
        return skillData[skillName] || 'Passionate about this technology!';
    }

    animateSkillHover(item) {
        const icon = item.querySelector('.skill-icon');
        const name = item.querySelector('.skill-name');
        
        icon.style.transform = 'scale(1.3) rotate(5deg)';
        name.style.color = 'var(--primary)';
        item.style.background = 'rgba(0, 212, 255, 0.1)';
        
        // Create floating particles
        this.createSkillParticles(item);
    }

    resetSkillHover(item) {
        const icon = item.querySelector('.skill-icon');
        const name = item.querySelector('.skill-name');
        
        icon.style.transform = '';
        name.style.color = '';
        item.style.background = '';
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

    setupCategoryAnimation(category) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(category);
    }

    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.animation = 'progress-fill 2s ease-out';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Contact Animations
    setupContactAnimations() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.animateContactCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetContactCard(card);
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
            }, { threshold: 0.5 });
            
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    animateContactCard(card) {
        const icon = card.querySelector('.card-icon');
        const statusDot = card.querySelector('.status-dot');
        
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        if (statusDot) {
            statusDot.style.animation = 'status-pulse 0.5s infinite';
        }
        
        // Create connection lines effect
        this.createConnectionEffect(card);
    }

    resetContactCard(card) {
        const icon = card.querySelector('.card-icon');
        const statusDot = card.querySelector('.status-dot');
        
        icon.style.transform = '';
        if (statusDot) {
            statusDot.style.animation = '';
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

    // Advanced Background
    setupAdvancedBackground() {
        this.createMatrixEffect();
        this.createNeuralNetwork();
        this.setupBackgroundInteractivity();
    }

    createMatrixEffect() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;
        
        const characters = '01';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position
