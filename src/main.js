import './styles/main.css';
import { getDomElements } from './ui/dom.js';
import { createCanvas } from './game/canvas.js';
import { createGame } from './game/game.js';
import { createInput } from './game/input.js';
import { createCamera } from './game/camera.js';
import { createSubmarine } from './entities/submarine.js';
import { createFishSchool } from './entities/fish-school.js';
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
  amplitude: 300,
  speed: 0.3,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const fishSchool2 = createFishSchool({
  centerX: 2000,
  centerY: 1200,
  amplitude: 270,
  speed: 0.28,
  fishWidth: 35,
  fishHeight: 35,
  camera,
});
const hud = createHud(dom.hud, submarine);
const oceanScenery = createOceanScenery();
const sunRays = createSunRays();
const game = createGame(canvas, [submarine, fishSchool1, fishSchool2], input, camera, hud, oceanScenery, sunRays);

game.start();

console.info(
  '[Deep Sea Adventure] Canvas configurado.',
  { width: canvas.width, height: canvas.height, world: { w: worldConfig.width, h: worldConfig.height } },
);

export { dom, canvas, input, submarine, fishSchool1, fishSchool2, camera, hud, oceanScenery, game };
