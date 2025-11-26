import { navigateTo } from "../app.js";

export default function renderAnswers(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
            <div id="results-container">
                
                <h3>Respuestas del niño</h3>
                <div id="answers-container">Cargando respuestas...</div>

                <button id="go-screen-back">Volver</button>
            </div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const answersContainer = document.getElementById("answers-container");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const fetchChildData = async () => {
    try {
      const childId = localStorage.getItem("childId");
      
      if (!childId) {
        answersContainer.textContent = "";
        return;
      }

      // Fetch Answers
      try {
        const answersResponse = await fetch(`https://backend-three-rho-19.vercel.app/child/${childId}/answers`);
        const answersResult = await answersResponse.json();

        if (answersResult.success) {
          if (answersResult.data.length === 0) {
            answersContainer.textContent = "No hay respuestas registradas yet.";
          } else {
            let html = '<ul style="list-style-type: none; padding: 0;">';
            
            answersResult.data.forEach(item => {
              
              let answerText = item.respuesta;
              if (item.Preguntas && item.respuesta) {
                const letter = item.respuesta.toLowerCase();
                const key = `opcion_${letter}`;
                if (item.Preguntas[key]) {
                  answerText = item.Preguntas[key];
                }
              }

              const isCorrect = item.correcta ? "Correcta" : "Incorrecta";
              const color = item.correcta ? "green" : "red";

              html += `<li style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                        <div>R: ${answerText}</div>
                        <div style="color: ${color}; font-weight: bold;">${isCorrect}</div>
                       </li>`;
            });
            
            html += '</ul>';
            answersContainer.innerHTML = html;
          }
        } else {
          answersContainer.textContent = "Error al cargar las respuestas";
          console.error(answersResult.error);
        }
      } catch (e) {
        answersContainer.textContent = "Error al cargar las respuestas";
        console.error(e);
      }

    } catch (error) {
      answersContainer.textContent = "Error de conexión";
      console.error(error);
    }
  };

  fetchChildData();
}