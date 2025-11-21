import { makeRequest, navigateTo } from "../app.js";

export default function renderEnd(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div>
      <h1>¡Juego Terminado!</h1>
      <h2 id="final-points">Puntos: 0</h2>
    </div>
  `;

  // Obtener puntos - primero intentar del data, luego del localStorage
  let points = 0;
  if (data && typeof data === 'number') {
    points = data;
  } else {
    const gamePoints = localStorage.getItem('gamePoints');
    points = gamePoints ? Number(JSON.parse(gamePoints)) : 0;
  }
  
  // Mostrar puntos
  document.getElementById('final-points').textContent = `Puntos: ${points}`;

  // Obtener childId
  const childId = localStorage.getItem("childId"); // Mismo ID que en options.js
  
  // Enviar puntos al servidor
  sendPointsToServer(childId, points);

  setTimeout(() => {
  navigateTo("/"); 
}, 5000);
}

async function sendPointsToServer(childId, points) {
  try {
    const response = await makeRequest(`/child/${childId}/points`, "PATCH", { 
      points: points 
    });
    
    if (response.success) {
      console.log('Points saved:', response);
      
      // Limpiar los puntos del localStorage DESPUÉS de enviarlos exitosamente
      localStorage.removeItem('gamePoints');
      localStorage.setItem('checkpointOrder', JSON.stringify([]));
    } else {
      console.error('Error saving points:', response.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}