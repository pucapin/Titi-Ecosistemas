import { makeRequest, navigateTo } from "../app.js";

export default function renderEnd(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
            body {
            width: 100vw;
     height: 100vh;
     background: #FFF1E0;
     background-image: url(https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/webbg.png);
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
     margin: 0;
     padding: 0;

        }
  .box {
  margin-top: 100px;
display: flex;
width: 370px;
height: 700px;
padding: 7px 55px 20px 55px;
align-items: center;
gap: 10px;
flex-direction: column;
border-radius: 11.564px;
background: #FF9760;
box-shadow: 0 10px 0 0 #D05E3E;
  }
h1 {
color: #FFF3EA;
text-align: center;
font-family: Outfit;
font-size: 40px;
font-style: normal;
font-weight: 600;
line-height: 93%; /* 37.2px */
}
.box-points {
display: flex;
height: 142px;
padding: 22px 20px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
border-radius: 11.564px;
background: #FFF1E0;
box-shadow: 0 7px 0 0 rgba(0, 0, 0, 0.25);
}
h2 {
color: #FFC401;
font-family: Outfit;
font-size: 23px;
font-style: normal;
font-weight: 600;
margin: 0px;
}
#final-points {
color: #FFC401;
text-shadow: 2px 2px 0 rgba(251, 77, 80, 0.60);
font-family: Outfit;
font-size: 40px;
font-style: normal;
font-weight: 600;
}
.bananas {
  display: flex;
  flex-direction: row;
  align-items: center;
}
  #banana {
  width: 100px;
  height: auto;
  }
  </style>

    <div class="box">
    <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/titi0.png" width="300px"; height="auto">
      <h1>¡Estación completada!</h1>
      <div class="box-points">
      <h2>Banana Puntos:</h2>
      <div class="bananas">
      <h2 id="final-points">0</h2>
      
      <img src="https://cmyrktpbeqcoodpebbuz.supabase.co/storage/v1/object/public/Assets/banana.png" id="banana">
      </div>
      </div>
    </div>
  `;

  // Obtener puntos - primero intentar del data, luego del localStorage
  let points = 0;
  if (typeof data === 'number') {
    points = data;
  } else {
    const gamePoints = localStorage.getItem('gamePoints');
    points = gamePoints ? Number(JSON.parse(gamePoints)) : 0;
  }

  // Mostrar puntos
  document.getElementById('final-points').textContent = `${points}`;

  // Obtener childId
  const childId = localStorage.getItem("childId"); // Mismo ID que en options.js

  // Enviar puntos al servidor
  if (childId) {
    sendPointsToServer(childId, points).finally(() => {
        setTimeout(() => {
            navigateTo("/");
        }, 5000);
    });
  } else {
    console.error("No childId found in localStorage");
    setTimeout(() => {
        navigateTo("/");
    }, 5000);
  }
}

async function sendPointsToServer(childId, points) {
  try {
    const childResponse = await makeRequest(`/child/${childId}`, "GET");
    let currentPoints = 0;

    if (childResponse.success && childResponse.data && childResponse.data.puntos) {
      currentPoints = childResponse.data.puntos;
    }

    const newTotalPoints = currentPoints + points;

    const response = await makeRequest(`/child/${childId}/points`, "PATCH", {
      points: newTotalPoints
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