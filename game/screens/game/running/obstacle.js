// Estado y lógica del obstáculo

import { getResource } from "./resources.js";

const obstacle = {
  image: null,
  instances: [],
  spawnTimer: 0,
  spawnInterval: 8000, // Aparecer cada 8 segundos
  speed: 0.4  ,
  scale: 0.5,
  width: getResource("obstacleWidth"),
  height: getResource("obstacleHeight"),
  isGameOver: false
};

/**
 * Carga la imagen del obstáculo
 * @returns {Promise<void>}
 */
export function initObstacle() {
  return new Promise((resolve, reject) => {
    obstacle.image = new Image();
    obstacle.image.onload = () => resolve();
    obstacle.image.onerror = reject;
    obstacle.image.src = getResource("obstacle");
  });
}

/**
 * Actualiza la lógica del obstáculo
 * @param {{speed:number,width:number}} game
 */
export function updateObstacle(game) {
  if (obstacle.isGameOver) return;
  
  // Actualizar velocidad del obstáculo para que coincida con el juego
  obstacle.speed = game.speed;
  
  // Incrementar timer de aparición
  obstacle.spawnTimer += 16; // Aproximadamente 60fps
  
  // Crear nuevo obstáculo si es tiempo
  if (obstacle.spawnTimer >= obstacle.spawnInterval) {
    const fixedY = game.height - 80 - (obstacle.height * obstacle.scale); // Ajusta el -160 para subir/bajar la rana
    
    obstacle.instances.push({
      image: obstacle.image,
      x: game.width + 20, // Ajusta el +50 para cambiar desde dónde aparece la rana
      y: fixedY
    });
    
    obstacle.spawnTimer = 0;
  }
  
  // Calcular dimensiones escaladas una sola vez
  const scaledWidth = obstacle.width * obstacle.scale;
  const removalThreshold = -scaledWidth - 50;
  
  // Actualizar posición y eliminar obstáculos fuera de pantalla en una sola pasada
  obstacle.instances = obstacle.instances.filter(obs => {
    obs.x -= obstacle.speed;
    return obs.x > removalThreshold;
  });
}

/**
 * Dibuja todos los obstáculos
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawObstacle(ctx) {
  // Calcular dimensiones escaladas una sola vez
  const scaledWidth = obstacle.width * obstacle.scale;
  const scaledHeight = obstacle.height * obstacle.scale;
  
  obstacle.instances.forEach(obs => {
    if (obs.image && obs.image.complete) {
      ctx.drawImage(
        obs.image,
        obs.x,
        obs.y,
        scaledWidth,
        scaledHeight
      );
    }
  });
}

/**
 * Verifica colisiones entre el mono y los obstáculos
 * @param {Object} monkey - Objeto del mono
 * @returns {boolean} - true si hay colisión
 */
export function checkCollisions(monkey) {
  if (obstacle.isGameOver) return true;
  
  const monkeyLeft = monkey.smoothX;
  const monkeyRight = monkeyLeft + monkey.width;
  const monkeyTop = monkey.smoothY - monkey.height;
  const monkeyBottom = monkey.smoothY;
  
  for (const obs of obstacle.instances) {
    const obsLeft = obs.x;
    const obsRight = obs.x + (obstacle.width * obstacle.scale);
    const obsTop = obs.y;
    const obsBottom = obs.y + (obstacle.height * obstacle.scale);
    
    // Verificar colisión rectangular
    if (monkeyLeft < obsRight && 
        monkeyRight > obsLeft && 
        monkeyTop < obsBottom && 
        monkeyBottom > obsTop) {
      obstacle.isGameOver = true;
      return true;
    }
  }
  
  return false;
}

/**
 * Detiene el juego
 */
export function stopGame() {
  obstacle.isGameOver = true;
}

/**
 * Reinicia el juego
 */
export function resetGame() {
  obstacle.isGameOver = false;
  obstacle.instances = [];
  obstacle.spawnTimer = 0;
}

/**
 * Obtener información del obstáculo
 */
export function getObstacle() {
  return obstacle;
}

/**
 * Verifica si el juego está en estado de game over
 */
export function isGameOver() {
  return obstacle.isGameOver;
}
