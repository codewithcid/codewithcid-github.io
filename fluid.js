class FluidSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId) || this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.particles = [];
        this.mouse = { x: 0, y: 0, pressed: false };
        this.colorMode = 0;
        this.paused = false;
        this.animationId = null;
        
        this.initParticles();
        this.bindEvents();
        this.start();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'fluidCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        return canvas;
    }
    
    initParticles() {
        this.particles = [];
        const particleCount = Math.min(150, Math.floor(this.width * this.height / 8000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random() * 100 + 100,
                maxLife: 200,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 360
            });
        }
    }
    
    bindEvents() {
        const handleMouseMove = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        };
        
        const handleMouseDown = () => this.mouse.pressed = true;
        const handleMouseUp = () => this.mouse.pressed = false;
        
        const handleResize = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.initParticles();
        };
        
        // Touch events for mobile
        const handleTouchMove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
            this.mouse.pressed = true;
        };
        
        const handleTouchEnd = () => {
            this.mouse.pressed = false;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        
        // Store references for cleanup
        this.eventListeners = {
            mousemove: handleMouseMove,
            mousedown: handleMouseDown,
            mouseup: handleMouseUp,
            resize: handleResize,
            touchmove: handleTouchMove,
            touchend: handleTouchEnd
        };
    }
    
    updateParticles() {
        if (this.paused) return;
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance && distance > 0) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                const strength = this.mouse.pressed ? 8 : 4;
                
                p.vx += Math.cos(angle) * force * strength;
                p.vy += Math.sin(angle) * force * strength;
                
                // Rejuvenate particle on interaction
                p.life = Math.min(p.maxLife, p.life + force * 20);
            }
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Add some fluid-like behavior
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.vy += 0.02; // Slight gravity
            
            // Boundary collision with bounce
            if (p.x < 0 || p.x > this.width) {
                p.vx *= -0.8;
                p.x = Math.max(0, Math.min(this.width, p.x));
            }
            if (p.y < 0 || p.y > this.height) {
                p.vy *= -0.8;
                p.y = Math.max(0, Math.min(this.height, p.y));
            }
            
            // Update life
            p.life--;
            
            // Remove dead particles and add new ones
            if (p.life <= 0) {
                this.particles[i] = {
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: Math.random() * 100 + 100,
                    maxLife: 200,
                    size: Math.random() * 3 + 1,
                    hue: Math.random() * 360
                };
            }
        }
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.3;
                    this.ctx.globalAlpha = opacity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }
    
    drawParticles() {
        for (const p of this.particles) {
            const lifeRatio = p.life / p.maxLife;
            const alpha = lifeRatio * 0.8;
            
            let color;
            switch (this.colorMode) {
                case 0: // Blue/Cyan theme
                    color = `hsla(${180 + Math.sin(Date.now() * 0.001 + p.hue) * 40}, 70%, 60%, ${alpha})`;
                    break;
                case 1: // Rainbow
                    color = `hsla(${(p.hue + Date.now() * 0.1) % 360}, 70%, 60%, ${alpha})`;
                    break;
                case 2: // Purple/Pink
                    color = `hsla(${280 + Math.sin(Date.now() * 0.001 + p.hue) * 60}, 70%, 60%, ${alpha})`;
                    break;
                default:
                    color = `rgba(100, 200, 255, ${alpha})`;
            }
            
            // Draw particle with glow effect
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = color;
            this.ctx.fillStyle = color;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.shadowBlur = 0;
        }
    }
    
    draw() {
        // Create trailing effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.drawConnections();
        this.drawParticles();
    }
    
    animate() {
        this.updateParticles();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    togglePause() {
        this.paused = !this.paused;
        return this.paused;
    }
    
    changeColorMode() {
        this.colorMode = (this.colorMode + 1) % 3;
        return this.colorMode;
    }
    
    reset() {
        this.initParticles();
    }
    
    destroy() {
        this.stop();
        
        // Remove event listeners
        Object.keys(this.eventListeners).forEach(eventType => {
            window.removeEventListener(eventType, this.eventListeners[eventType]);
        });
        
        // Remove canvas if we created it
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Auto-initialize when DOM is ready
let fluidSimulation = null;

function initFluid(canvasSelector = '.fluid-canvas') {
    if (typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                fluidSimulation = new FluidSimulation(canvasSelector);
            });
        } else {
            fluidSimulation = new FluidSimulation(canvasSelector);
        }
    }
    return fluidSimulation;
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FluidSimulation, initFluid };
} else if (typeof define === 'function' && define.amd) {
    define(() => ({ FluidSimulation, initFluid }));
} else {
    window.FluidSimulation = FluidSimulation;
    window.initFluid = initFluid;
}

// Auto-initialize
initFluid();