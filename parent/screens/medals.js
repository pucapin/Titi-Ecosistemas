import { navigateTo } from "../app.js";

export default function renderResultsParent(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
            <div id="results-container">
                <h2>Puntos y medallas del niño</h2>
                <h3></h3> 
                <p id="child-points">Cargando puntos...</p>
                
                <div id="medals-container">
                    <h4>Estaciones Completadas</h4>
                    <div id="medals-list">Cargando medallas...</div>
                </div>

                <button id="go-screen-back">Volver</button>
            </div>
        `;

  const goBackButton = document.getElementById("go-screen-back");
  const pointsElement = document.getElementById("child-points");
  const medalsList = document.getElementById("medals-list");

  goBackButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const fetchChildData = async () => {
    try {
      const childId = localStorage.getItem("childId");
      
      if (!childId) {
        pointsElement.textContent = "No se encontró ID del niño";
        medalsList.textContent = "";
        return;
      }

      // Fetch Points
      try {
        const pointsResponse = await fetch(`http://localhost:5050/child/${childId}`);
        const pointsResult = await pointsResponse.json();

        if (pointsResult.success) {
          pointsElement.textContent = `Puntos: ${pointsResult.data.puntos}`;
          document.querySelector("h3").textContent = pointsResult.data.name;
        } else {
          pointsElement.textContent = "Error al cargar los puntos";
          console.error(pointsResult.error);
        }
      } catch (e) {
        pointsElement.textContent = "Error al cargar los puntos";
        console.error(e);
      }

      // Fetch Medals (Completed Stations)
      try {
        const stationsResponse = await fetch(`http://localhost:5050/stationchild/${childId}`);
        const stationsResult = await stationsResponse.json();

        if (stationsResult.success) {
          const completedStations = stationsResult.data.filter(item => item.completed);
          
          if (completedStations.length === 0) {
            medalsList.textContent = "Aún no ha completado ninguna estación.";
          } else {
            let html = '<ul style="list-style-type: none; padding: 0;">';
            
            completedStations.forEach(item => {
              const stationName = item.Estacion ? item.Estacion.name : `Estación ${item.id_estacion}`;
              
              let starsHtml = "";
              const correctCount = item.correctas || 0;
              for (let i = 0; i < correctCount; i++) {
                starsHtml += "⭐";
              }

              html += `<li style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
                        <div style="font-weight: bold;">${stationName}</div>
                        <div style="margin-top: 5px;">${starsHtml}</div>
                       </li>`;
            });
            
            html += '</ul>';
            medalsList.innerHTML = html;
          }
        } else {
          medalsList.textContent = "Error al cargar medallas";
          console.error(stationsResult.error);
        }
      } catch (e) {
        medalsList.textContent = "Error al cargar medallas";
        console.error(e);
      }

    } catch (error) {
      pointsElement.textContent = "Error de conexión";
      medalsList.textContent = "Error de conexión";
      console.error(error);
    }
  };

  fetchChildData();
}