import { initScene, updateScene, drawScene, drawTrees, resetScene } from "./scene.js";
import { initMonkey, updateMonkey, drawMonkey, jump, getMonkey, resetMonkey } from "./monkey.js";
import { initBushes, updateBushes, drawBushes, resetBushes } from "./bushes.js";
import { initObstacle, updateObstacle, drawObstacle, checkCollisions, isGameOver, resetGame as resetObstacle } from "./obstacle.js";
import { initBanana, updateBanana, drawBanana, checkBananaCollisions, resetBanana, getBananaSpawnedCount } from "./banana.js";
import { initHUD, updateHUD, drawHUD, addPoints, resetPoints } from "./hud.js";
import { navigateTo } from "../../../app.js";

// Variables globales para el juego
let canvas;
let ctx;
let game;
let animationFrameId;
let keydownHandler;
let navigationTimeoutId = null;

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
    // Cancelar el loop de animación
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    // Cancelar timeout anterior si existe
    if (navigationTimeoutId) {
      clearTimeout(navigationTimeoutId);
    }
    // Navigate to lost screen
    navigateTo("/lost");
    // Restart game after 3 seconds
    navigationTimeoutId = setTimeout(() => {
      navigateTo("/game");
      navigationTimeoutId = null;
    }, 3000);
    return;
  }
  
  // Verificar colisiones con bananas y recolectar puntos
  const pointsCollected = checkBananaCollisions(getMonkey());
  if (pointsCollected > 0) {
    addPoints(pointsCollected);
  }
  
  // Verificar si han aparecido 6 bananas
  if (getBananaSpawnedCount() >= 4) {
    game.running = false;
    // Cancelar el loop de animación
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    // Navigate to question screen
    navigateTo("/question");
    return;
  }
  
  drawScene(ctx, game);
  drawObstacle(ctx);
  drawBanana(ctx);
  drawMonkey(ctx);
  drawTrees(ctx, game);
  drawBushes(ctx);
  drawHUD(ctx);
  animationFrameId = requestAnimationFrame(gameLoop);
}

// Definir el handler de teclado
keydownHandler = (event) => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      jump();
      break;
  }
};

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

function resetGameState() {
  // Cancelar el loop anterior si existe
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // Reiniciar estado del juego
  game = {
    width: canvas.width,
    height: canvas.height,
    running: true,
    speed: 3.5,
  };
  
  // Reiniciar todos los componentes del juego
  resetObstacle();
  resetPoints();
  resetBanana();
  resetMonkey();
  resetBushes();
  resetScene();
}

export async function startGame() {
  // Cancelar cualquier loop de animación anterior
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // Cancelar cualquier timeout de navegación pendiente
  if (navigationTimeoutId) {
    clearTimeout(navigationTimeoutId);
    navigationTimeoutId = null;
  }
  
  // Obtener el canvas del DOM
  canvas = document.getElementById("gameCanvas");
  if (!canvas) {
    console.error("Canvas no encontrado");
    return;
  }
  
  ctx = canvas.getContext("2d");
  
  // Configurar propiedades del canvas
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  
  // Remover el listener anterior si existe para evitar duplicados
  if (keydownHandler) {
    document.removeEventListener("keydown", keydownHandler);
  }
  
  // Agregar el listener de teclado
  document.addEventListener("keydown", keydownHandler);
  
  // Inicializar o reiniciar el estado del juego
  if (!game) {
    game = {
      width: canvas.width,
      height: canvas.height,
      running: true,
      speed: 3.5,
    };
  } else {
    resetGameState();
  }
  
  // Iniciar el juego
  await initGame();
}
