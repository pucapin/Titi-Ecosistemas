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
  isGameOver: false
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
    banana.image.src = "/assets/game/banana.png";
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
    
    banana.spawnTimer = 0;
  }
  
  // Actualizar posición de las bananas existentes
  banana.instances.forEach(bananaInstance => {
    bananaInstance.x -= banana.speed;
  });
  
  // Eliminar bananas que salieron de la pantalla
  const scaledWidth = banana.width * banana.scale;
  banana.instances = banana.instances.filter(bananaInstance => bananaInstance.x > -scaledWidth - 50);
}

/**
 * Dibuja todas las bananas
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawBanana(ctx) {
  banana.instances.forEach(bananaInstance => {
    if (bananaInstance.image && bananaInstance.image.complete) {
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      const scaledWidth = banana.width * banana.scale;
      const scaledHeight = banana.height * banana.scale;
      
      ctx.drawImage(
        bananaInstance.image,
        bananaInstance.x,
        bananaInstance.y,
        scaledWidth,
        scaledHeight
      );
      
      ctx.restore();
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
  
  const monkeyLeft = monkey.smoothX;
  const monkeyRight = monkeyLeft + monkey.width;
  const monkeyTop = monkey.smoothY - monkey.height;
  const monkeyBottom = monkey.smoothY;
  
  // Verificar colisiones y recolectar bananas
  banana.instances = banana.instances.filter(bananaInstance => {
    const bananaLeft = bananaInstance.x;
    const bananaRight = bananaInstance.x + (banana.width * banana.scale);
    const bananaTop = bananaInstance.y;
    const bananaBottom = bananaInstance.y + (banana.height * banana.scale);
    
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
}

/**
 * Obtener información de las bananas
 */
export function getBanana() {
  return banana;
}
