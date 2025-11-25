import { makeRequest, navigateTo, channel } from "../app.js";

export default function renderScanned() {
  channel.send({
    type: "broadcast",
    event: "startRoleSelection",
    payload: {},
  });
  const app = document.getElementById("app");
  app.innerHTML = `
  <style>
    .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            height: 100%;
          }

          h2 {
            color: #FF600B;
            font-size: 44px;
            font-style: normal;
            font-weight: 600;
            line-height: 95%; /* 43.7px */
            margin-left: 20px;
            margin-top: 200px;
            width: 330px;
          }
  </style>
    <div class="container">
      <h2>Selecciona tu Rol</h2>
      <button id="adult">Adulto</button>
      <button id="child">Niño</button>
      </div>
      `;
      
    const adultBtn = document.getElementById("adult");
    const childBtn = document.getElementById("child");

    if(!childBtn || !adultBtn) {
        return;
    }

    adultBtn.addEventListener('click', () => {
      window.location.href = "https://parent-alpha.vercel.app/";
    });

    childBtn.addEventListener('click', () => {
        navigateTo("/start");
    })

}

