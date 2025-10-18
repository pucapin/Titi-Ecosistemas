import { initScene, updateScene, drawScene, drawTrees } from "./scene.js";
import { initMonkey, updateMonkey, drawMonkey, jump, getMonkey } from "./monkey.js";
import { initBushes, updateBushes, drawBushes } from "./bushes.js";
import { initObstacle, updateObstacle, drawObstacle, checkCollisions, isGameOver } from "./obstacle.js";
import { initBanana, updateBanana, drawBanana, checkBananaCollisions } from "./banana.js";
import { initHUD, updateHUD, drawHUD, addPoints, resetPoints } from "./hud.js";

// Configuración del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurar propiedades del canvas una sola vez para mejor rendimiento
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
ctx.textBaseline = "top";
ctx.textAlign = "left";

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
  updateBanana(game);
  updateHUD(game);
  
  // Verificar colisiones con obstáculos
  if (checkCollisions(getMonkey())) {
    game.running = false;
    return;
  }
  
  // Verificar colisiones con bananas y recolectar puntos
  const pointsCollected = checkBananaCollisions(getMonkey());
  if (pointsCollected > 0) {
    addPoints(pointsCollected);
  }
  
  drawScene(ctx, game);
  drawObstacle(ctx);
  drawBanana(ctx);
  drawMonkey(ctx);
  drawTrees(ctx, game);
  drawBushes(ctx);
  drawHUD(ctx);
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
    await Promise.all([
      initScene(ctx, game), 
      initMonkey(game), 
      initBushes(), 
      initObstacle(),
      initBanana(),
      initHUD()
    ]);
    gameLoop();
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
  }
}

window.addEventListener("load", initGame);
