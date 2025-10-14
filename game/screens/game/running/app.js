import { initScene, updateScene, drawScene, drawTrees } from "./scene.js";
import { initMonkey, updateMonkey, drawMonkey, jump, getMonkey } from "./monkey.js";
import { initBushes, updateBushes, drawBushes } from "./bushes.js";
import { initObstacle, updateObstacle, drawObstacle, checkCollisions, isGameOver } from "./obstacle.js";

// Configuración del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Mejorar la calidad de renderizado del canvas
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

// Estado del juego
const game = {
  width: canvas.width,
  height: canvas.height,
  running: true,
  speed: 3.5,
};

function gameLoop() {
  if (!game.running || isGameOver()) return;
  ctx.clearRect(0, 0, game.width, game.height);
  updateScene(game);
  updateMonkey(game);
  updateBushes(game);
  updateObstacle(game);
  
  // Verificar colisiones
  if (checkCollisions(getMonkey())) {
    game.running = false;
    return;
  }
  
  drawScene(ctx, game);
  drawObstacle(ctx);
  drawMonkey(ctx);
  drawTrees(ctx, game);
  drawBushes(ctx);
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      jump();
      break;
    case "ArrowUp":
      game.speed = Math.min(game.speed + 0.2, 3);
      break;
    case "ArrowDown":
      game.speed = Math.max(game.speed - 0.2, 0.5);
      break;
  }
});

async function initGame() {
  try {
    await Promise.all([initScene(ctx, game), initMonkey(game), initBushes(), initObstacle()]);
    gameLoop();
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
  }
}

window.addEventListener("load", initGame);
