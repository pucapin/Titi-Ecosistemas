import { makeRequest, navigateTo } from "../app.js";

export default function renderStartChild() {
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
  

                      h2 {
            color: #FF600B;
            font-size: 44px;
            font-style: normal;
            font-weight: 600;
            line-height: 95%; /* 43.7px */
            margin-left: 20px;
            width: 330px;
          }

            .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }

          .top {
            margin-top: 120px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          #back {
            margin-left: 6px;
            color: #01AD47;
            font-size: 29.599px;
            font-style: normal;
            font-weight: 600;
            line-height: 93%; /* 27.527px */
          }
  </style>
  <div id="jungle-alert" class="jungle-alert hidden">
  <div class="jungle-alert-content">
    <span id="jungle-alert-message"></span>
  </div>
</div>

      <div class="container">
      <div class="top" id="back-btn">
      <div><svg xmlns="http://www.w3.org/2000/svg" width="43" height="33" viewBox="0 0 43 33" fill="none">
  <line x1="38.5566" y1="16.8068" x2="7.57942" y2="16.8068" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
  <line x1="15.9684" y1="28.7951" x2="5.06763" y2="16.986" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
  <line x1="3.62499" y1="-3.62499" x2="19.6961" y2="-3.62499" transform="matrix(0.678283 -0.734801 -0.734801 -0.678283 0 17.1364)" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
</svg></div>
<p id="back">Atrás</p>
      </div>
      <h2>Ingresa tu nombre y el
      PIN de tu acudiente!</h2>
      <input type="text" placeholder="Nombre" required id="input-user"/>
      <input type="text" placeholder="Código para unirse" required id="input-join"/>
      <button id="start">Start</button>
      </div>
      `;

      function jungleAlert(message) {
  const alertBox = document.getElementById("jungle-alert");
  const messageBox = document.getElementById("jungle-alert-message");

  messageBox.textContent = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.style.animation = "vine-hide 0.6s forwards";

    setTimeout(() => {
      alertBox.classList.add("hidden");
      alertBox.style.animation = ""; 
    }, 600);

  }, 2700);
}

// Importante añadir un texto explicativo para que entiendan cual es el id

async function sendChildData(username, code) {
  const response = await makeRequest("/child", "POST", { username, code });

  if (!response || response.error) {
    console.error("Error creando child:", response);
    jungleAlert("Recuerda llenar los datos!");

  }

  if (!response.user?.id) {
    jungleAlert("Ups… ese código no existe");
    
  }

  localStorage.setItem("childId", response.user.id);

  navigateTo("/play", response);
}

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener('click', () => {
  navigateTo("/");
})


    const startBtn = document.getElementById('start');
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = document.getElementById("input-user").value;
      let code  = document.getElementById("input-join").value;
      code = code.trim().toUpperCase();
      sendChildData(user, code)
    });
}