// Estado y lógica de los arbustos

const bushes = {
  images: {
    bush1: null,
    bush2: null
  },
  instances: [],
  spawnTimer: 5000, // Empezar listo para crear el primer arbusto
  spawnInterval: 5000, // Aparecer cada 5 segundos
  speed: 2.5,
  scale: 2.2,
  width: 120,
  height: 100
};

/**
 * Carga las imágenes de los arbustos
 * @returns {Promise<void>}
 */
export function initBushes() {
  return new Promise((resolve, reject) => {
    let loaded = 0;
    const total = 2;

    function onLoad() {
      loaded += 1;
      if (loaded === total) {
        resolve();
      }
    }

    function onError(e) {
      reject(e);
    }

    bushes.images.bush1 = new Image();
    bushes.images.bush1.onload = onLoad;
    bushes.images.bush1.onerror = onError;
    bushes.images.bush1.src = "/assets/game/bush1.svg";

    bushes.images.bush2 = new Image();
    bushes.images.bush2.onload = onLoad;
    bushes.images.bush2.onerror = onError;
    bushes.images.bush2.src = "/assets/game/bush2.svg";
  });
}

/**
 * Actualiza la lógica de los arbustos
 * @param {{speed:number,width:number}} game
 */
export function updateBushes(game) {
  // Actualizar velocidad de los arbustos para que coincida con el juego
  bushes.speed = game.speed;
  
  // Incrementar timer de aparición
  bushes.spawnTimer += 16; // Aproximadamente 60fps
  
  // Crear nuevo arbusto si es tiempo
  if (bushes.spawnTimer >= bushes.spawnInterval) {
    const randomBush = Math.random() < 0.5 ? 'bush1' : 'bush2';
    const fixedY = 450; // Posición Y fija
    
    bushes.instances.push({
      image: bushes.images[randomBush],
      x: game.width + 50, // Empezar fuera de la pantalla
      y: fixedY,
      type: randomBush
    });
    
    bushes.spawnTimer = 0;
  }
  
  // Actualizar posición de los arbustos existentes
  bushes.instances.forEach(bush => {
    bush.x -= bushes.speed;
  });
  
  // Eliminar arbustos que salieron de la pantalla (con margen para desaparición suave)
  const scaledWidth = bushes.width * bushes.scale;
  bushes.instances = bushes.instances.filter(bush => bush.x > -scaledWidth - 50);
}

/**
 * Dibuja todos los arbustos
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawBushes(ctx) {
  bushes.instances.forEach(bush => {
    if (bush.image && bush.image.complete) {
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      const scaledWidth = bushes.width * bushes.scale;
      const scaledHeight = bushes.height * bushes.scale;
      
      ctx.drawImage(
        bush.image,
        bush.x,
        bush.y,
        scaledWidth,
        scaledHeight
      );
      
      ctx.restore();
    }
  });
}

/**
 * Obtener información de los arbustos (opcional)
 */
export function getBushes() {
  return bushes;
}

/**
 * Reinicia el estado de los arbustos
 */
export function resetBushes() {
  bushes.instances = [];
  bushes.spawnTimer = 5000;
}