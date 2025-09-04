// --- PORTFOLIO SCRIPT ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- SMOOTH SCROLL ---
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // --- FADE-IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    // --- FLUID CONTROLS ---
    function addFluidControls() {
        // Wait a bit for fluid simulation to initialize
        setTimeout(() => {
            if (window.fluidSimulation) {
                const controlPanel = document.createElement('div');
                controlPanel.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 100;
                    display: flex;
                    gap: 10px;
                `;
                
                const pauseBtn = document.createElement('button');
                pauseBtn.textContent = '⏸️';
                pauseBtn.style.cssText = `
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 16px;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                `;
                pauseBtn.onmouseover = () => pauseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                pauseBtn.onmouseout = () => pauseBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                pauseBtn.onclick = () => {
                    const isPaused = window.fluidSimulation.togglePause();
                    pauseBtn.textContent = isPaused ? '▶️' : '⏸️';
                };
                
                const colorBtn = document.createElement('button');
                colorBtn.textContent = '🎨';
                colorBtn.style.cssText = pauseBtn.style.cssText;
                colorBtn.onmouseover = () => colorBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                colorBtn.onmouseout = () => colorBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                colorBtn.onclick = () => {
                    const mode = window.fluidSimulation.changeColorMode();
                    const modes = ['💙', '🌈', '💜'];
                    colorBtn.textContent = modes[mode] || '🎨';
                };
                
                const resetBtn = document.createElement('button');
                resetBtn.textContent = '🔄';
                resetBtn.style.cssText = pauseBtn.style.cssText;
                resetBtn.onmouseover = () => resetBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                resetBtn.onmouseout = () => resetBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                resetBtn.onclick = () => {
                    window.fluidSimulation.reset();
                    // Brief animation
                    resetBtn.style.transform = 'rotate(360deg)';
                    setTimeout(() => resetBtn.style.transform = 'rotate(0deg)', 300);
                };
                
                controlPanel.appendChild(pauseBtn);
                controlPanel.appendChild(colorBtn);
                controlPanel.appendChild(resetBtn);
                document.body.appendChild(controlPanel);
                
                console.log('Fluid simulation controls added!');
            } else {
                console.log('Fluid simulation not found, retrying...');
                // Retry after another second
                setTimeout(addFluidControls, 1000);
            }
        }, 500);
    }
    
    // Initialize fluid controls
    addFluidControls();
    
    // --- ADDITIONAL PORTFOLIO FEATURES ---
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to the main heading (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Optional: Add typing effect to main heading
    const mainHeading = document.querySelector('#about h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        // Uncomment the line below if you want typing effect
        // typeWriter(mainHeading, originalText, 80);
    }
    
    console.log('Portfolio script loaded successfully!');
});