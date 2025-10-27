import { navigateTo } from "../app.js";

export default async function renderMapParent(data) {
  const app = document.getElementById("app");
  //const childId = localStorage.getItem("childId");
  const childId = "2d422ead-9aa4-4d69-a8d9-7a1b89cd4c42"

  if (!childId) {
    app.innerHTML = `
      <div>
        <h1>Mapa de Estaciones</h1>
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
      <h1>Mapa de Estaciones</h1>
      <p>Cargando...</p>
    </div>
  `;

  try {
    const response = await fetch(`http://localhost:5050/stationchild/child/${childId}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error al cargar las estaciones");
    }

    const stations = result.data;

    if (stations.length === 0) {
      app.innerHTML = `
        <div>
          <h1>Mapa de Estaciones</h1>
          <p>El niño aún no ha visitado ninguna estación.</p>
          <button id="go-screen-back">Volver</button>
        </div>
      `;
    } else {
      const stationsHTML = stations.map((station, index) => {
        const estacion = station.Estacion;
        const nombreEstacion = estacion.name || `Estación ${index + 1}`;
        
        let medallasHTML = '';
        
        if (station.completed) {
          const correctas = station.correctas || 0;
          
          if (correctas === 0) {
            medallasHTML = '<p>Medalla</p>';
          } else if (correctas === 1) {
            medallasHTML = '<p>⭐ (1 estrella)</p>';
          } else if (correctas === 2) {
            medallasHTML = '<p>⭐⭐ (2 estrellas)</p>';
          } else if (correctas === 3) {
            medallasHTML = '<p>⭐⭐⭐ (3 estrellas)</p>';
          }
        } else {
          medallasHTML = '<p>No hay medallas todavía - No ha completado esta estación</p>';
        }
        
        return `
          <div>
            <h3>${nombreEstacion}</h3>
            <p><strong>Estado:</strong> ${station.completed ? 'Completada' : 'No completada'}</p>
            ${medallasHTML}
            <hr>
          </div>
        `;
      }).join('');

      app.innerHTML = `
        <div>
          <h1>Mapa de Estaciones</h1>
          <div>
            ${stationsHTML}
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
    console.error("Error al cargar las estaciones:", error);
    app.innerHTML = `
      <div>
        <h1>Mapa de Estaciones</h1>
        <p>Error al cargar las estaciones: ${error.message}</p>
        <button id="go-screen-back">Volver</button>
      </div>
    `;
    
    const goBackButton = document.getElementById("go-screen-back");
    goBackButton.addEventListener("click", () => {
      navigateTo("/");
    });
  }
}