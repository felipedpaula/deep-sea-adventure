import { worldConfig } from '../config/world.js';

const environmentMessageConfig = {
  fadeInMs: 900,
  holdMs: 1600,
  fadeOutMs: 900,
};

function getEnvironmentForDepth(depth) {
  for (const environment of worldConfig.environments) {
    if (depth >= environment.minDepth && depth <= environment.maxDepth) {
      return environment;
    }
  }

  return worldConfig.environments[worldConfig.environments.length - 1];
}

export function createHud(hudElement, submarine) {
  const depthValueEl = hudElement.querySelector('#depth-value');
  const environmentTitleEl = hudElement.querySelector('#environment-title');

  if (!depthValueEl) {
    throw new Error('Elemento #depth-value nao encontrado no HUD.');
  }

  if (!environmentTitleEl) {
    throw new Error('Elemento #environment-title nao encontrado no HUD.');
  }

  let lastDepth = -1;
  let activeEnvironmentKey = '';
  let messageStartTime = -1;

  function showEnvironmentName(name) {
    environmentTitleEl.textContent = name;
    messageStartTime = performance.now();
  }

  function updateEnvironmentMessage(now) {
    if (messageStartTime < 0) {
      environmentTitleEl.style.opacity = '0';
      return;
    }

    const elapsed = now - messageStartTime;
    const { fadeInMs, holdMs, fadeOutMs } = environmentMessageConfig;
    const totalDuration = fadeInMs + holdMs + fadeOutMs;

    if (elapsed >= totalDuration) {
      environmentTitleEl.style.opacity = '0';
      messageStartTime = -1;
      return;
    }

    let opacity = 1;
    if (elapsed < fadeInMs) {
      opacity = elapsed / fadeInMs;
    } else if (elapsed > fadeInMs + holdMs) {
      opacity = 1 - ((elapsed - fadeInMs - holdMs) / fadeOutMs);
    }

    environmentTitleEl.style.opacity = String(Math.max(0, Math.min(opacity, 1)));
  }

  function update() {
    const depth = Math.round(submarine.depth);
    if (depth !== lastDepth) {
      depthValueEl.textContent = String(depth);
      lastDepth = depth;
    }

    const environment = getEnvironmentForDepth(submarine.depth);
    if (environment.key !== activeEnvironmentKey) {
      activeEnvironmentKey = environment.key;
      showEnvironmentName(environment.name);
    }

    updateEnvironmentMessage(performance.now());
  }

  return { update };
}

export default createHud;
