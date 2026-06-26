import './styles/main.css';
import { getDomElements } from './ui/dom.js';
import { createCanvas } from './game/canvas.js';
import { createGame } from './game/game.js';
import { createInput } from './game/input.js';
import { createCamera } from './game/camera.js';
import { createSubmarine } from './entities/submarine.js';
import { createFishSchool } from './entities/fish-school.js';
import tunaImgSrc from './assets/animals/tuna-animated.svg';
import dolphinImgSrc from './assets/animals/dophin-animated.svg';
import { createHud } from './ui/hud.js';
import { createOceanScenery } from './scenes/ocean-scenery.js';
import { createSunRays } from './scenes/sun-rays.js';
import { worldConfig } from './config/world.js';

const dom = getDomElements();
const canvas = createCanvas(dom.canvas);
const input = createInput(dom.canvas);
const submarine = createSubmarine();
const camera = createCamera({
  worldWidth: worldConfig.width,
  worldHeight: worldConfig.height,
  viewportWidth: canvas.width,
  viewportHeight: canvas.height,
});
const fishSchool1 = createFishSchool({
  centerX: 800,
  centerY: 800,
  amplitudeX: 300,
  speed: 0.3,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const fishSchool2 = createFishSchool({
  centerX: 2000,
  centerY: 1200,
  amplitudeX: 270,
  speed: 0.28,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const fishSchool3 = createFishSchool({
  centerX: 5000,
  centerY: 500,
  amplitudeX: 270,
  speed: 0.28,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const fishSchool4 = createFishSchool({
  centerX: 3800,
  centerY: 1500,
  amplitudeX: 300,
  speed: 0.3,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const tunaSchool = createFishSchool({
  imageSrc: tunaImgSrc,
  centerX: 4700,
  centerY: 760,
  amplitudeX: 560,
  amplitudeY: 280,
  speed: 0.8,
  fishWidth: 92,
  fishHeight: 46,
  camera,
  spriteFacesRight: true,
  rotateToMovement: true,
  offsets: [
    { x: 0, y: -48 },
    { x: 92, y: -12 },
    { x: -82, y: 4 },
    { x: 38, y: 42 },
    { x: -128, y: 54 },
  ],
});
const dolphin = createFishSchool({
  imageSrc: dolphinImgSrc,
  centerX: 900,
  centerY: 350,
  amplitudeX: 700,
  speed: 0.2,
  fishWidth: 100,
  fishHeight: 50,
  camera,
  spriteFacesRight: true,
  offsets: [{ x: 0, y: 0 }],
});
const hud = createHud(dom.hud, submarine);
const oceanScenery = createOceanScenery();
const sunRays = createSunRays();
const game = createGame(canvas, [submarine, fishSchool1, fishSchool2, fishSchool3, fishSchool4, tunaSchool, dolphin], input, camera, hud, oceanScenery, sunRays);

game.start();

console.info(
  '[Deep Sea Adventure] Canvas configurado.',
  { width: canvas.width, height: canvas.height, world: { w: worldConfig.width, h: worldConfig.height } },
);

export { dom, canvas, input, submarine, fishSchool1, fishSchool2, fishSchool3, fishSchool4, tunaSchool, dolphin, camera, hud, oceanScenery, game };
