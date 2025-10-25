import { navigateTo } from "../../app.js";

let timeoutId = null;

export default function renderIncorrect(data) {
  // Cancelar cualquier timeout anterior
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  const app = document.getElementById("app");
  app.innerHTML = `
        <div>
        <h1>
        Incorrecto!
        </h1>
        </div>
        `;

  // Volver al juego después de 3 segundos
  timeoutId = setTimeout(() => {
    navigateTo("/game");
    timeoutId = null;
  }, 3000);
}