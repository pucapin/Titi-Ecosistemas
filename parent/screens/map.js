import { navigateTo } from "../app.js";

export default function renderMapParent(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
            <div id="map-container">
                <h2>Progreso de Estaciones</h2>
                <div id="stations-list">Cargando estaciones...</div>
                <button id="go-screen-back">Volver</button>
            </div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const stationsList = document.getElementById("stations-list");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const fetchStationProgress = async () => {
    try {
      const childId = localStorage.getItem("childId");
      
      if (!childId) {
        stationsList.textContent = "No se encontró ID del niño";
        return;
      }

      try {
        const response = await fetch(`http://localhost:5050/stationchild/${childId}`);
        const result = await response.json();

        if (result.success) {
          if (result.data.length === 0) {
            stationsList.textContent = "No hay estaciones registradas yet.";
          } else {
            let html = '<ul style="list-style-type: none; padding: 0;">';
            
            result.data.forEach(item => {
              const stationName = item.Estacion ? item.Estacion.name : `Estación ${item.id_estacion}`;
              const status = item.completed ? "Completada" : "Pendiente";
              const color = item.completed ? "green" : "orange";
              
              let starsHtml = "";
              const correctCount = item.correctas || 0;
              for (let i = 0; i < correctCount; i++) {
                starsHtml += "⭐";
              }

              html += `<li style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                        <div style="font-weight: bold;">${stationName}</div>
                        <div style="color: ${color}; font-weight: bold;">${status}</div>
                        <div style="margin-top: 5px;">${starsHtml}</div>
                       </li>`;
            });
            
            html += '</ul>';
            stationsList.innerHTML = html;
          }
        } else {
          stationsList.textContent = "Error al cargar estaciones";
          console.error(result.error);
        }
      } catch (e) {
        stationsList.textContent = "Error al cargar estaciones";
        console.error(e);
      }

    } catch (error) {
      stationsList.textContent = "Error de conexión";
      console.error(error);
    }
  };

  fetchStationProgress();
}