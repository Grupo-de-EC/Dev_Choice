const titleText = "DEV'S CHOICE";
const titleElement = document.getElementById('title');
const skipBtn = document.getElementById('skip-btn');
const welcomeScreen = document.querySelector('.welcome-screen');
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let currentChar = 0;
const typingSpeed = 150;

// Ajusta canvas para o tamanho da janela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ======= Máquina de escrever com classe e callback =======
function typeTitle(text, element, speed, callback) {
  element.classList.add('typing');
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
      if (callback) callback();
    }
  }
  type();
}

typeTitle(titleText, titleElement, typingSpeed);

// ======= Partículas e conexões digitais =======
const particles = [];
const maxParticles = 80;
const connectionDistance = 120;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = canvas.width;
    else if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    else if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.shadowColor = 'cyan';
    ctx.shadowBlur = 6;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connectParticles() {
  for(let a = 0; a < particles.length; a++) {
    for(let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < connectionDistance) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / connectionDistance})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = 'cyan';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

// Inicializa partículas
for(let i = 0; i < maxParticles; i++) {
  particles.push(new Particle());
}

animate();

skipBtn.addEventListener('click', () => {
    welcomeScreen.style.animation = 'fadeOut 0.8s forwards';
    setTimeout(() => {
      // Redireciona para login.html após a animação
      window.location.href = 'login.html';
    }, 850);
  });