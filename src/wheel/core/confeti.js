// mini-confetti.js - легка версія (~2KB)
function miniConfetti(options = {}) {
    const {
      particleCount = 50,
      spread = 70,
      origin = { x: 0.5, y: 0.5 },
      colors = ['#ff0000', '#00ff00', '#0000ff'],
      shapes = ['circle'],
      gravity = 1,
      ticks = 200
    } = options;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    canvas.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      pointer-events:none;
      z-index:9999;
    `;
    document.body.appendChild(canvas);
    
    // Розміри canvas
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // Клас частинки
    class Particle {
      constructor(x, y, color, shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -10 - 5;
        this.gravity = gravity;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.life = ticks;
      }
      
      update() {
        this.speedY += this.gravity * 0.1;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.life--;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        
        ctx.restore();
      }
    }
    
    // Створюємо частинки
    const startX = origin.x * canvas.width;
    const startY = origin.y * canvas.height;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI / 180) * (Math.random() * spread - spread / 2);
      const velocity = Math.random() * 5 + 2;
      
      particles.push(new Particle(
        startX,
        startY,
        colors[Math.floor(Math.random() * colors.length)],
        shapes[Math.floor(Math.random() * shapes.length)]
      ));
    }
    
    // Анімація
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }
      
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
        window.removeEventListener('resize', resize);
      }
    }
    
    animate();
  }
  
  // Експорт для використання
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = miniConfetti;
  } else {
    window.miniConfetti = miniConfetti;
  }