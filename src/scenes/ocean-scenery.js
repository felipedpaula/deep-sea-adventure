import { worldConfig } from '../config/world.js';
import { createRockWalls } from './rock-walls.js';

function createRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function parseColor(color) {
  if (color.startsWith('#')) {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
      a: 1,
    };
  }

  const values = color.match(/[\d.]+/g)?.map(Number);
  if (!values || values.length < 3) {
    throw new Error(`Cor invalida: ${color}`);
  }

  return {
    r: values[0],
    g: values[1],
    b: values[2],
    a: values[3] ?? 1,
  };
}

function mixColor(a, b, t) {
  const ca = parseColor(a);
  const cb = parseColor(b);
  const mix = smoothstep(t);
  const r = Math.round(lerp(ca.r, cb.r, mix));
  const g = Math.round(lerp(ca.g, cb.g, mix));
  const bl = Math.round(lerp(ca.b, cb.b, mix));
  const alpha = lerp(ca.a, cb.a, mix);
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

function withAlpha(color, alpha) {
  const parsed = parseColor(color);
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${alpha})`;
}

function createDepthElement(type, y, height, props = {}) {
  return {
    type,
    minY: y - height * 0.5,
    maxY: y + height * 0.5,
    ...props,
  };
}

export function createOceanScenery() {
  const { width, height, pixelsPerMeter, environments, oceanScenery } = worldConfig;
  const rng = createRng(oceanScenery.seed);
  const rockWalls = createRockWalls();
  const terrainPoints = [];
  const twilightParticles = [];
  const midnightParticles = [];
  const abyssalParticles = [];
  const trenchParticles = [];
  const trenchCenterX = width * 0.7;
  const trenchRadius = width * 0.12;

  function depthToY(depth) {
    return depth * pixelsPerMeter;
  }

  function getEnvironmentIndex(depth) {
    for (let i = 0; i < environments.length; i++) {
      const environment = environments[i];
      if (depth >= environment.minDepth && depth <= environment.maxDepth) {
        return i;
      }
    }
    return environments.length - 1;
  }

  function getEnvironmentStyleAtDepth(depth) {
    const index = getEnvironmentIndex(depth);
    const current = environments[index];
    const previous = environments[index - 1] ?? current;
    const next = environments[index + 1] ?? current;
    const transitionDepth = oceanScenery.transitionDepth;

    let from = current;
    let to = current;
    let t = 0;

    if (index > 0 && depth < current.minDepth + transitionDepth) {
      from = previous;
      to = current;
      t = (depth - current.minDepth + transitionDepth) / transitionDepth;
    } else if (index < environments.length - 1 && depth > current.maxDepth - transitionDepth) {
      from = current;
      to = next;
      t = (depth - (current.maxDepth - transitionDepth)) / transitionDepth;
    }

    return {
      key: t < 0.5 ? from.key : to.key,
      waterColor: mixColor(from.waterColor, to.waterColor, t),
      hazeColor: mixColor(from.hazeColor, to.hazeColor, t),
      wallColor: mixColor(from.wallColor, to.wallColor, t),
      floorColor: mixColor(from.floorColor, to.floorColor, t),
      ridgeColor: mixColor(from.ridgeColor, to.ridgeColor, t),
      accentColor: mixColor(from.accentColor, to.accentColor, t),
      glowColor: mixColor(from.glowColor, to.glowColor, t),
      light: lerp(from.light, to.light, smoothstep(t)),
    };
  }

  for (let x = 0; x <= width + oceanScenery.floor.segmentWidth; x += oceanScenery.floor.segmentWidth) {
    const ridgeLift = -Math.exp(-((x - width * 0.22) ** 2) / (2 * (width * 0.16) ** 2)) * 1600;
    const trenchDrop = Math.exp(-((x - trenchCenterX) ** 2) / (2 * trenchRadius ** 2)) * 9600;
    const wave = Math.sin(x * 0.0038) * 140 + Math.cos(x * 0.0072) * 55;
    const noise = (rng() - 0.5) * 120;
    const y = clamp(depthToY(1140) + ridgeLift + trenchDrop + wave + noise, depthToY(980), height - 160);
    terrainPoints.push({ x: Math.min(x, width), y });
  }

  for (let i = 0; i < oceanScenery.twilight.particleCount; i++) {
    const y = depthToY(210 + rng() * 280);
    twilightParticles.push(createDepthElement('twilight-particle', y, 16, {
      x: rng() * width,
      y,
      radius: 1 + rng() * 2.2,
      alpha: 0.08 + rng() * 0.12,
    }));
  }

  for (let i = 0; i < oceanScenery.midnight.glowCount; i++) {
    const y = depthToY(520 + rng() * 470);
    midnightParticles.push(createDepthElement('midnight-particle', y, 70, {
      x: 100 + rng() * (width - 200),
      y,
      radius: 3 + rng() * 11,
      alpha: 0.16 + rng() * 0.18,
      blur: 8 + rng() * 18,
      pulse: rng(),
    }));
  }

  for (let i = 0; i < oceanScenery.abyssal.particleCount; i++) {
    const y = depthToY(1000 + rng() * 500);
    abyssalParticles.push(createDepthElement('abyssal-particle', y, 14, {
      x: rng() * width,
      y,
      radius: 0.7 + rng() * 1.8,
      alpha: 0.08 + rng() * 0.12,
    }));
  }

  for (let i = 0; i < oceanScenery.trench.particleCount; i++) {
    const y = depthToY(1500 + rng() * 700);
    trenchParticles.push(createDepthElement('trench-particle', y, 14, {
      x: rng() * width,
      y,
      radius: 0.8 + rng() * 2,
      alpha: 0.04 + rng() * 0.08,
    }));
  }

  function renderEnvironmentBands(ctx, camera) {
    const viewTop = camera.y - oceanScenery.cullingMargin;
    const viewBottom = camera.y + camera.viewportHeight + oceanScenery.cullingMargin;

    for (const environment of environments) {
      const top = depthToY(environment.minDepth);
      const bottom = depthToY(environment.maxDepth);

      if (bottom < viewTop || top > viewBottom) {
        continue;
      }

      const bandTop = Math.max(top, viewTop);
      const bandBottom = Math.min(bottom, viewBottom);
      const midDepth = ((bandTop + bandBottom) * 0.5) / pixelsPerMeter;
      const style = getEnvironmentStyleAtDepth(midDepth);

      ctx.fillStyle = style.hazeColor;
      ctx.fillRect(0, bandTop, width, bandBottom - bandTop);

      const wallWidth = environment.key === 'trench' ? 320 : 210;
      const leftGradient = ctx.createLinearGradient(0, 0, wallWidth, 0);
      leftGradient.addColorStop(0, style.wallColor);
      leftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftGradient;
      ctx.fillRect(0, bandTop, wallWidth, bandBottom - bandTop);

      const rightGradient = ctx.createLinearGradient(width, 0, width - wallWidth, 0);
      rightGradient.addColorStop(0, style.wallColor);
      rightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightGradient;
      ctx.fillRect(width - wallWidth, bandTop, wallWidth, bandBottom - bandTop);

      if (environment.key === 'trench') {
        const shadowWidth = 460;
        const trenchGradient = ctx.createRadialGradient(
          trenchCenterX,
          bandTop,
          40,
          trenchCenterX,
          bandTop,
          shadowWidth,
        );
        trenchGradient.addColorStop(0, 'rgba(0, 0, 0, 0.24)');
        trenchGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = trenchGradient;
        ctx.fillRect(trenchCenterX - shadowWidth, bandTop, shadowWidth * 2, bandBottom - bandTop);
      }
    }
  }

  function renderTerrain(ctx, camera) {
    const viewLeft = camera.x - 120;
    const viewRight = camera.x + camera.viewportWidth + 120;
    const topDepth = camera.y / pixelsPerMeter;
    const bottomDepth = (camera.y + camera.viewportHeight) / pixelsPerMeter;
    const topStyle = getEnvironmentStyleAtDepth(topDepth);
    const bottomStyle = getEnvironmentStyleAtDepth(bottomDepth);
    const fillGradient = ctx.createLinearGradient(0, camera.y, 0, camera.y + camera.viewportHeight);
    fillGradient.addColorStop(0, topStyle.floorColor);
    fillGradient.addColorStop(1, bottomStyle.floorColor);

    ctx.fillStyle = fillGradient;
    ctx.beginPath();

    let started = false;
    for (const point of terrainPoints) {
      if (point.x < viewLeft - oceanScenery.floor.segmentWidth) {
        continue;
      }
      if (point.x > viewRight + oceanScenery.floor.segmentWidth) {
        break;
      }

      if (!started) {
        ctx.moveTo(point.x, height);
        ctx.lineTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    if (started) {
      ctx.lineTo(Math.min(viewRight + oceanScenery.floor.segmentWidth, width), height);
      ctx.closePath();
      ctx.fill();
    }

    const ridgeGradient = ctx.createLinearGradient(0, camera.y, 0, camera.y + camera.viewportHeight);
    ridgeGradient.addColorStop(0, topStyle.ridgeColor);
    ridgeGradient.addColorStop(1, bottomStyle.ridgeColor);
    ctx.strokeStyle = ridgeGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    started = false;

    for (const point of terrainPoints) {
      if (point.x < viewLeft - oceanScenery.floor.segmentWidth) {
        continue;
      }
      if (point.x > viewRight + oceanScenery.floor.segmentWidth) {
        break;
      }

      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    if (started) {
      ctx.stroke();
    }
  }

  function renderTwilightParticle(ctx, particle) {
    ctx.fillStyle = `rgba(188, 220, 236, ${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderMidnightParticle(ctx, glow) {
    const style = getEnvironmentStyleAtDepth(glow.y / pixelsPerMeter);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.filter = `blur(${glow.blur}px)`;
    ctx.fillStyle = withAlpha(style.glowColor, glow.alpha * (0.7 + glow.pulse * 0.3));
    ctx.beginPath();
    ctx.arc(glow.x, glow.y, glow.radius * 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = withAlpha(style.accentColor, 0.75);
    ctx.beginPath();
    ctx.arc(glow.x, glow.y, Math.max(1.5, glow.radius * 0.28), 0, Math.PI * 2);
    ctx.fill();
  }

  function renderAbyssalParticle(ctx, particle) {
    ctx.fillStyle = `rgba(208, 216, 222, ${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderTrenchParticle(ctx, particle) {
    ctx.fillStyle = `rgba(150, 162, 176, ${particle.alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderVisibleElements(ctx, elements, renderer, viewTop, viewBottom) {
    for (const element of elements) {
      if (element.maxY < viewTop || element.minY > viewBottom) {
        continue;
      }
      renderer(ctx, element);
    }
  }

  function render(ctx, camera) {
    const viewTop = camera.y - oceanScenery.cullingMargin;
    const viewBottom = camera.y + camera.viewportHeight + oceanScenery.cullingMargin;

    renderEnvironmentBands(ctx, camera);
    rockWalls.render(ctx, camera);
    renderTerrain(ctx, camera);
    renderVisibleElements(ctx, twilightParticles, renderTwilightParticle, viewTop, viewBottom);
    renderVisibleElements(ctx, midnightParticles, renderMidnightParticle, viewTop, viewBottom);
    renderVisibleElements(ctx, abyssalParticles, renderAbyssalParticle, viewTop, viewBottom);
    renderVisibleElements(ctx, trenchParticles, renderTrenchParticle, viewTop, viewBottom);
  }

  return { render };
}

export default createOceanScenery;
