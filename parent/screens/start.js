import { makeRequest, navigateTo } from "../app.js";

export default function renderStartParent(data) {
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
  
  <div class="container">
      <div class="top" id="back-btn">
      <div><svg xmlns="http://www.w3.org/2000/svg" width="43" height="33" viewBox="0 0 43 33" fill="none">
  <line x1="38.5566" y1="16.8068" x2="7.57942" y2="16.8068" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
  <line x1="15.9684" y1="28.7951" x2="5.06763" y2="16.986" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
  <line x1="3.62499" y1="-3.62499" x2="19.6961" y2="-3.62499" transform="matrix(0.678283 -0.734801 -0.734801 -0.678283 0 17.1364)" stroke="#01AD47" stroke-width="7.24999" stroke-linecap="round"/>
</svg></div>
<p id="back">Atrás</p>
      </div>
      <div id="jungle-alert" class="jungle-alert hidden">
        <div class="jungle-alert-content">
          <span id="jungle-alert-message"></span>
        </div>
      </div>
      <h2>Ingresa tu nombre y contraseña!</h2>
      <input type="text" placeholder="Nombre" required id="input-user"/>
      <input type="password" placeholder="Contraseña" required id="input-password"/>
      <button id="register">Start</button>
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


  
    async function sendParentData(username, password) {
      if (!username || !password) {
        jungleAlert("Recuerda llenar todos los datos!");
        return;
      }
      const response = await makeRequest("/parent", "POST", {username: username, password: password} );
      console.log("response", response);

      if (!response || response.error) {
        console.error("Error creando parent:", response);
        jungleAlert("Recuerda llenar los datos!");
        return;
      }


      if (response?.user?.id) {
        localStorage.setItem("parentId", response.user.id);
        localStorage.setItem("childId", response.user.id_niño);
      }
      if (response?.user?.join_code) {
        localStorage.setItem("joinCode", response.user.join_code);
      }
      navigateTo("/code", response);
    }
    const registerBtn = document.getElementById('register');
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = document.getElementById("input-user").value;
      const pass = document.getElementById("input-password").value;
      sendParentData(user, pass)
    });

    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
      window.location.href = "https://child-mocha.vercel.app/";
    });
}