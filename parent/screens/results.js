import { navigateTo } from "../app.js";

export default async function renderResultsParent(data) {
  const app = document.getElementById("app");
  //const childId = localStorage.getItem("childId");
  const childId = "08c79a34-c634-43af-8cfd-1c80a5927cb2"

  if (!childId) {
    app.innerHTML = `
      <div>
        <h1>Resultados</h1>
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
      <h1>Resultados</h1>
      <p>Cargando...</p>
    </div>
  `;

  try {
    const response = await fetch(`http://localhost:5050/questions/child/${childId}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error al cargar los resultados");
    }

    const answers = result.data;

    if (answers.length === 0) {
      app.innerHTML = `
        <div>
          <h1>Resultados</h1>
          <p>El niño aún no ha respondido ninguna pregunta.</p>
          <button id="go-screen-back">Volver</button>
        </div>
      `;
    } else {
      const resultsHTML = answers.map((answer, index) => {
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
            <p><strong>Respuesta del niño:</strong> ${userOption} - ${userAnswerText}</p>
            <p><strong>Estado:</strong> ${answer.correcta ? '✓ Correcta' : '✗ Incorrecta'}</p>
            <hr>
          </div>
        `;
      }).join('');

      const correctCount = answers.filter(a => a.correcta).length;
      const totalCount = answers.length;

      app.innerHTML = `
        <div>
          <h1>Resultados</h1>
          <p>Total: ${totalCount} preguntas | Correctas: ${correctCount} | Incorrectas: ${totalCount - correctCount}</p>
          <div>
            ${resultsHTML}
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
    console.error("Error al cargar los resultados:", error);
    app.innerHTML = `
      <div>
        <h1>Resultados</h1>
        <p>Error al cargar los resultados: ${error.message}</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;
    
    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}