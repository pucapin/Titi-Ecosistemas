import { navigateTo } from "../../app.js";

let timeoutId = null;

export default function renderCorrect(data) {
  // Cancelar cualquier timeout anterior
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  const app = document.getElementById("app");
  app.innerHTML = `
        <div>
        <h1>
        Correcto!
        </h1>
        </div>
        `;
  const checkpoint = Number(localStorage.getItem('checkpoint'));

  // Volver al juego después de 3 segundos
timeoutId = setTimeout(() => {
  if (checkpoint === 3) {
    localStorage.setItem('checkpoint', JSON.stringify(0))
    // Obtener los puntos antes de navegar (NO los borramos aún)
    const gamePoints = localStorage.getItem('gamePoints');
    const points = gamePoints ? Number(JSON.parse(gamePoints)) : 0;
    navigateTo('/end', points);
    timeoutId = null;
    return;
  }
  navigateTo("/game");
  timeoutId = null;
}, 3000);

}