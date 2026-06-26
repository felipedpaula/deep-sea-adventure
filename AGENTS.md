# AGENTS.md

## Commands

- Use npm; `package-lock.json` is the only lockfile.
- Install with `npm install` on Node 18+; README recommends Node 20+.
- Dev server: `npm run dev` (Vite, default `http://localhost:5173/`).
- Production build: `npm run build` writes `dist/`.
- Preview built output: `npm run preview` (default `http://localhost:4173/`).
- Lint: `npm run lint` (`eslint .`, flat config in `eslint.config.js`).
- There is no configured test or typecheck script; use `npm run lint` and `npm run build` for automated verification.

## Project Shape

- Browser-only Vite app using plain ES modules, HTML/CSS, Canvas 2D, and DOM UI; `index.html` loads `/src/main.js`.
- `src/main.js` is the bootstrap: DOM lookup, canvas, input, submarine, camera, HUD, scenery, sun rays, then `game.start()`.
- `src/game/game.js` owns the requestAnimationFrame loop, pause/resume on `visibilitychange`, update/render order, and HUD updates.
- `src/config/` holds gameplay constants. Prefer changing config there instead of hardcoding values in entities/scenes.
- `specs/` documents incremental stages. Current README marks Specs 001-008 done; Spec 009+ animals/items/achievements/persistence are not implemented yet.

## Rendering And Coordinates

- Game entities use world coordinates, not screen coordinates. The camera transform is applied before rendering world objects.
- Canvas background and sun rays render in screen space before `camera.apply(ctx)`; scenery and entities render after it; HUD stays DOM/screen-space.
- Depth is derived from world Y using `worldConfig.pixelsPerMeter` (`10px = 1m`); current world is `6000 x 22000` and max depth is `2200m`.
- Mouse movement must convert screen coordinates with `camera.screenToWorld(...)` before steering world-space entities.
- Canvas sizing uses CSS pixels for viewport getters and caps DPR via `canvasConfig.maxDpr`; do not mix raw canvas backing pixels into game coordinates.
- Animated SVG animals that rely on internal CSS keyframes must be rendered as DOM `<img>` elements inside `#app`, positioned each frame with `camera.worldToScreen(...)`; do not draw those SVGs with canvas `drawImage()` because that freezes the embedded animation.

## Implementation Conventions

- Entities are factory functions returning `state`, `update(dt, input, camera)`, and `render(ctx)`; `submarine.js` is the current example.
- Scenery generation is deterministic and created once in factories, with viewport culling during render. Avoid regenerating decorative elements per frame.
- Controls are fixed in `src/game/input.js`: arrows/WASD move, Shift boosts, left mouse steers, right mouse boosts, and context menu is suppressed on the canvas.
- Imported assets go through Vite module imports, as in `src/entities/submarine.js` importing the submarine PNG.
- For animated animal SVGs, append DOM `<img>` nodes with `position: absolute`, `pointer-events: none`, and a z-index above the canvas; movement still uses world coordinates and entity `update/render`, but `render` should update DOM position and `scaleX(...)` for facing direction.
- If a completed spec changes behavior or scope, keep README status and the relevant `specs/*.md` acceptance notes consistent.

## Documentation Maintenance

- After any change that affects project structure, commands, conventions, or spec status, update `README.md` and this file (`AGENTS.md`) as needed.
- `README.md` is the user-facing reference; keep it accurate for humans.
- `AGENTS.md` is the agent-facing reference; keep it accurate for future OpenCode sessions.
