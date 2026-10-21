// Interactive script for Purva & Jatin romantic proposal website

// 1. Floating Background Hearts Generator
function createBackgroundHearts() {
  let heartsContainer = document.querySelector('.hearts-bg');
  if (!heartsContainer) {
    heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-bg';
    document.body.appendChild(heartsContainer);
  }

  const heartEmojis = ['💖', '💕', '💗', '💓', '✨', '🌸', '❤️'];
  
  // Seed initial batch of floating hearts
  for (let i = 0; i < 15; i++) {
    spawnFloatingHeart(heartsContainer, heartEmojis, true);
  }

  // Continuously spawn hearts
  setInterval(() => {
    if (document.querySelectorAll('.floating-heart').length < 25) {
      spawnFloatingHeart(heartsContainer, heartEmojis, false);
    }
  }, 900);
}

function spawnFloatingHeart(container, emojis, randomInit) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 95 + '%';
  const size = Math.floor(Math.random() * 18 + 14);
  heart.style.fontSize = size + 'px';
  const duration = Math.random() * 6 + 6;
  heart.style.animationDuration = duration + 's';
  
  if (randomInit) {
    heart.style.animationDelay = '-' + (Math.random() * duration) + 's';
  }

  container.appendChild(heart);

  // Clean up after animation finishes
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// 2. Interactive Click / Tap Heart Burst
function enableClickHearts() {
  const burstIcons = ['💖', '💕', '✨', '🥰', '❤️', '💋'];
  document.addEventListener('click', (e) => {
    // Avoid interfering with button clicks
    const heart = document.createElement('span');
    heart.className = 'click-heart';
    heart.textContent = burstIcons[Math.floor(Math.random() * burstIcons.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = Math.floor(Math.random() * 14 + 20) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 900);
  });
}

// 3. Runaway "No" Button (For no3.html)
const funnyPhrases = [
  "Are you sure? 🥺",
  "Think again! 🙈",
  "Can't catch me! 🏃‍♀️",
  "Wrong button! 😜",
  "Try the YES button! 💕",
  "Purva pleaseee! 😭",
  "Still trying? 😂",
  "Just say YES! 💖",
  "Impossible to say No! ✨",
  "Jatin loves you! 🥰"
];

let phraseIndex = 0;

function moveRandomEl(elm) {
  elm.style.position = "fixed";
  
  const elmWidth = elm.offsetWidth || 100;
  const elmHeight = elm.offsetHeight || 50;
  
  // Calculate safe boundary inside screen
  const maxX = window.innerWidth - elmWidth - 25;
  const maxY = window.innerHeight - elmHeight - 25;
  
  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));
  
  elm.style.left = randomX + "px";
  elm.style.top = randomY + "px";
  
  // Cycle funny text
  phraseIndex = (phraseIndex + 1) % funnyPhrases.length;
  elm.textContent = funnyPhrases[phraseIndex];
  
  // Grow the Yes button even bigger whenever No escapes!
  const yesBtn = document.querySelector(".btn-yes");
  if (yesBtn) {
    const currentScale = parseFloat(yesBtn.dataset.scale || "1.0");
    const newScale = Math.min(currentScale + 0.08, 1.6);
    yesBtn.dataset.scale = newScale;
    yesBtn.style.transform = `scale(${newScale})`;
  }
}

// 4. Romantic Audio Chime (Web Audio API)
function playRomanticChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Play warm major arpeggio (C5, E5, G5, B5, C6)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.85);
    });
  } catch (err) {
    console.log("Audio autoplay constrained:", err);
  }
}

// 5. Confetti celebration for yes.html
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const pieces = [];
  const colors = ['#ff4d6d', '#ff758f', '#ffccd5', '#ffd166', '#06d6a0', '#118ab2', '#ffffff'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 2,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 6,
      isHeart: Math.random() > 0.6
    });
  }

  function drawHeart(c, x, y, size, color) {
    c.save();
    c.translate(x, y);
    c.fillStyle = color;
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(0, topCurveHeight);
    c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    c.fill();
    c.restore();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.spin;

      if (p.isHeart) {
        drawHeart(ctx, p.x, p.y, p.size, p.color);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  createBackgroundHearts();
  enableClickHearts();

  // If there's a runaway button (no3.html)
  const moveRandom = document.querySelector("#move-random");
  if (moveRandom) {
    // Desktop hover
    moveRandom.addEventListener("mouseenter", function (e) {
      moveRandomEl(e.target);
    });
    // Mobile touch
    moveRandom.addEventListener("touchstart", function (e) {
      e.preventDefault();
      moveRandomEl(e.target);
    }, { passive: false });
    // Click fallback
    moveRandom.addEventListener("click", function (e) {
      e.preventDefault();
      moveRandomEl(e.target);
    });
  }

  // If on yes.html
  if (document.getElementById('confetti-canvas')) {
    launchConfetti();
    // Play chime on first user gesture or after slight delay
    setTimeout(() => {
      playRomanticChime();
    }, 400);

    // Video unmute helper button
    const unmuteBtn = document.getElementById('unmute-btn');
    const purvaVideo = document.getElementById('purva-video');
    if (unmuteBtn && purvaVideo) {
      unmuteBtn.addEventListener('click', () => {
        if (purvaVideo.muted) {
          purvaVideo.muted = false;
          unmuteBtn.innerHTML = '🔊 Sound On';
        } else {
          purvaVideo.muted = true;
          unmuteBtn.innerHTML = '🔇 Mute';
        }
      });
    }
  }
});