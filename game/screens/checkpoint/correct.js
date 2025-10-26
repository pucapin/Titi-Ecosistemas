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
  const checkpoint = Number(localStorage.getItem('checkpoint'));
  const answerEl = document.getElementById('answer')
    console.log(data.questionId)
    answerEl.textContent = 'La respuesta correcta es: ' + data.correctOption;

    // Volver al juego después de 3 segundos
timeoutId = setTimeout(() => {
  if (checkpoint === 3) {
    localStorage.setItem('checkpoint', JSON.stringify(0))
    navigateTo('/end');
    timeoutId = null;
    return;
  }
  navigateTo("/game");
  timeoutId = null;
}, 3000);

}