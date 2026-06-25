import { gameConfig } from '../config/game.js';

const STATE = {
  running: 'running',
  paused: 'paused',
  stopped: 'stopped',
};

export function createGame(canvas, entities = [], input = null, camera = null, hud = null, scenery = null, sunRays = null) {
  let state = STATE.stopped;
  let rafId = null;
  let lastTime = 0;

  function update(dt) {
    const inputState = input ? input.getState() : null;
    for (const entity of entities) {
      entity.update(dt, inputState, camera);
    }
    if (scenery && scenery.update) {
      scenery.update(dt);
    }
    if (camera && entities.length > 0) {
      camera.resizeViewport(canvas.width, canvas.height);
      camera.follow(entities[0].state);
    }
  }

  function render() {
    const ctx = canvas.ctx;

    if (camera) {
      canvas.drawBackground(camera.y);
    } else {
      canvas.clear();
    }

    if (sunRays && camera) {
      sunRays.render(canvas.ctx, camera);
    }

    ctx.save();
    if (camera) {
      camera.apply(ctx);
    }

    if (scenery && camera) {
      scenery.render(ctx, camera);
    }

    for (const entity of entities) {
      entity.render(ctx);
    }
    ctx.restore();

    if (hud) {
      hud.update();
    }
  }

  function frame(now) {
    if (state !== STATE.running) {
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, gameConfig.maxDelta);
    lastTime = now;

    update(dt);
    render();

    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (state === STATE.running) {
      return;
    }
    state = STATE.running;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
    console.info('[Deep Sea Adventure] Loop do jogo iniciado.');
  }

  function pause() {
    if (state !== STATE.running) {
      return;
    }
    state = STATE.paused;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resume() {
    if (state !== STATE.paused) {
      return;
    }
    state = STATE.running;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    state = STATE.stopped;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function handleVisibility() {
    if (document.hidden) {
      pause();
    } else {
      resume();
    }
  }

  document.addEventListener('visibilitychange', handleVisibility);

  function destroy() {
    stop();
    document.removeEventListener('visibilitychange', handleVisibility);
  }

  return {
    start,
    pause,
    resume,
    stop,
    destroy,
    get state() {
      return state;
    },
  };
}

export default createGame;
