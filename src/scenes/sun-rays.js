import { worldConfig } from '../config/world.js';

function createRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function createSunRays() {
  const { maxDepth, rayCount, rayColor, rayWidth, blur, glowColor, glowDepth } = worldConfig.sunRays;
  const rng = createRng(77777);
  const rays = [];

  for (let i = 0; i < rayCount; i++) {
    rays.push({
      x: rng() * worldConfig.width,
      skew: (rng() - 0.5) * 0.25,
      width: rayWidth * (0.7 + rng() * 0.6),
    });
  }

  function render(ctx, camera) {
    const cameraDepth = camera.y / worldConfig.pixelsPerMeter;
    if (cameraDepth > maxDepth) return;

    const vw = camera.viewportWidth;
    const vh = camera.viewportHeight;
    const fadeStart = maxDepth * 0.3;
    const fade = cameraDepth < fadeStart ? 1 : 1 - (cameraDepth - fadeStart) / (maxDepth - fadeStart);
    const alpha = Math.max(0, fade);

    if (alpha <= 0) return;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = alpha;

    if (cameraDepth < glowDepth) {
      const glowFade = 1 - cameraDepth / glowDepth;
      const glowGrad = ctx.createLinearGradient(0, 0, 0, vh * 0.7);
      glowGrad.addColorStop(0, glowColor);
      glowGrad.addColorStop(1, 'rgba(200, 230, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.globalAlpha = alpha * glowFade;
      ctx.fillRect(0, 0, vw, vh * 0.7);
      ctx.globalAlpha = alpha;
    }

    ctx.filter = `blur(${blur}px)`;

    for (const ray of rays) {
      const screenX = ray.x - camera.x;
      const bottomX = screenX + ray.skew * vh;

      const grad = ctx.createLinearGradient(screenX, 0, bottomX, vh);
      grad.addColorStop(0, rayColor);
      grad.addColorStop(0.4, rayColor.replace('0.035', '0.015'));
      grad.addColorStop(1, 'rgba(200, 230, 255, 0)');

      ctx.fillStyle = grad;
      const halfW = ray.width / 2;
      ctx.beginPath();
      ctx.moveTo(screenX - halfW, 0);
      ctx.lineTo(screenX + halfW, 0);
      ctx.lineTo(bottomX + halfW, vh);
      ctx.lineTo(bottomX - halfW, vh);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  return { render };
}

export default createSunRays;
