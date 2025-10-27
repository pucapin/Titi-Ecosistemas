import { navigateTo } from "../app.js";

export default async function renderMedals(data) {
  const app = document.getElementById("app");
  //const childId = localStorage.getItem("childId");
  const childId = "08c79a34-c634-43af-8cfd-1c80a5927cb2"

  if (!childId) {
    app.innerHTML = `
      <div>
        <h1>Puntos</h1>
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
      <h1>Puntos</h1>
      <p>Cargando...</p>
    </div>
  `;

  try {
    const response = await fetch(`http://localhost:5050/child/${childId}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error al cargar los datos");
    }

    const child = result.data;
    const points = child.puntos || 0;

    app.innerHTML = `
      <div>
        <h1>Puntos de ${child.name}</h1>
        <p>Puntos totales: ${points}</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;

    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });

  } catch (error) {
    console.error("Error al cargar los puntos:", error);
    app.innerHTML = `
      <div>
        <h1>Puntos</h1>
        <p>Error al cargar los puntos: ${error.message}</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;
    
    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}