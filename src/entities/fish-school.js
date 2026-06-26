import fishImgSrc from '../assets/animals/fish-animated.svg';

export function createFishSchool({
  imageSrc = fishImgSrc,
  centerX,
  centerY,
  amplitudeX = 200,
  amplitudeY = 0,
  speed = 0.5,
  fishWidth = 35,
  fishHeight = 35,
  camera,
  spriteFacesRight = false,
  rotateToMovement = false,
  offsets = [
    { x: 0, y: -20 },
    { x: 25, y: 10 },
    { x: -15, y: 30 },
  ],
} = {}) {
  const container = document.getElementById('app');

  const elements = offsets.map(() => {
    const img = document.createElement('img');
    img.src = imageSrc;
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
  let prevY = centerY;
  const fish = offsets.map((off) => ({
    offsetX: off.x,
    offsetY: off.y,
    x: centerX + off.x,
    y: centerY + off.y,
    facing: 1,
    angle: 0,
  }));

  function update(dt) {
    time += dt;

    const phase = time * speed;
    const schoolX = centerX + amplitudeX * Math.sin(phase);
    const schoolY = centerY + amplitudeY * Math.sin(phase);
    const dx = schoolX - prevX;
    const dy = schoolY - prevY;
    prevX = schoolX;
    prevY = schoolY;

    const movingRight = dx >= 0;
    const facing = movingRight === spriteFacesRight ? 1 : -1;
    const angle = rotateToMovement ? Math.atan2(dy, Math.abs(dx)) : 0;

    for (let i = 0; i < fish.length; i++) {
      fish[i].x = schoolX + fish[i].offsetX;
      fish[i].y = schoolY + fish[i].offsetY;
      fish[i].facing = facing;
      fish[i].angle = angle;
    }
  }

  function render() {
    if (!camera) return;

    for (let i = 0; i < fish.length; i++) {
      const screen = camera.worldToScreen(fish[i].x, fish[i].y);
      const el = elements[i];
      el.style.left = `${screen.x - fishWidth / 2}px`;
      el.style.top = `${screen.y - fishHeight / 2}px`;
      el.style.transform = rotateToMovement
        ? `scaleX(${fish[i].facing}) rotate(${fish[i].angle}rad)`
        : `scaleX(${fish[i].facing})`;
    }
  }

  return {
    state: { x: centerX, y: centerY },
    update,
    render,
  };
}

export default createFishSchool;
