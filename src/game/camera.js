export function createCamera({ worldWidth, worldHeight, viewportWidth, viewportHeight }) {
  const cam = {
    x: 0,
    y: 0,
    worldWidth,
    worldHeight,
    viewportWidth,
    viewportHeight,
  };

  function follow(target) {
    const targetCx = target.x + target.width / 2;
    const targetCy = target.y + target.height / 2;

    cam.x = targetCx - cam.viewportWidth / 2;
    cam.y = targetCy - cam.viewportHeight / 2;

    const maxX = Math.max(0, cam.worldWidth - cam.viewportWidth);
    const maxY = Math.max(0, cam.worldHeight - cam.viewportHeight);
    cam.x = Math.max(0, Math.min(cam.x, maxX));
    cam.y = Math.max(0, Math.min(cam.y, maxY));
  }

  function resizeViewport(width, height) {
    cam.viewportWidth = width;
    cam.viewportHeight = height;
  }

  function worldToScreen(x, y) {
    return { x: x - cam.x, y: y - cam.y };
  }

  function screenToWorld(x, y) {
    return { x: x + cam.x, y: y + cam.y };
  }

  function apply(ctx) {
    ctx.translate(-cam.x, -cam.y);
  }

  return {
    follow,
    resizeViewport,
    worldToScreen,
    screenToWorld,
    apply,
    get x() {
      return cam.x;
    },
    get y() {
      return cam.y;
    },
    get viewportWidth() {
      return cam.viewportWidth;
    },
    get viewportHeight() {
      return cam.viewportHeight;
    },
  };
}

export default createCamera;
