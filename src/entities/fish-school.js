import fishImgSrc from '../assets/animals/fish-animated.svg';

export function createFishSchool({
  centerX,
  centerY,
  amplitude = 200,
  speed = 0.5,
  fishWidth = 35,
  fishHeight = 35,
  camera,
  offsets = [
    { x: 0, y: -20 },
    { x: 25, y: 10 },
    { x: -15, y: 30 },
  ],
} = {}) {
  const container = document.getElementById('app');

  const elements = offsets.map(() => {
    const img = document.createElement('img');
    img.src = fishImgSrc;
    img.style.position = 'absolute';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '5';
    img.style.width = `${fishWidth}px`;
    img.style.height = `${fishHeight}px`;
    container.appendChild(img);
    return img;
  });

  let time = 0;
  let prevX = centerX;
  const fish = offsets.map((off) => ({
    offsetX: off.x,
    offsetY: off.y,
    x: centerX + off.x,
    y: centerY + off.y,
    facing: 1,
  }));

  function update(dt) {
    time += dt;

    const schoolX = centerX + amplitude * Math.sin(time * speed);
    const dx = schoolX - prevX;
    prevX = schoolX;

    const facing = dx >= 0 ? -1 : 1;

    for (let i = 0; i < fish.length; i++) {
      fish[i].x = schoolX + fish[i].offsetX;
      fish[i].y = centerY + fish[i].offsetY;
      fish[i].facing = facing;
    }
  }

  function render() {
    if (!camera) return;

    for (let i = 0; i < fish.length; i++) {
      const screen = camera.worldToScreen(fish[i].x, fish[i].y);
      const el = elements[i];
      el.style.left = `${screen.x - fishWidth / 2}px`;
      el.style.top = `${screen.y - fishHeight / 2}px`;
      el.style.transform = fish[i].facing === -1 ? 'scaleX(-1)' : 'scaleX(1)';
    }
  }

  return {
    state: { x: centerX, y: centerY },
    update,
    render,
  };
}

export default createFishSchool;
