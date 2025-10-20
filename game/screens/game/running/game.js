import { startGame } from "./app.js";

export default function renderGame(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
        el juego (titi corre)
        
        <link rel="stylesheet" href="/game/screens/game/running/styles.css">
    <div class="game-container">
        <canvas id="gameCanvas" width="1800" height="600" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"></canvas>
        
    </div>
        `;

  // Iniciar el juego después de que el canvas esté en el DOM
  setTimeout(() => {
    startGame();
  }, 0);
}