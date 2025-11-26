import { makeRequest, navigateTo } from "../app.js";

export default function renderEnd(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
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
           <svg xmlns="http://www.w3.org/2000/svg" width="502" height="109" viewBox="0 0 502 109" fill="none" class="top-decoration">
  <path d="M426.088 -19.6621C392.181 3.03244 343.864 28.7606 290.586 46.7979C287.973 36.9573 279.75 23.532 261.676 28.249C263.391 35.2966 269.075 47.0708 279.791 50.3242C272.9 52.4919 265.939 54.5233 258.927 56.3936C219.779 37.6045 181.292 12.6879 144.245 -19.5098L142.934 -18L141.621 -16.4902C177.618 14.7953 214.968 39.2578 252.959 57.9424C249.351 58.8535 245.731 59.7201 242.103 60.541C242.1 60.516 242.097 60.4909 242.094 60.4658C241.519 60.5916 240.91 60.7523 240.273 60.9492C230.188 63.1852 220.034 65.0599 209.869 66.5029C203.23 67.4454 196.588 68.2037 189.96 68.7627C187.644 58.3991 179.515 42.472 161.142 45.3438C162.843 52.5271 168.266 64.6954 178.249 69.5381C147.23 71.0221 116.702 67.853 88.2646 58.1934C88.8513 47.5026 85.4177 29.4516 67.2217 25.4697C66.9143 32.5593 68.5919 45.1784 75.8164 53.4863C42.9645 39.7529 13.3653 16.5692 -10.334 -19.1064L-13.666 -16.8936C21.8435 36.5608 70.3295 62.4673 122.994 70.7852C115.75 73.4698 108.622 79.8852 106.305 93.3115C114.501 93.9106 131.354 90.4497 136.335 72.5127C160.597 74.987 185.572 73.9918 210.431 70.4629C216.711 69.5713 222.986 68.5148 229.243 67.3145C223.27 72.7538 218.524 81.63 220.335 95.1191C228.053 92.4342 242.425 82.7307 242.349 64.584C247.764 63.3675 253.159 62.0505 258.523 60.6377C356.84 107.462 459.221 116.033 553.461 104.253C685.9 87.6984 802.354 30.9548 869.156 -16.3682L866.844 -19.6318C800.49 27.3731 684.65 83.823 552.965 100.283C460.708 111.815 360.72 103.716 264.495 59.0234C287.238 52.7184 309.389 44.7862 330.285 35.9902C322.568 41.7306 314.287 53.2779 319.316 71.0098C326.981 66.6544 340.902 53.1204 336.132 33.4932C371.989 17.9527 403.874 0.0192986 428.312 -16.3379L426.088 -19.6621Z" fill="#01AD47"/>
</svg>
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
  if (data && typeof data === 'number') {
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
  sendPointsToServer(childId, points);

  setTimeout(() => {
    navigateTo("/");
  }, 5000);
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