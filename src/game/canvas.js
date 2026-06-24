import { canvasConfig } from '../config/canvas.js';
import { worldConfig } from '../config/world.js';

function getDpr() {
  const dpr = window.devicePixelRatio || 1;
  return Math.min(dpr, canvasConfig.maxDpr);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolateColor(depth) {
  const stops = worldConfig.gradient.stops;
  if (depth <= stops[0].depth) return stops[0].color;
  if (depth >= stops[stops.length - 1].depth) return stops[stops.length - 1].color;

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (depth >= a.depth && depth <= b.depth) {
      const t = (depth - a.depth) / (b.depth - a.depth);
      const ca = hexToRgb(a.color);
      const cb = hexToRgb(b.color);
      const r = Math.round(lerp(ca.r, cb.r, t));
      const g = Math.round(lerp(ca.g, cb.g, t));
      const bl = Math.round(lerp(ca.b, cb.b, t));
      return `rgb(${r}, ${g}, ${bl})`;
    }
  }
  return stops[stops.length - 1].color;
}

export function createCanvas(element) {
  const ctx = element.getContext('2d');
  if (!ctx) {
    throw new Error('Nao foi possivel obter o contexto 2d do canvas.');
  }

  function resize() {
    const rect = element.getBoundingClientRect();
    const dpr = getDpr();
    element.width = Math.max(1, Math.floor(rect.width * dpr));
    element.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBackground(cameraY) {
    const rect = element.getBoundingClientRect();
    const viewportTopDepth = cameraY / worldConfig.pixelsPerMeter;
    const viewportBottomDepth = (cameraY + rect.height) / worldConfig.pixelsPerMeter;

    const topColor = interpolateColor(viewportTopDepth);
    const bottomColor = interpolateColor(viewportBottomDepth);

    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }

  function clear() {
    const rect = element.getBoundingClientRect();
    ctx.fillStyle = canvasConfig.background;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }

  resize();

  window.addEventListener('resize', resize);

  function destroy() {
    window.removeEventListener('resize', resize);
  }

  return {
    element,
    ctx,
    resize,
    clear,
    drawBackground,
    destroy,
    get width() {
      return element.getBoundingClientRect().width;
    },
    get height() {
      return element.getBoundingClientRect().height;
    },
  };
}

export default createCanvas;
