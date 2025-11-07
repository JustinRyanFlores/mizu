// Buy Button Alert
document.getElementById("buy-btn").addEventListener("click", () => {
  alert("Coming soon! Mizu Token will be available on your favorite DEX 🐸💧");
});

// Copy Contract Address
document.getElementById("copy-btn").addEventListener("click", () => {
  const ca = document.getElementById("contract-address").textContent;
  navigator.clipboard.writeText(ca).then(() => {
    alert("Contract Address copied to clipboard! 🐸💙");
  });
});


// Loading Screen Timer
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 5000); // 2 seconds
});

// Existing Buttons
document.getElementById("buy-btn").addEventListener("click", () => {
  alert("Coming soon! Mizu Token will be available on your favorite DEX 🐸💧");
});

document.getElementById("copy-btn").addEventListener("click", () => {
  const ca = document.getElementById("contract-address").textContent;
  navigator.clipboard.writeText(ca).then(() => {
    alert("Contract Address copied to clipboard! 🐸💙");
  });
});



const canvas = document.getElementById('ripple-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];
let lastRippleTime = 0;
const rippleDelay = 100; // Delay between ripples in milliseconds

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  if (currentTime - lastRippleTime < rippleDelay) return;

  lastRippleTime = currentTime;
  const speed = 0.3 + Math.random() * 0.2; // Slower expansion speed
  const sizeVariation = Math.random(); // Random value between 0 and 1
  let maxRadius;
  if (maxRadius > 100) {
    speed *= 0.7; // slower expansion for big ripples
  }

  // Create varying sizes of ripples
  if (sizeVariation < 0.3) { // 30% chance for small ripples
    maxRadius = 30 + Math.random() * 20;
  } else if (sizeVariation < 0.8) { // 50% chance for medium ripples
    maxRadius = 50 + Math.random() * 30;
  } else { // 20% chance for large ripples
    maxRadius = 80 + Math.random() * 40;
  }

  ripples.push({
    x: e.clientX,
    y: e.clientY,
    radius: 0,
    alpha: 1,
    speed: speed,
    maxRadius: maxRadius,
    lineWidth: 1.5 + Math.random(),
  });
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ripples.length; i++) {
    const r = ripples[i];

    // Create smaller glow effect
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0, 150, 255, 0.3)';

    // Draw main ripple
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 247, 255, ${r.alpha * 0.8})`; // Slightly more transparent
    ctx.lineWidth = r.lineWidth;
    ctx.stroke();

    // Draw secondary glow ripple
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius * 0.85, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(100, 200, 255, ${r.alpha * 0.5})`;
    ctx.lineWidth = r.lineWidth * 0.5;
    ctx.stroke();

    // Reset shadow for next iteration
    ctx.shadowBlur = 0;

    // Slower fluid expansion with smoother easing
    const progress = r.radius / r.maxRadius;
    const ease = 1 - Math.pow(progress, 3); // Cubic easing for smoother expansion
    r.radius += r.speed * (0.8 + ease * 0.5); // Slower overall expansion
    r.alpha -= 0.012; // Even slower fade out to match the slower expansion

    // remove invisible ripples or ones that reached max size
    if (r.alpha <= 0 || r.radius >= r.maxRadius) {
      ripples.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(draw);
}

draw();
