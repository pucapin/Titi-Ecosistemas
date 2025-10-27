import { navigateTo, makeRequest } from "../../app.js";

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
        <h2 id="answer"></h2>
        </div>
        `;
  const stationId = '162cdd3f-c666-46b4-8412-a998dd54ff76'; // Mocked por ahora
  const childId = data.childId;
  const correctAnswers = Number(localStorage.getItem('correctAnswers'));
  const checkpoint = Number(localStorage.getItem('checkpoint'));
  const answerEl = document.getElementById('answer')
    answerEl.textContent = 'La respuesta correcta es: ' + data.correctOption;

    // Volver al juego después de 3 segundos
timeoutId = setTimeout(() => {
  if (checkpoint === 3) {

    localStorage.setItem('checkpoint', JSON.stringify(0))
    // Obtener los puntos antes de navegar (NO los borramos aún)
    const gamePoints = localStorage.getItem('gamePoints');
    const points = gamePoints ? Number(JSON.parse(gamePoints)) : 0;
    localStorage.removeItem('checkpointOrder')
    makeRequest(`/stationchild/end`, "POST", {childId: childId, stationId: stationId, completed: true, correctas: correctAnswers});
    localStorage.removeItem('correctAnswers');
    navigateTo('/end', points);
    timeoutId = null;
    return;
  }
  navigateTo("/game");
  timeoutId = null;
}, 3000);

}