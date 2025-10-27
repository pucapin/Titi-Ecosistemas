// Sistema de HUD para mostrar puntos

const hud = {
  image: null,
  points: 0,
  position: {
    x: 0,
    y: 0
  },
  scale: 0.8,
  width: 200,
  height: 134.31,
  isGameOver: false
};

/**
 * Carga la imagen del HUD
 * @returns {Promise<void>}
 */
export function initHUD() {
  return new Promise((resolve, reject) => {
    hud.image = new Image();
    hud.image.onload = () => resolve();
    hud.image.onerror = reject;
    hud.image.src = "https://github.com/pucapin/Titi-Ecosistemas/blob/c3b80bb8d304de66f84df6d8ad1a9cc4f34c39db/assets/game/hud.png";
  });
}

/**
 * Actualiza la posición del HUD basado en el tamaño del canvas
 * @param {{width:number,height:number}} game
 */
export function updateHUD(game) {
  // Posicionar en la esquina superior derecha con margen
  hud.position.x = game.width - (hud.width * hud.scale) - 20;
  hud.position.y = 20;
}

/**
 * Dibuja el HUD con el puntaje actual
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawHUD(ctx) {
  if (hud.image && hud.image.complete) {
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    const scaledWidth = hud.width * hud.scale;
    const scaledHeight = hud.height * hud.scale;
    
    // Dibujar el fondo del HUD
    ctx.drawImage(
      hud.image,
      hud.position.x,
      hud.position.y,
      scaledWidth,
      scaledHeight
    );
    
    // Configurar la tipografía para el puntaje
    ctx.font = "bold 32px 'Outfit', Arial, sans-serif";
    ctx.fillStyle = "#FFC401"; // Color naranja para el texto
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Posicionar el texto en el centro del HUD
    const textX = hud.position.x + (scaledWidth / 1.33);
    const textY = hud.position.y + (scaledHeight / 1.9);
    
    // Dibujar el puntaje
    ctx.fillText(hud.points.toString(), textX, textY);
    
    ctx.restore();
  }
}

/**
 * Agrega puntos al puntaje
 * @param {number} points - Puntos a agregar
 */
export function addPoints(points) {
  hud.points += points;
}

/**
 * Obtiene el puntaje actual
 * @returns {number}
 */
export function getPoints() {
  return hud.points;
}

/**
 * Establece el puntaje
 * @param {number} points - Nuevo puntaje
 */
export function setPoints(points) {
  hud.points = points;
}

/**
 * Reinicia el puntaje
 */
export function resetPoints() {
  hud.points = 0;
}

/**
 * Detiene el HUD
 */
export function stopHUD() {
  hud.isGameOver = true;
}

/**
 * Obtener información del HUD
 */
export function getHUD() {
  return hud;
}
