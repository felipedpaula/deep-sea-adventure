import { worldConfig } from '../config/world.js';

function createRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generateRock(cx, cy, baseRadius, rng) {
  const numVertices = 6 + Math.floor(rng() * 4);
  const vertices = [];
  for (let i = 0; i < numVertices; i++) {
    const angle = (i / numVertices) * Math.PI * 2;
    const r = baseRadius * (0.6 + rng() * 0.5);
    vertices.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }
  return vertices;
}

function generateRocks(side) {
  const rng = createRng(side === 'left' ? 12345 : 67890);
  const rocks = [];
  const spacing = 90;
  const baseX = side === 'left' ? 0 : worldConfig.width;
  const dir = side === 'left' ? -1 : 1;
  const abyssalStartY = 1000 * worldConfig.pixelsPerMeter;

  for (let y = -50; y < abyssalStartY; y += spacing) {
    const cy = y + rng() * spacing * 0.4;
    const radius = 40 + rng() * 50;
    const cx = baseX + dir * (radius * 0.3 + rng() * 30);
    rocks.push(generateRock(cx, cy, radius, rng));
  }
  return rocks;
}

export function createRockWalls() {
  const leftRocks = generateRocks('left');
  const rightRocks = generateRocks('right');
  const allRocks = [...leftRocks, ...rightRocks];

  const { color, strokeColor } = worldConfig.rockWall;

  function render(ctx, camera) {
    const viewTop = camera.y - 100;
    const viewBottom = camera.y + camera.viewportHeight + 100;

    ctx.fillStyle = color;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;

    for (const rock of allRocks) {
      let minY = Infinity;
      let maxY = -Infinity;
      for (const v of rock) {
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
      }
      if (maxY < viewTop || minY > viewBottom) continue;

      ctx.beginPath();
      ctx.moveTo(rock[0].x, rock[0].y);
      for (let i = 1; i < rock.length; i++) {
        ctx.lineTo(rock[i].x, rock[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  return { render };
}

export default createRockWalls;
