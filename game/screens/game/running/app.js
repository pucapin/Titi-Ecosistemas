const socket = io("/", { path: "/real-time" });

import { initScene, updateScene, drawScene, drawTrees, resetScene } from "./scene.js";
import { initMonkey, updateMonkey, drawMonkey, jump, getMonkey, resetMonkey } from "./monkey.js";
import { initBushes, updateBushes, drawBushes, resetBushes } from "./bushes.js";
import { initObstacle, updateObstacle, drawObstacle, checkCollisions, isGameOver, resetGame as resetObstacle } from "./obstacle.js";
import { initBanana, updateBanana, drawBanana, checkBananaCollisions, resetBanana, getBananaSpawnedCount } from "./banana.js";
import { initHUD, updateHUD, drawHUD, addPoints, resetPoints } from "./hud.js";
import { navigateTo } from "../../../app.js";
import { makeRequest } from "../../../app.js";

// Variables globales para el juego
let canvas;
let ctx;
let game;
let animationFrameId;
let keydownHandler;
let navigationTimeoutId = null;


let checkpoints = ['0f65a854-4895-4b64-828a-d1505e92dbfe', '29ff798a-4ec9-414d-ad28-b70c8d43aae7', '4560b48d-3509-4faf-b92f-1ec1f61ccf40', '7910659b-7d97-43df-9403-660be15d9c3b', 'c68d7e1c-b874-4f43-b9e2-bd2cae3b9457', 'cfce72a3-c24b-4614-93e6-e9d2c14e9ae3' ];

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

  if (!localStorage.getItem('checkpointOrder')) {
  let shuffled = [...checkpoints].sort(() => Math.random() - 0.5);
  localStorage.setItem('checkpointOrder', JSON.stringify(shuffled.slice(0, 3)));
}
  
  // Verificar si han aparecido 6 bananas
  if (getBananaSpawnedCount() >= 5) {
    game.running = false;
    // Cancelar el loop de animación
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    let checkNumber = Number(localStorage.getItem('checkpoint'));
    const order = JSON.parse(localStorage.getItem('checkpointOrder'));
    const nextCheckpoint = order[checkNumber];

    checkNumber += 1;
    localStorage.setItem('checkpoint', JSON.stringify(checkNumber))

    //Send event to phone  or child client
    makeRequest(`/checkpoint/show/${nextCheckpoint}`, "POST");
    // Navigate to question screen
    navigateTo("/question", nextCheckpoint);

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
// Definir el socket.on

keydownHandler = (event) => {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      jump();
      break;
  }
};

socket.on("jumpUp", () => {
  jump()
})

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
