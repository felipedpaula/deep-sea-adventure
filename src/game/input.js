const KEYS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
  ShiftLeft: 'boost',
  ShiftRight: 'boost',
};

export function createInput(canvasElement) {
  const keys = { up: false, down: false, left: false, right: false, boost: false };
  const mouse = { left: false, right: false, x: 0, y: 0 };

  function onKeyDown(e) {
    const flag = KEYS[e.code];
    if (!flag) return;
    if (e.repeat) return;
    keys[flag] = true;
    e.preventDefault();
  }

  function onKeyUp(e) {
    const flag = KEYS[e.code];
    if (!flag) return;
    keys[flag] = false;
    e.preventDefault();
  }

  function getMousePos(e) {
    const rect = canvasElement.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseDown(e) {
    getMousePos(e);
    if (e.button === 0) mouse.left = true;
    if (e.button === 2) mouse.right = true;
    e.preventDefault();
  }

  function onMouseUp(e) {
    if (e.button === 0) mouse.left = false;
    if (e.button === 2) mouse.right = false;
  }

  function onMouseMove(e) {
    getMousePos(e);
  }

  function onContext(e) {
    e.preventDefault();
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvasElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  canvasElement.addEventListener('mousemove', onMouseMove);
  canvasElement.addEventListener('contextmenu', onContext);

  function getState() {
    return {
      up: keys.up,
      down: keys.down,
      left: keys.left,
      right: keys.right,
      boost: keys.boost,
      mouseLeft: mouse.left,
      mouseRight: mouse.right,
      mouseX: mouse.x,
      mouseY: mouse.y,
    };
  }

  function destroy() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    canvasElement.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    canvasElement.removeEventListener('mousemove', onMouseMove);
    canvasElement.removeEventListener('contextmenu', onContext);
  }

  return { getState, destroy };
}

export default createInput;
