import './styles/main.css';
import { getDomElements } from './ui/dom.js';
import { createCanvas } from './game/canvas.js';
import { createGame } from './game/game.js';
import { createInput } from './game/input.js';
import { createCamera } from './game/camera.js';
import { createSubmarine } from './entities/submarine.js';
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
const hud = createHud(dom.hud, submarine);
const oceanScenery = createOceanScenery();
const sunRays = createSunRays();
const game = createGame(canvas, [submarine], input, camera, hud, oceanScenery, sunRays);

game.start();

console.info(
  '[Deep Sea Adventure] Canvas configurado.',
  { width: canvas.width, height: canvas.height, world: { w: worldConfig.width, h: worldConfig.height } },
);

export { dom, canvas, input, submarine, camera, hud, oceanScenery, game };
