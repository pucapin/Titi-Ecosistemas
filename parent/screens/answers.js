import { navigateTo, makeRequest } from "../app.js";

export default async function renderAnswers(data) {
  const app = document.getElementById("app");
  //const childId = localStorage.getItem("childId");
    const childId = "08c79a34-c634-43af-8cfd-1c80a5927cb2"

  if (!childId) {
    app.innerHTML = `
      <div>
        <h1>Preguntas y Respuestas del Niño</h1>
        <p>No hay un niño registrado.</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;
    
    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });
    return;
  }

  // Mostrar loading
  app.innerHTML = `
    <div>
      <h1>Preguntas y Respuestas del Niño</h1>
      <p>Cargando...</p>
    </div>
  `;

  try {
    const response = await fetch(`http://localhost:5050/questions/child/${childId}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error al cargar las respuestas");
    }

    const answers = result.data;

    if (answers.length === 0) {
      app.innerHTML = `
        <div>
          <h1>Preguntas y Respuestas del Niño</h1>
          <p>El niño aún no ha respondido ninguna pregunta.</p>
          <button id="go-screen-back">Volver</button>
        </div>
      `;
    } else {
      const answersHTML = answers.map((answer, index) => {
        const question = answer.Preguntas;
        const optionLabels = { a: 'A', b: 'B', c: 'C', d: 'D' };
        const userOption = optionLabels[answer.respuesta];
        
        // Obtener el texto de la opción seleccionada
        const optionTexts = {
          a: question.opcion_a,
          b: question.opcion_b,
          c: question.opcion_c,
          d: question.opcion_d
        };
        const userAnswerText = optionTexts[answer.respuesta];
        
        return `
          <div>
            <h3>Pregunta ${index + 1}</h3>
            <p><strong>Pregunta:</strong> ${question.pregunta}</p>
            <p><strong>Respuesta del niño:</strong> ${userOption} - ${userAnswerText}</p>
            <hr>
          </div>
        `;
      }).join('');


      app.innerHTML = `
        <div>
          <h1>Preguntas y Respuestas del Niño</h1>
          <div>
            ${answersHTML}
          </div>
          <button id="go-screen-back">Volver</button>
        </div>
      `;
    }

    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });

  } catch (error) {
    console.error("Error al cargar las respuestas:", error);
    app.innerHTML = `
      <div>
        <h1>Preguntas y Respuestas del Niño</h1>
        <p>Error al cargar las respuestas: ${error.message}</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;
    
    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}