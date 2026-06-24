import { submarineConfig } from '../config/submarine.js';
import { worldConfig } from '../config/world.js';
import submarineImgSrc from '../assets/imgs/submarine/orange-submarine.png';

const submarineImg = new Image();
submarineImg.src = submarineImgSrc;

export function createSubmarine() {
  const state = {
    x: worldConfig.width / 2 - submarineConfig.width / 2,
    y: worldConfig.startDepth * worldConfig.pixelsPerMeter,
    width: submarineConfig.width,
    height: submarineConfig.height,
    vx: 0,
    vy: 0,
    speed: submarineConfig.speed,
    facing: 1,
    angle: 0,
  };

  function getDepth() {
    return state.y / worldConfig.pixelsPerMeter;
  }

  function update(dt, input, camera) {
    if (!input) return;

    let dx = 0;
    let dy = 0;

    if (input.left) dx -= 1;
    if (input.right) dx += 1;
    if (input.up) dy -= 1;
    if (input.down) dy += 1;

    if (dx === 0 && dy === 0 && input.mouseLeft) {
      const cx = state.x + state.width / 2;
      const cy = state.y + state.height / 2;
      let mx = input.mouseX;
      let my = input.mouseY;
      if (camera) {
        const world = camera.screenToWorld(mx, my);
        mx = world.x;
        my = world.y;
      }
      dx = mx - cx;
      dy = my - cy;
      const len = Math.hypot(dx, dy);
      if (len > 0) {
        dx /= len;
        dy /= len;
      }
    }

    const boost = input.boost || input.mouseRight;
    const targetSpeed = state.speed * (boost ? submarineConfig.boostMultiplier : 1);
    const targetVx = dx * targetSpeed;
    const targetVy = dy * targetSpeed;

    const smooth = 1 - Math.exp(-submarineConfig.smoothing * dt);
    state.vx += (targetVx - state.vx) * smooth;
    state.vy += (targetVy - state.vy) * smooth;

    if (state.vx > 1) state.facing = 1;
    else if (state.vx < -1) state.facing = -1;

    const speed = Math.hypot(state.vx, state.vy);
    let targetAngle = 0;
    if (speed > 1) {
      targetAngle = (state.vy / speed) * submarineConfig.maxTilt * state.facing;
      targetAngle = Math.max(-submarineConfig.maxTilt, Math.min(targetAngle, submarineConfig.maxTilt));
    }

    const tiltSmooth = 1 - Math.exp(-submarineConfig.tiltSmoothing * dt);
    state.angle += (targetAngle - state.angle) * tiltSmooth;

    state.x += state.vx * dt;
    state.y += state.vy * dt;

    const maxX = worldConfig.width - state.width;
    const maxY = worldConfig.height - state.height;
    state.x = Math.max(0, Math.min(state.x, maxX));
    state.y = Math.max(0, Math.min(state.y, maxY));
  }

  function render(ctx) {
    if (!submarineImg.complete || submarineImg.naturalWidth === 0) return;

    const { x, y, width: w, height: h, facing, angle } = state;
    const cx = x + w / 2;
    const cy = y + h / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(facing, 1);

    ctx.drawImage(submarineImg, -w / 2, -h / 2, w, h);

    ctx.restore();
  }

  return {
    state,
    update,
    render,
    getDepth,
    get x() {
      return state.x;
    },
    get y() {
      return state.y;
    },
    get width() {
      return state.width;
    },
    get height() {
      return state.height;
    },
    get depth() {
      return getDepth();
    },
  };
}

export default createSubmarine;
