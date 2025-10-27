// Estado y lógica de las bananas (coleccionables de puntos)

const banana = {
  image: null,
  instances: [],
  spawnTimer: 0,
  spawnInterval: 5000, // Aparecer cada 5 segundos
  speed: 0.4,
  scale: 2,
  width: 50,
  height: 50,
  points: 50, // Puntos por banana
  isGameOver: false,
  spawnedCount: 0 // Contador de bananas que han aparecido
};

/**
 * Carga la imagen de la banana
 * @returns {Promise<void>}
 */
export function initBanana() {
  return new Promise((resolve, reject) => {
    banana.image = new Image();
    banana.image.onload = () => resolve();
    banana.image.onerror = reject;
    banana.image.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/banana.png";
  });
}

/**
 * Actualiza la lógica de las bananas
 * @param {{speed:number,width:number,height:number}} game
 */
export function updateBanana(game) {
  if (banana.isGameOver) return;
  
  // Actualizar velocidad de las bananas para que coincida con el juego
  banana.speed = game.speed;
  
  // Incrementar timer de aparición
  banana.spawnTimer += 16; // Aproximadamente 60fps
  
  // Crear nueva banana si es tiempo
  if (banana.spawnTimer >= banana.spawnInterval) {
    // Posición Y fija para que todas las bananas estén alineadas
    // Zona segura: más arriba que los obstáculos (ranas aparecen en game.height - 80)
    const fixedY = game.height - 200; // Posición fija a 300px del suelo
    
    banana.instances.push({
      image: banana.image,
      x: game.width + 20,
      y: fixedY
    });
    
    // Incrementar contador de bananas aparecidas
    banana.spawnedCount++;
    
    banana.spawnTimer = 0;
  }
  
  // Calcular dimensiones escaladas una sola vez
  const scaledWidth = banana.width * banana.scale;
  const removalThreshold = -scaledWidth - 50;
  
  // Actualizar posición y eliminar bananas fuera de pantalla en una sola pasada
  banana.instances = banana.instances.filter(bananaInstance => {
    bananaInstance.x -= banana.speed;
    return bananaInstance.x > removalThreshold;
  });
}

/**
 * Dibuja todas las bananas
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawBanana(ctx) {
  // Calcular dimensiones escaladas una sola vez
  const scaledWidth = banana.width * banana.scale;
  const scaledHeight = banana.height * banana.scale;
  
  banana.instances.forEach(bananaInstance => {
    if (bananaInstance.image && bananaInstance.image.complete) {
      ctx.drawImage(
        bananaInstance.image,
        bananaInstance.x,
        bananaInstance.y,
        scaledWidth,
        scaledHeight
      );
    }
  });
}

/**
 * Verifica colisiones entre el mono y las bananas
 * @param {Object} monkey - Objeto del mono
 * @returns {number} - Número de puntos recolectados
 */
export function checkBananaCollisions(monkey) {
  if (banana.isGameOver) return 0;
  
  let pointsCollected = 0;
  
  // Calcular bounds del mono una sola vez
  const monkeyLeft = monkey.smoothX;
  const monkeyRight = monkeyLeft + monkey.width;
  const monkeyTop = monkey.smoothY - monkey.height;
  const monkeyBottom = monkey.smoothY;
  
  // Calcular dimensiones escaladas una sola vez
  const scaledWidth = banana.width * banana.scale;
  const scaledHeight = banana.height * banana.scale;
  
  // Verificar colisiones y recolectar bananas
  banana.instances = banana.instances.filter(bananaInstance => {
    const bananaLeft = bananaInstance.x;
    const bananaRight = bananaLeft + scaledWidth;
    const bananaTop = bananaInstance.y;
    const bananaBottom = bananaTop + scaledHeight;
    
    // Verificar colisión rectangular
    if (monkeyLeft < bananaRight && 
        monkeyRight > bananaLeft && 
        monkeyTop < bananaBottom && 
        monkeyBottom > bananaTop) {
      pointsCollected += banana.points;
      return false; // Eliminar la banana recolectada
    }
    
    return true; // Mantener la banana
  });
  
  return pointsCollected;
}

/**
 * Detiene el juego
 */
export function stopBanana() {
  banana.isGameOver = true;
}

/**
 * Reinicia el juego
 */
export function resetBanana() {
  banana.isGameOver = false;
  banana.instances = [];
  banana.spawnTimer = 0;
  banana.spawnedCount = 0;
}

/**
 * Obtener información de las bananas
 */
export function getBanana() {
  return banana;
}

/**
 * Obtener el contador de bananas que han aparecido
 */
export function getBananaSpawnedCount() {
  return banana.spawnedCount;
}
