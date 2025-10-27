// Estado y lógica del mono

const monkey = {
  x: 100,
  y: 0,
  width: 70,
  height: 85,
  scale: 2,
  frame: 0,
  animationSpeed: 0.5,
  frameCount: 0,
  isJumping: false,
  jumpFrame: 0,
  velocityY: 0,
  gravity: 0.2,
  jumpPower: -11.5,
  groundY: 0,
  smoothX: 200,
  smoothY: 0,
  targetX: 200,
  targetY: 0,
  frameProgress: 0,
  nextFrame: 1,
  currentFrameTime: 0,
  frameDuration: 500,
  images: {
    running1: null,
    running2: null,
    jumping1: null,
    jumping2: null,
  },
};

/**
 * Carga sprites del mono y configura posiciones iniciales
 * @param {{height:number}} game
 * @returns {Promise<void>}
 */
export function initMonkey(game) {
  return new Promise((resolve, reject) => {
    let loaded = 0;
    const total = 4;

    function onLoad() {
      loaded += 1;
      if (loaded === total) {
        monkey.groundY = game.height - 120;
        monkey.y = monkey.groundY;
        monkey.smoothY = monkey.groundY;
        monkey.targetY = monkey.groundY;
        resolve();
      }
    }

    function onError(e) {
      reject(e);
    }

    monkey.images.running1 = new Image();
    monkey.images.running1.onload = onLoad;
    monkey.images.running1.onerror = onError;
    monkey.images.running1.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/running1.svg";

    monkey.images.running2 = new Image();
    monkey.images.running2.onload = onLoad;
    monkey.images.running2.onerror = onError;
    monkey.images.running2.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/running2.svg";

    monkey.images.jumping1 = new Image();
    monkey.images.jumping1.onload = onLoad;
    monkey.images.jumping1.onerror = onError;
    monkey.images.jumping1.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/jumping1.svg";

    monkey.images.jumping2 = new Image();
    monkey.images.jumping2.onload = onLoad;
    monkey.images.jumping2.onerror = onError;
    monkey.images.jumping2.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/jumping2.svg";
  });
}

/** Actualiza animación, física y suavizado del mono */
export function updateMonkey() {
  if (monkey.isJumping) {
    monkey.currentFrameTime += 16;
    if (monkey.currentFrameTime >= monkey.frameDuration / 2) {
      monkey.jumpFrame = (monkey.jumpFrame + 1) % 2;
      monkey.currentFrameTime = 0;
    }
    monkey.y += monkey.velocityY;
    monkey.velocityY += monkey.gravity;
    monkey.targetY = monkey.y;
    if (monkey.y >= monkey.groundY) {
      monkey.y = monkey.groundY;
      monkey.isJumping = false;
      monkey.velocityY = 0;
      monkey.jumpFrame = 0;
      monkey.currentFrameTime = 0;
      monkey.targetY = monkey.groundY;
    }
  } else {
    monkey.currentFrameTime += 16;
    if (monkey.currentFrameTime >= monkey.frameDuration) {
      monkey.frame = (monkey.frame + 1) % 2;
      monkey.currentFrameTime = 0;
    }
    monkey.targetY = monkey.groundY;
  }

  const lerpFactor = 0.15;
  monkey.smoothY += (monkey.targetY - monkey.smoothY) * lerpFactor;
  monkey.smoothX += (monkey.targetX - monkey.smoothX) * lerpFactor;
}

/** Dibuja el mono */
export function drawMonkey(ctx) {
  let currentImage;
  if (monkey.isJumping) {
    currentImage =
      monkey.jumpFrame === 0 ? monkey.images.jumping2 : monkey.images.jumping1;
  } else {
    currentImage =
      monkey.frame === 0 ? monkey.images.running1 : monkey.images.running2;
  }
  if (currentImage && currentImage.complete) {
    const drawX = monkey.smoothX;
    const drawY = monkey.smoothY - monkey.height;
    let bounceOffset = 0;
    if (!monkey.isJumping) {
      const bounceTime =
        (monkey.currentFrameTime / monkey.frameDuration) * Math.PI * 2;
      bounceOffset = Math.sin(bounceTime) * 2;
    }
    
    // Calcular dimensiones escaladas una sola vez
    const scaledWidth = monkey.width * monkey.scale;
    const scaledHeight = monkey.height * monkey.scale;
    const centeredX = drawX - (scaledWidth - monkey.width) / 2;
    const centeredY = drawY + bounceOffset - (scaledHeight - monkey.height) / 2;
    
    ctx.drawImage(
      currentImage,
      centeredX,
      centeredY,
      scaledWidth,
      scaledHeight
    );
  }
}

export function jump() {
  if (!monkey.isJumping) {
    monkey.isJumping = true;
    monkey.velocityY = monkey.jumpPower;
  }
}

export function getMonkey() {
  return monkey;
}

/**
 * Reinicia el estado del mono
 */
export function resetMonkey() {
  monkey.frame = 0;
  monkey.frameCount = 0;
  monkey.isJumping = false;
  monkey.jumpFrame = 0;
  monkey.velocityY = 0;
  monkey.y = monkey.groundY;
  monkey.smoothY = monkey.groundY;
  monkey.targetY = monkey.groundY;
  monkey.frameProgress = 0;
  monkey.nextFrame = 1;
  monkey.currentFrameTime = 0;
}