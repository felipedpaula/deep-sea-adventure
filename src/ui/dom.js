const IDS = ['app', 'game-canvas', 'hud', 'menus'];

function getById(id) {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Elemento #${id} nao encontrado no DOM.`);
  }
  return el;
}

export function getDomElements() {
  const [app, canvas, hud, menus] = IDS.map(getById);
  return { app, canvas, hud, menus };
}

export default getDomElements;
